'use client'

import Link from "next/link";
import Logo from "../Logo";
import Copyright from "./Copyright";
import Social from "./Social";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import CallIcon from "@/components/icons/call";
import MailIcon from "@/components/icons/mail";
import WhatsAppIcon from "@/components/icons/whatsapp";
import MapIcon from "@/components/icons/map";
import MoreButton from "./MoreButton";
import { contactDetails } from "@/lib/contact-details";
import type { ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => <h3 className="text-base font-bold">{children}</h3>;
const LinksBox = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
    <div className={cn("flex-grow space-y-4 text-base inline-flex flex-col items-start", className)}>{children}</div>
);

const Footer = () => {
    const navs = [
        [
            {
                label: "Services",
                path: "/services"
            },
            {
                label: "About us",
                path: "/about"
            },
            {
                label: "Team",
                path: "/team"
            },
            {
                label: "Contact",
                path: "/contact"
            },
        ],
        [
            {
                label: "Get a quote",
                path: "/quote"
            },
            {
                label: "Tools",
                path: "/tools"
            },
            {
                label: "Rate calculator",
                path: "/rate-calculator"
            },
            {
                label: "Blogs",
                path: "/blogs"
            },
            {
                label: "Privacy",
                path: "/privacy"
            },
            {
                label: "Terms",
                path: "/terms"
            },
        ],
    ]
    const findUs = [
        { label: `${contactDetails.main.label}: ${contactDetails.main.display}`, path: contactDetails.main.tel },
        { label: `${contactDetails.shipping.label} WhatsApp: ${contactDetails.shipping.display}`, path: contactDetails.shipping.whatsapp },
        {
            label: "banglaexpress01@gmail.com",
            path: "mailto:banglaexpress01@gmail.com"
        },
        {
            label: "info@ssbanglaexpress.com",
            path: "mailto:info@ssbanglaexpress.com"
        },
        { label: `${contactDetails.sourcing.label} WhatsApp: ${contactDetails.sourcing.display}`, path: contactDetails.sourcing.whatsapp },
        {
            label: "South View Ground Floor, House #14, Road #17, Sector #14, Uttara, Dhaka 1230, Bangladesh",
        },
    ]
    const pathName = usePathname()

    const playClick = () => {
        const audio = new Audio('/assets/sounds/click.mp3')
        audio.play()
    }

    return (
        <footer className="bg-white">
            <hr />
            <section className="py-12 lg:py-16" id="components-layout-footer-footer-section-1">
                <div className="container mx-auto px-4 sm:divide-y sm:divide-gray-200">
                    <div className="flex flex-wrap gap-x-12 gap-y-12">
                        <div className="basis-64 flex-grow space-y-8">
                            <Logo />
                            <p className="lg:pr-6">To be market leader and to be customers first choice for economy express courier service industry in Bangladesh and to offer the possible shortest time with most affordable price. <MoreButton /></p>
                            <Social />
                        </div>
                        <LinksBox className="basis-36">
                            <Title>About</Title>
                            {
                                navs[0].map((nav, index) => (
                                    <Link
                                        key={index}
                                        href={nav.path}
                                        className={cn(
                                            "transition-all ease-in hover:translate-x-2 hover:underline hover:decoration-2 hover:underline-offset-4",
                                            pathName === nav.path ? "text-rose-700" : ""
                                        )}
                                        onClick={playClick}
                                    >{nav.label}</Link>
                                ))
                            }
                        </LinksBox>
                        <LinksBox className="basis-36">
                            <Title>Company</Title>
                            {
                                navs[1].map((nav, index) => (
                                    <Link
                                        key={index}
                                        href={nav.path}
                                        className={cn(
                                            "transition-all ease-in hover:translate-x-2 hover:underline hover:decoration-2 hover:underline-offset-4",
                                            pathName === nav.path ? "text-rose-700" : ""
                                        )}
                                        onClick={playClick}
                                    >{nav.label}</Link>
                                ))
                            }
                        </LinksBox>
                        <LinksBox className="basis-64">
                            <Title>Find us</Title>
                            <ul className="flex flex-col items-start space-y-4">
                                {findUs.map((item, index) => {
                                    const Icon = [CallIcon, WhatsAppIcon, MailIcon, MailIcon, WhatsAppIcon, MapIcon][index] ?? MapIcon;
                                    const className = "flex items-center gap-2 transition-all ease-in hover:translate-x-2 hover:underline hover:decoration-2 hover:underline-offset-4";

                                    return (
                                        <li key={item.label} className="flex items-start gap-2">
                                            {item.path ? (
                                                <a href={item.path} className={className} onClick={playClick}>
                                                    <Icon />
                                                    {item.label}
                                                </a>
                                            ) : (
                                                <span className="flex items-start gap-2">
                                                    <Icon />
                                                    {item.label}
                                                </span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </LinksBox>
                    </div>
                </div>
            </section>
            <Copyright />
        </footer >
    );
};

export default Footer;
