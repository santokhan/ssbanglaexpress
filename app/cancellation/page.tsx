import SectionTitle from "@/components/common/SectionTitle";

export default function Page() {
  const date = new Date();
  return (
    <section className="section">
      <div className="container mx-auto px-4">
        <SectionTitle>Cancellation Policy</SectionTitle>
        <time>{date.toLocaleDateString()}</time>
      </div>
      <div className="container mx-auto px-4">
        {/* Content */}
      </div>
    </section>
  );
}
