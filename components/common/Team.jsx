import Image from "next/image";
import shahinImage from "@/assets/images/team/shahin.png";
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
      imageUrl: "/assets/images/placeholder.webp",
      name: "Shohel Rana",
      description: "Service Manager",
      phone: "+8801711327764",
      whatsApp: "+8801611327764",
      email: "banglaexpress01@gmail.com",
    },
    {
      imageUrl: "/assets/images/placeholder.webp",
      name: "Al Nizam Shoheb",
      description: "Data Analyst",
      phone: "+8801711327764",
      whatsApp: "+8801611327764",
      email: "banglaexpress01@gmail.com",
    }
  ];

  return (
    <section className="section bg-slate-50">
      <div className="flex flex-col items-center space-y-3 max-w-2xl mx-auto text-center">
        <SectionTitle className="text-center">Our Exclusive <span className="text-[#b81e46]">Team</span></SectionTitle>
        <p className="text-gray-600">
          The SS Bangla Express team brings local Dhaka pickup support, customs expertise and international shipping coordination to every shipment.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 pt-10">
        {teamMembers.map((member, index) => (
          <div key={index} className="w-full max-w-xs overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-6 shadow-xl">
            <Image
              width={400}
              height={400}
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-72 rounded-[1.5rem] object-cover"
            />
            <div className="mt-5 text-center space-y-3">
              <h4 className="text-xl font-semibold capitalize text-slate-900">{member.name}</h4>
              <p className="text-sm text-slate-600 capitalize">{member.description}</p>
              <div className="grid gap-2 rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Phone</span>
                  <a href={`tel:${member.phone}`} className="font-medium text-[#b81e46]">{member.phone}</a>
                </div>
                <div className="flex items-center justify-between">
                  <span>WhatsApp</span>
                  <a href={`https://wa.me/${member.whatsApp}`} target="_blank" rel="noreferrer" className="font-medium text-[#b81e46]">Chat</a>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email</span>
                  <a href={`mailto:${member.email}`} className="font-medium text-[#b81e46]">Send</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
