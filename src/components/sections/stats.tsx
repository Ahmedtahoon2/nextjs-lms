const stats = [
  { value: "50,000+", label: "Active Students" },
  { value: "1,200+", label: "Courses" },
  { value: "350+", label: "Expert Instructors" },
  { value: "94%", label: "Completion Rate" },
];

function Stats() {
  return (
    <section id="stats" className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Stats };
