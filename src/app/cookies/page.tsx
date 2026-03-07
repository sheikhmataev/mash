export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-text-primary">
      <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold">Cookie Policy</h1>
      <p className="mt-6 text-text-secondary">
        This website uses essential technical storage to make the site function and may use anonymous analytics where enabled.
      </p>
      <section className="mt-8 space-y-4 text-sm text-text-secondary">
        <p><strong className="text-text-primary">Essential cookies:</strong> required for basic site features and security.</p>
        <p><strong className="text-text-primary">Analytics cookies:</strong> optional measurement cookies can be enabled to improve usability and performance.</p>
        <p><strong className="text-text-primary">Control:</strong> you can manage cookies in your browser settings and clear them at any time.</p>
      </section>
    </main>
  );
}
