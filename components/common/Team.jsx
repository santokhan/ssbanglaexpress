import { Call, Whatsapp } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

const Team = () => {
  const items = [
    {
      imageUrl: "",
      title: "sahar safi",
      description: "Operation Director",
      phone: "+971502097639",
      whatsApp: "+971502097639",
      email: "sahar@bsmproperty.ae",
    },
    {
      imageUrl: "",
      title: "gayathri girish",
      description: "Sales Admin",
      phone: "+971562280036",
      whatsApp: "+971562280036",
      email: "info@bsmproperty.ae",
    },
  ];

  return (
    <section className="section">
      <div className="flex flex-col items-center space-y-1">
        <h2 className="text-2xl font-semibold">Our Exclusive Team</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          saepe officiis voluptatibus similique suscipit
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {items.map((item, index) => (
          <div key={index} className="w-full max-w-60 space-y-4 rounded-2xl">
            <Image
              width={400}
              height={400}
              src={item.imageUrl}
              alt="icon"
              className="w-full h-60 border object-cover rounded-2xl"
            />
            <div className="text-start">
              <h4 className="font-semibold text-sm capitalize text-center mb-1">
                {item.title}
              </h4>
              <p className="text-gray-700 text-sm text-center capitalize">
                {item.description}
              </p>
              <div className="flex items-center justify-center gap-4 py-2">
                <Link href={`tel:${item.phone}`}>
                  <Call className="size-4" />
                </Link>
                <Link href={`https://wa.me/${item.whatsApp}`}>
                  <Whatsapp className="size-4" />
                </Link>
                <Link href={`mailto:${item.email}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
