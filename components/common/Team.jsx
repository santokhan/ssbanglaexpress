import { Call, Whatsapp } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import shahinImage from "@/assets/images/team/shahin.png";
import shohelImage from "@/assets/images/team/shohel.png";
import shohebImage from "@/assets/images/team/shoheb.png";
import SectionTitle from "./SectionTitle";

const Team = () => {
  const teamMembers = [
    {
      imageUrl: shahinImage,
      name: "Shahan Shah Kabir",
      description: "Owner & Managing Director",
      phone: "+8801711327764",
      whatsApp: "+8801611327764",
      email: "banglaexpress01@gmail.com",
    },
    {
      imageUrl: shohelImage,
      name: "Shohel Rana",
      description: "Service Manager",
      phone: "+8801711327764",
      whatsApp: "+8801611327764",
      email: "banglaexpress01@gmail.com",
    },
    {
      imageUrl: shohebImage,
      name: "Al Nizam Shoheb",
      description: "Data Analyst",
      phone: "+8801711327764",
      whatsApp: "+8801611327764",
      email: "banglaexpress01@gmail.com",
    }
  ];

  return (
    <section className="section">
      <div className="flex flex-col items-center space-y-1 max-w-2xl mx-auto">
        <SectionTitle className="text-center">Our Exclusive <span className="text-rose-800">Team</span></SectionTitle>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          saepe officiis voluptatibus similique suscipit
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-10">
        {teamMembers.map((member, index) => (
          <div key={index} className="w-full max-w-60 space-y-4 rounded-2xl">
            <Image
              width={400}
              height={400}
              src={member.imageUrl}
              alt="icon"
              className="w-full h-60 border object-cover rounded-2xl"
            />
            <div className="text-start">
              <h4 className="font-semibold capitalize text-center mb-1">
                {member.name}
              </h4>
              <p className="text-gray-700 text-sm text-center capitalize mb-1">
                {member.description}
              </p>
              <div className="flex items-center justify-center gap-4 py-2">
                <Link href={`tel:${member.phone}`} className="transition-all hover:text-rose-800">
                  <Call className="size-4" />
                </Link>
                <Link href={`https://wa.me/${member.whatsApp}`} className="transition-all hover:text-rose-800">
                  <Whatsapp className="size-4" />
                </Link>
                <Link href={`mailto:${member.email}`} className="transition-all hover:text-rose-800">
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
