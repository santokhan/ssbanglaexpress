import Image from "next/image";
import shahinImage from "@/assets/images/team/shahin.webp";
import SectionTitle from "./SectionTitle";

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
  },
];

const Team = () => (
  <section className="section relative isolate overflow-hidden bg-[#faf8f7]">
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#b81e46]/15 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#a51b40] shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b81e46]" />
          The people behind every delivery
        </span>
        <SectionTitle className="text-center text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl">
          Meet our <span className="text-[#b81e46]">team</span>
        </SectionTitle>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
          The SS Bangla Express team brings local Dhaka pickup support, customs expertise and international shipping coordination to every shipment.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <article
            key={member.name}
            className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-3 shadow-[0_12px_40px_-24px_rgba(15,23,42,0.25)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-25px_rgba(15,23,42,0.3)]"
          >
            <div className="relative overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-rose-50 via-slate-100 to-amber-50">
              <Image
                width={600}
                height={600}
                src={member.imageUrl}
                alt={member.name}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/20 to-transparent" />
            </div>

            <div className="px-4 pb-4 pt-5 sm:px-5">
              <h3 className="text-xl font-bold tracking-tight text-slate-950">{member.name}</h3>
              <p className="mt-2 inline-flex rounded-full bg-[#b81e46]/[0.08] px-3 py-1 text-xs font-semibold text-[#a51b40]">
                {member.description}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                <a
                  href={`tel:${member.phone}`}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b81e46] focus-visible:ring-offset-2"
                  aria-label={`Call ${member.name}`}
                >
                  <span aria-hidden="true">☎</span> Call
                </a>
                <a
                  href={`https://wa.me/${member.whatsApp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-slate-50 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b81e46] focus-visible:ring-offset-2"
                  aria-label={`Message ${member.name} on WhatsApp`}
                >
                  <span aria-hidden="true">◉</span> WhatsApp
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="col-span-2 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#b81e46] px-3 text-sm font-semibold text-white transition hover:bg-[#941638] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b81e46] focus-visible:ring-offset-2"
                  aria-label={`Email ${member.name}`}
                >
                  <span aria-hidden="true">✉</span> Send an email
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
