"use client";

import {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  type ChangeEvent,
} from "react";
import { updateLessonContentAction } from "@/actions/lesson-content";
import { normalizeVideoUrl } from "@/lib/video";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  Eye,
  Edit3,
} from "lucide-react";
import type { LessonContent } from "@prisma/client";

export interface ResourceItem {
  name: string;
  url: string;
}

interface EditorResourceItem extends ResourceItem {
  id: string;
}

function createResourceId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `res-${Math.random().toString(36).slice(2, 11)}-${Date.now()}`;
}

const serializeResources = (items: EditorResourceItem[]): ResourceItem[] =>
  items.map(({ name, url }) => ({ name, url }));

export interface LessonContentEditorProps {
  lessonId: string;
  initialData?: {
    bodyMarkdown?: string | null;
    bodyHtml?: string | null;
    videoUrl?: string | null;
    resources?: ResourceItem[] | null;
  };
  readOnly?: boolean;
  onSaveSuccess?: (data: LessonContent) => void;
}

type SaveStatus = "saved" | "saving" | "unsaved" | "error";

export function LessonContentEditor({
  lessonId,
  initialData,
  readOnly = false,
  onSaveSuccess,
}: LessonContentEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [bodyMarkdown, setBodyMarkdown] = useState(
    initialData?.bodyMarkdown ?? "",
  );
  const [previewHtml, setPreviewHtml] = useState(initialData?.bodyHtml ?? "");
  const [videoUrlInput, setVideoUrlInput] = useState(
    initialData?.videoUrl ?? "",
  );
  const [resources, setResources] = useState<EditorResourceItem[]>(() =>
    (initialData?.resources ?? []).map((res) => ({
      ...res,
      id: createResourceId(),
    })),
  );

  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Video embed normalization preview
  const videoEmbedUrl = useMemo(() => {
    if (!videoUrlInput.trim()) return "";
    try {
      return normalizeVideoUrl(videoUrlInput);
    } catch {
      return null;
    }
  }, [videoUrlInput]);

  // Sequential Autosave Queue refs
  const sequenceRef = useRef(0);
  const isSavingRef = useRef(false);
  const pendingPayloadRef = useRef<{
    lessonId: string;
    bodyMarkdown: string;
    videoUrl: string;
    resources: ResourceItem[];
  } | null>(null);

  const executeSave = useCallback(
    async (initialPayload: {
      lessonId: string;
      bodyMarkdown: string;
      videoUrl: string;
      resources: ResourceItem[];
    }) => {
      isSavingRef.current = true;
      setSaveStatus("saving");
      setErrorMessage(null);

      let currentPayload: typeof initialPayload | null = initialPayload;

      while (currentPayload) {
        const payload = currentPayload;
        currentPayload = null;
        pendingPayloadRef.current = null;
        const currentSeq = ++sequenceRef.current;

        try {
          const result = await updateLessonContentAction({
            lessonId: payload.lessonId,
            bodyMarkdown: payload.bodyMarkdown,
            videoUrl: payload.videoUrl,
            resources: payload.resources,
          });

          if (currentSeq === sequenceRef.current) {
            if (result.success) {
              setSaveStatus("saved");
              if (result.data.bodyHtml) {
                setPreviewHtml(result.data.bodyHtml);
              }
              onSaveSuccess?.(result.data);
            } else {
              setSaveStatus("error");
              setErrorMessage(result.error || "Failed to save lesson content.");
            }
          }
        } catch {
          if (currentSeq === sequenceRef.current) {
            setSaveStatus("error");
            setErrorMessage("Network error while saving.");
          }
        }

        // If newer changes arrived while in-flight, continue processing immediately
        if (pendingPayloadRef.current) {
          currentPayload = pendingPayloadRef.current;
          pendingPayloadRef.current = null;
        }
      }

      isSavingRef.current = false;
    },
    [onSaveSuccess],
  );

  const requestSave = useCallback(
    (payload: {
      lessonId: string;
      bodyMarkdown: string;
      videoUrl: string;
      resources: ResourceItem[];
    }) => {
      if (readOnly) return;
      setSaveStatus("unsaved");

      if (isSavingRef.current) {
        pendingPayloadRef.current = payload;
      } else {
        void executeSave(payload);
      }
    },
    [executeSave, readOnly],
  );

  // Debounce autosave on markdown / video / resources change
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const triggerDebouncedSave = useCallback(() => {
    if (readOnly) return;
    setSaveStatus("unsaved");
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      requestSave({
        lessonId,
        bodyMarkdown,
        videoUrl: videoUrlInput,
        resources: serializeResources(resources),
      });
    }, 1200);
  }, [bodyMarkdown, lessonId, readOnly, requestSave, resources, videoUrlInput]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleMarkdownChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBodyMarkdown(e.target.value);
    triggerDebouncedSave();
  };

  const handleVideoUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoUrlInput(e.target.value);
    triggerDebouncedSave();
  };

  const handleAddResource = () => {
    if (resources.length >= 10 || readOnly) return;
    const updated: EditorResourceItem[] = [
      ...resources,
      { id: createResourceId(), name: "", url: "" },
    ];
    setResources(updated);
    triggerDebouncedSave();
  };

  const handleUpdateResource = (
    id: string,
    field: "name" | "url",
    value: string,
  ) => {
    if (readOnly) return;
    const updated = resources.map((res) =>
      res.id === id ? { ...res, [field]: value } : res,
    );
    setResources(updated);
    triggerDebouncedSave();
  };

  const handleRemoveResource = (id: string) => {
    if (readOnly) return;
    const updated = resources.filter((res) => res.id !== id);
    setResources(updated);
    triggerDebouncedSave();
  };

  const handleManualSave = () => {
    if (readOnly) return;
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    requestSave({
      lessonId,
      bodyMarkdown,
      videoUrl: videoUrlInput,
      resources: serializeResources(resources),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header bar with Status & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div className="flex items-center gap-2">
          {/* Write / Preview Tab Switcher */}
          <div className="inline-flex rounded-lg bg-muted p-1 text-muted-foreground">
            <button
              type="button"
              onClick={() => setActiveTab("write")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === "write"
                  ? "bg-background text-foreground shadow-sm"
                  : "hover:text-foreground"
              }`}
            >
              <Edit3 className="size-3.5" />
              Write
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === "preview"
                  ? "bg-background text-foreground shadow-sm"
                  : "hover:text-foreground"
              }`}
            >
              <Eye className="size-3.5" />
              Preview
            </button>
          </div>
        </div>

        {/* Status indicator & Manual Save */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            {saveStatus === "saving" && (
              <>
                <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                <span className="text-muted-foreground">Saving...</span>
              </>
            )}
            {saveStatus === "saved" && (
              <>
                <CheckCircle2 className="size-3.5 text-emerald-600" />
                <span className="text-muted-foreground">Saved</span>
              </>
            )}
            {saveStatus === "unsaved" && (
              <>
                <span className="size-2 rounded-full bg-amber-500" />
                <span className="text-muted-foreground">Unsaved changes</span>
              </>
            )}
            {saveStatus === "error" && (
              <>
                <AlertCircle className="size-3.5 text-destructive" />
                <span className="text-destructive font-medium">
                  Save failed
                </span>
              </>
            )}
          </div>

          {!readOnly && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleManualSave}
              disabled={saveStatus === "saving"}
              className="min-h-10 px-3 active:scale-[0.96] transition-transform"
            >
              Save
            </Button>
          )}
        </div>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
        >
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Video URL Section */}
      <div className="space-y-3 rounded-lg border border-border/50 bg-card p-4 shadow-sm">
        <div className="space-y-1">
          <Label htmlFor="video-url" className="text-sm font-semibold">
            Video Lecture URL
          </Label>
          <p className="text-xs text-muted-foreground">
            Supports YouTube, Vimeo, and Loom video links.
          </p>
        </div>

        <Input
          id="video-url"
          type="url"
          placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/... or https://loom.com/share/..."
          value={videoUrlInput}
          onChange={handleVideoUrlChange}
          disabled={readOnly}
          className="min-h-10"
        />

        {videoUrlInput.trim() && videoEmbedUrl === null && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="size-3" />
            Unsupported or invalid video link. Please enter a valid YouTube,
            Vimeo, or Loom URL.
          </p>
        )}

        {videoEmbedUrl && (
          <div className="mt-3 overflow-hidden rounded-lg border border-border/60 bg-black aspect-video max-w-xl">
            <iframe
              src={videoEmbedUrl}
              title="Lesson Video Preview"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>

      {/* Main Content Area: Write or Preview */}
      {activeTab === "write" ? (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="body-markdown" className="text-sm font-semibold">
              Lesson Text & Curriculum Notes (Markdown)
            </Label>
            <span className="text-xs text-muted-foreground">
              {bodyMarkdown.length} / 50,000 characters
            </span>
          </div>
          <Textarea
            id="body-markdown"
            placeholder="Write structured lesson notes, code snippets, or key concepts in Markdown..."
            rows={14}
            value={bodyMarkdown}
            onChange={handleMarkdownChange}
            disabled={readOnly}
            className="font-mono text-sm leading-relaxed"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <Label className="text-sm font-semibold">
            Rendered Lesson Preview
          </Label>
          <div
            className="min-h-10 rounded-lg border border-border/50 bg-card p-6 shadow-sm prose dark:prose-invert max-w-none"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: previewHtml is strictly sanitized via server-side sanitize-html pipeline
            dangerouslySetInnerHTML={{
              __html:
                previewHtml ||
                "<p class='text-muted-foreground italic'>No content rendered yet.</p>",
            }}
          />
        </div>
      )}

      {/* Resource Attachments Section */}
      <div className="space-y-4 rounded-lg border border-border/50 bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-semibold">
              Downloadable Resources
            </Label>
            <p className="text-xs text-muted-foreground">
              Direct links to slide decks, cheatsheets, or repositories (Max
              10).
            </p>
          </div>
          {!readOnly && resources.length < 10 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddResource}
              className="min-h-10 px-3 active:scale-[0.96] transition-transform"
            >
              <Plus className="mr-1.5 size-3.5" />
              Add Link
            </Button>
          )}
        </div>

        {resources.length === 0 ? (
          <p className="py-2 text-xs text-muted-foreground italic">
            No resource attachments added to this lesson.
          </p>
        ) : (
          <div className="space-y-2.5">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="flex flex-col gap-2 rounded-md border border-border/40 bg-muted/20 p-2.5 sm:flex-row sm:items-center"
              >
                <div className="flex-1 sm:max-w-xs">
                  <Input
                    placeholder="Resource Name (e.g. Slides PDF)"
                    value={resource.name}
                    onChange={(e) =>
                      handleUpdateResource(resource.id, "name", e.target.value)
                    }
                    disabled={readOnly}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="flex flex-1 items-center gap-2">
                  <Input
                    type="url"
                    placeholder="https://example.com/slides.pdf"
                    value={resource.url}
                    onChange={(e) =>
                      handleUpdateResource(resource.id, "url", e.target.value)
                    }
                    disabled={readOnly}
                    className="h-9 text-xs"
                  />
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-input text-muted-foreground hover:text-foreground"
                      title="Open URL"
                    >
                      <ExternalLink className="size-3.5" />
                    </a>
                  )}
                  {!readOnly && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveResource(resource.id)}
                      className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive active:scale-[0.96]"
                      title="Remove Resource"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
