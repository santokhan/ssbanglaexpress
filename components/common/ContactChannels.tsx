import { Instagram, MessageCircle, Send } from "lucide-react";
import { contactDetails } from "@/lib/contact-details";

const channels = [
    {
        name: "WhatsApp",
        detail: `Shipping · ${contactDetails.shipping.display}`,
        href: contactDetails.shipping.whatsapp,
        icon: MessageCircle,
        color: "bg-emerald-50 text-emerald-700",
        external: true,
    },
    {
        name: "WhatsApp",
        detail: `Sourcing · ${contactDetails.sourcing.display}`,
        href: contactDetails.sourcing.whatsapp,
        icon: MessageCircle,
        color: "bg-emerald-50 text-emerald-700",
        external: true,
    },
    {
        name: "Facebook",
        detail: "Visit our Facebook page",
        href: "https://www.facebook.com/ssbanglaexpress1",
        icon: null,
        color: "bg-blue-50 text-blue-700",
        external: true,
    },
    {
        name: "Instagram",
        detail: "Visit our Instagram profile",
        href: "https://www.instagram.com/ssbanglaexpress",
        icon: Instagram,
        color: "bg-pink-50 text-pink-700",
        external: true,
    },
    {
        name: "Telegram",
        detail: `Message us at ${contactDetails.shipping.display}`,
        href: `https://t.me/+${contactDetails.shipping.display.replace(/\D/g, "")}`,
        icon: Send,
        color: "bg-sky-50 text-sky-700",
        external: true,
    },
];

export default function ContactChannels() {
    return (
        <section aria-labelledby="contact-channels-heading" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.2)] sm:p-8">
            <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a21b3e]">Choose what works for you</p>
                <h2 id="contact-channels-heading" className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Message us on your preferred channel</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Reach our shipping or sourcing teams on WhatsApp, or connect with us on social media.</p>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {channels.map(({ name, detail, href, icon: Icon, color, external }, index) => (
                    <a key={`${name}-${index}`} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group flex min-h-[88px] items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#b81e46]/40 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]">
                        <span className={`grid size-12 shrink-0 place-items-center rounded-xl ${color}`}>
                            {Icon ? <Icon size={22} aria-hidden="true" /> : <span aria-hidden="true" className="text-2xl font-bold">f</span>}
                        </span>
                        <span className="min-w-0"><span className="block font-semibold text-slate-900">{name}</span><span className="mt-0.5 block truncate text-sm text-slate-500">{detail}</span></span>
                    </a>
                ))}
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">Telegram access depends on the account&apos;s phone number privacy settings.</p>
        </section>
    );
}
