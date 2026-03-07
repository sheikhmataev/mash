export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-text-primary">
      <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold">Privacy Policy</h1>
      <p className="mt-6 text-text-secondary">
        Mash Partners processes personal data only when necessary to reply to inquiries and provide our services.
      </p>
      <section className="mt-8 space-y-4 text-sm text-text-secondary">
        <p><strong className="text-text-primary">What we collect:</strong> name, email, company, and message details submitted through the contact form.</p>
        <p><strong className="text-text-primary">Why we collect it:</strong> to contact you, follow up on your request, and document communication history.</p>
        <p><strong className="text-text-primary">Legal basis:</strong> your consent and our legitimate interest in responding to business inquiries.</p>
        <p><strong className="text-text-primary">Retention:</strong> data is kept only as long as needed for the purpose above or as required by law.</p>
        <p><strong className="text-text-primary">Your rights:</strong> access, correction, deletion, and objection to processing. Contact us to exercise your rights.</p>
      </section>
    </main>
  );
}
