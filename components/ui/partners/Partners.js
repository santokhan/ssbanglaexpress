import Image from "next/image";

const Partners = () => {
  return (
    <section className="section">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitle className="text-center">Our Partners</SectionTitle>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          saepe officiis voluptatibus similique suscipit
        </p>
      </div>
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-3 gap-8">
        <Image src="/images/partners/1.png" alt="" width={400} height={400} />
        <Image src="/images/partners/1.png" alt="" width={400} height={400} />
        <Image src="/images/partners/1.png" alt="" width={400} height={400} />
        <Image src="/images/partners/1.png" alt="" width={400} height={400} />
        <Image src="/images/partners/1.png" alt="" width={400} height={400} />
      </div>
    </section>
  );
};
