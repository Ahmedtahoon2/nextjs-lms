import { Header } from "@/components/global/layout/header";
import { Footer } from "@/components/global/layout/footer";

export default function CourseOverviewLoading() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-b border-border/40 bg-muted/20 py-10 sm:py-14 animate-pulse">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-7">
                <div className="h-4 w-28 rounded-md bg-muted/70" />
                <div className="h-9 w-4/5 rounded-md bg-muted/80" />
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-full rounded-md bg-muted/50" />
                  <div className="h-4 w-3/4 rounded-md bg-muted/50" />
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="h-64 rounded-2xl bg-muted/60" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 animate-pulse">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-8">
                <div className="h-6 w-48 rounded-md bg-muted/70" />
                <div className="h-16 rounded-xl bg-muted/40" />
                <div className="h-16 rounded-xl bg-muted/40" />
                <div className="h-16 rounded-xl bg-muted/40" />
              </div>
              <div className="lg:col-span-4">
                <div className="h-48 rounded-2xl bg-muted/50" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
