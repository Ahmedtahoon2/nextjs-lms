import { Header } from "@/components/global/layout/header";
import { Footer } from "@/components/global/layout/footer";

export default function CourseOverviewLoading() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="border-border/40 bg-muted/20 animate-pulse border-b py-10 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-7">
                <div className="bg-muted/70 h-4 w-28 rounded-md" />
                <div className="bg-muted/80 h-9 w-4/5 rounded-md" />
                <div className="space-y-2 pt-2">
                  <div className="bg-muted/50 h-4 w-full rounded-md" />
                  <div className="bg-muted/50 h-4 w-3/4 rounded-md" />
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="bg-muted/60 h-64 rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="animate-pulse py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-8">
                <div className="bg-muted/70 h-6 w-48 rounded-md" />
                <div className="bg-muted/40 h-16 rounded-xl" />
                <div className="bg-muted/40 h-16 rounded-xl" />
                <div className="bg-muted/40 h-16 rounded-xl" />
              </div>
              <div className="lg:col-span-4">
                <div className="bg-muted/50 h-48 rounded-2xl" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
