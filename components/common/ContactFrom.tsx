"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { contactDetails } from "@/lib/contact-details";
import { submitContact } from "@/app/actions/requests";

const fieldClassName =
    "block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-[#b81e46] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#b81e46]/10";

const ContactForm = ({ className = "" }: { className?: string }) => {
    const [status, setStatus] = useState("");
    const [sending, setSending] = useState(false);
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        setSending(true);
        setStatus("");
        try {
            const result = await submitContact(Object.fromEntries(new FormData(form)));
            if (!result.ok) { setStatus(result.error); return; }
            form.reset();
            setStatus("Your message has been received. Our team will be in touch soon.");
        } catch {
            setStatus("We could not send your message. Please try again.");
        } finally { setSending(false); }
    }
    return (
        <div className={cn("grid w-full gap-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)]", className)}>
            <aside className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#75132e] via-[#971839] to-[#b81e46] p-6 text-white shadow-xl shadow-[#8f1736]/15 sm:p-8 lg:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/65">We&apos;re here to help</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight">Contact information</h2>
                <p className="mt-3 text-sm leading-6 text-white/75">Reach our team for shipping, sourcing, or any other questions.</p>
                <div className="mt-8 space-y-3">
                    <a className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 transition hover:bg-white/15" href={contactDetails.shipping.whatsapp} target="_blank" rel="noreferrer">
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/15"><MessageCircle size={19} /></span>
                        <span className="min-w-0"><span className="block text-xs text-white/65">{contactDetails.shipping.label}</span><span className="block truncate text-sm font-semibold">{contactDetails.shipping.display}</span></span>
                    </a>
                    <a className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 transition hover:bg-white/15" href={contactDetails.sourcing.whatsapp} target="_blank" rel="noreferrer">
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/15"><MessageCircle size={19} /></span>
                        <span className="min-w-0"><span className="block text-xs text-white/65">{contactDetails.sourcing.label}</span><span className="block truncate text-sm font-semibold">{contactDetails.sourcing.display}</span></span>
                    </a>
                    <a className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 transition hover:bg-white/15" href={contactDetails.main.tel}>
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/15"><Phone size={19} /></span>
                        <span className="min-w-0"><span className="block text-xs text-white/65">{contactDetails.main.label}</span><span className="block truncate text-sm font-semibold">{contactDetails.main.display}</span></span>
                    </a>
                </div>
                <div className="mt-7 space-y-5 border-t border-white/20 pt-6">
                    <div className="flex items-start gap-3"><Mail size={18} className="mt-0.5 shrink-0 text-white/75" /><div><p className="text-xs font-semibold uppercase tracking-wide text-white/60">Email</p><a className="mt-1 block break-all text-sm font-medium hover:underline" href="mailto:banglaexpress01@gmail.com">banglaexpress01@gmail.com</a></div></div>
                    <div className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-white/75" /><div><p className="text-xs font-semibold uppercase tracking-wide text-white/60">Visit us</p><p className="mt-1 text-sm leading-5 text-white/90">South View, House #14, Road #17, Sector #14, Uttara, Dhaka 1230</p></div></div>
                </div>
            </aside>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.3)] sm:p-8 lg:p-9">
                <div className="mb-7">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a21b3e]">Let&apos;s talk</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Get in touch</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">Send us a message and our team will be happy to help.</p>
                </div>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div><label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-slate-700">First name</label><input type="text" id="firstName" name="firstName" className={fieldClassName} placeholder="Your first name" autoComplete="given-name" required /></div>
                        <div><label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-slate-700">Last name</label><input type="text" id="lastName" name="lastName" className={fieldClassName} placeholder="Your last name" autoComplete="family-name" required /></div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div><label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-700">Email address</label><input type="email" id="email" name="email" className={fieldClassName} placeholder="you@example.com" autoComplete="email" required /></div>
                        <div><label htmlFor="phone" className="mb-2 block text-sm font-semibold text-slate-700">Phone number</label><input type="tel" id="phone" name="phone" className={fieldClassName} placeholder="+880 1XXX-XXXXXX" autoComplete="tel" required /></div>
                    </div>
                    <div><label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-700">How can we help?</label><textarea id="message" name="message" rows={5} className={cn(fieldClassName, "resize-y")} placeholder="Write your message here..." required /></div>
                    <div className="flex justify-end pt-1">
                        <button type="submit" disabled={sending} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#b81e46] px-7 text-sm font-bold text-white shadow-lg shadow-[#b81e46]/20 transition hover:-translate-y-0.5 hover:bg-[#971839] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46] disabled:opacity-60 sm:w-auto">
                            {sending ? "Sending…" : "Send message"} <Send size={16} />
                        </button>
                    </div>
                    {status && <p role="status" className="text-sm font-medium text-slate-700">{status}</p>}
                </form>
            </div>
        </div>
    );
}

export default ContactForm;
