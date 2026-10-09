'use client'

import Link from "next/link"
import { ArrowRight, BadgeCheck, Box, Clock3, Globe2, LogOut, Mail, MapPin, PackageCheck, PackagePlus, ShieldCheck, Sparkles, UserRound } from "lucide-react"
import Container from "@/components/common/Container"
import { signoutAction } from "@/actions/auth/signout"

type ProfileUser = { name: string; email: string };

const ProfilePage = ({ user }: { user: ProfileUser }) => {
    const name = user?.name?.trim() || "Welcome"
    const email = user?.email || ""
    const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "?"

    const signOut = async () => {
        await signoutAction()
    }

    return (
        <main className="min-h-[var(--height-main)] bg-[#f7f8fa] pb-16">
            <section className="relative overflow-hidden bg-[#171923] text-white">
                <div className="absolute inset-0 opacity-30" aria-hidden="true">
                    <div className="absolute -right-16 -top-44 h-[27rem] w-[27rem] rounded-full border border-white/15" />
                    <div className="absolute -right-4 -top-32 h-[23rem] w-[23rem] rounded-full border border-white/10" />
                    <div className="absolute right-24 top-0 h-72 w-72 rounded-full bg-[#b81e46]/35 blur-[100px]" />
                </div>
                <Container className="relative pb-24 pt-12 sm:pb-28 sm:pt-16">
                    <div className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                        <span>SS Bangla Express</span><span className="text-[#ed7894]">/</span><span className="text-white/85">My account</span>
                    </div>
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-5">
                            <div className="relative flex size-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/10 text-xl font-bold shadow-xl shadow-black/10 sm:size-20 sm:text-2xl">
                                {initials}
                                <span className="absolute bottom-1 right-1 size-3 rounded-full border-2 border-[#171923] bg-emerald-400" />
                            </div>
                            <div>
                                <p className="mb-1 text-sm text-white/60">Good to see you</p>
                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{name}</h1>
                                <p className="mt-2 flex items-center gap-2 text-sm text-white/65"><Mail size={15} />{email}</p>
                            </div>
                        </div>
                        <button type="button" onClick={() => void signOut()} className="inline-flex min-h-10 items-center gap-1.5 self-start rounded-full border border-white/20 px-4 text-sm font-semibold text-white/85 transition hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:self-auto">
                            <LogOut size={16} /> Sign out
                        </button>
                    </div>
                </Container>
            </section>

            <Container className="relative -mt-12">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
                    <div className="space-y-6">
                        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_35px_-25px_rgba(15,23,42,0.3)] sm:p-8" aria-labelledby="shipments-heading">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-start gap-4">
                                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-[#b81e46]"><Box size={23} /></span>
                                    <div><p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Your shipments</p><h2 id="shipments-heading" className="text-xl font-bold text-slate-900">Everything in one place</h2><p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">Get a shipping quote or check the status of a delivery with our team.</p></div>
                                </div>
                                <Link href="/quote" className="inline-flex min-h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#b81e46] px-4 text-sm font-bold text-white shadow-md shadow-[#b81e46]/15 transition hover:-translate-y-0.5 hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]">Request a quote <ArrowRight size={16} /></Link>
                            </div>
                            <div className="mt-7 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4"><PackageCheck className="mb-4 text-emerald-600" size={20} /><p className="text-sm font-semibold text-slate-800">Track a shipment</p><p className="mt-1 text-xs leading-5 text-slate-500">Follow your parcel on its journey.</p></div>
                                <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4"><PackagePlus className="mb-4 text-[#b81e46]" size={20} /><p className="text-sm font-semibold text-slate-800">Send a package</p><p className="mt-1 text-xs leading-5 text-slate-500">We’ll help plan your next delivery.</p></div>
                                <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4"><Globe2 className="mb-4 text-blue-600" size={20} /><p className="text-sm font-semibold text-slate-800">Ship worldwide</p><p className="mt-1 text-xs leading-5 text-slate-500">Door-to-door service across borders.</p></div>
                            </div>
                        </section>

                        <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_35px_-25px_rgba(15,23,42,0.3)]" aria-labelledby="account-heading">
                            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 sm:px-8">
                                <div><p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Account details</p><h2 id="account-heading" className="text-lg font-bold text-slate-900">Your information</h2></div>
                                <span className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-500"><UserRound size={19} /></span>
                            </div>
                            <div className="divide-y divide-slate-100 px-6 sm:px-8">
                                <Detail icon={<UserRound size={17} />} label="Full name" value={name} />
                                <Detail icon={<Mail size={17} />} label="Email address" value={email} />
                                <Detail icon={<MapPin size={17} />} label="Shipping address" value="Add your address when requesting a quote" muted />
                            </div>
                            <div className="border-t border-slate-100 px-6 py-4 sm:px-8"><p className="flex items-center gap-2 text-xs leading-5 text-slate-500"><ShieldCheck size={15} className="shrink-0 text-emerald-600" />Your account details are kept secure and used to help with your shipments.</p></div>
                        </section>
                    </div>

                    <aside className="space-y-5">
                        <div className="rounded-2xl bg-gradient-to-br from-[#b81e46] to-[#871536] p-6 text-white shadow-lg shadow-[#b81e46]/15 sm:p-7">
                            <div className="mb-8 flex size-11 items-center justify-center rounded-xl bg-white/15"><Sparkles size={21} /></div>
                            <p className="text-sm font-semibold text-white/70">Here when you need us</p>
                            <h2 className="mt-2 text-2xl font-bold leading-snug">Shipping made simple, from pickup to delivery.</h2>
                            <Link href="/contact" className="mt-4 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-bold text-[#9f173b] transition hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Talk to our team <ArrowRight size={16} /></Link>
                        </div>
                        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_12px_35px_-25px_rgba(15,23,42,0.3)] sm:p-7">
                            <h2 className="font-bold text-slate-900">Your account at a glance</h2>
                            <div className="mt-5 space-y-4">
                                <InfoRow icon={<BadgeCheck size={17} />} title="Account active" subtitle="Ready for your next shipment" color="text-emerald-600 bg-emerald-50" />
                                <InfoRow icon={<Clock3 size={17} />} title="Need an update?" subtitle="Our team is here to help" color="text-amber-600 bg-amber-50" />
                            </div>
                            <Link href="/services" className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-semibold text-slate-600 transition hover:text-[#b81e46]">Explore our services <ArrowRight size={16} /></Link>
                        </div>
                    </aside>
                </div>
                <p className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-slate-400"><ShieldCheck size={14} /> Your personal information is protected.</p>
            </Container>
        </main>
    )
}

function Detail({ icon, label, value, muted = false }: { icon: React.ReactNode; label: string; value: string; muted?: boolean }) {
    return <div className="flex items-center gap-4 py-4"><span className="text-slate-400">{icon}</span><span className="w-32 shrink-0 text-sm text-slate-500">{label}</span><span className={`text-sm font-semibold ${muted ? "font-normal text-slate-400" : "text-slate-800"}`}>{value}</span></div>
}

function InfoRow({ icon, title, subtitle, color }: { icon: React.ReactNode; title: string; subtitle: string; color: string }) {
    return <div className="flex items-center gap-3"><span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${color}`}>{icon}</span><div><p className="text-sm font-semibold text-slate-800">{title}</p><p className="mt-0.5 text-xs text-slate-500">{subtitle}</p></div></div>
}

export default ProfilePage
