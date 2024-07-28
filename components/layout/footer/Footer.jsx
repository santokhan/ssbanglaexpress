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
import { useState } from "react";
import MoreButton from "./MoreButton";

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
                label: "Privacy",
                path: "/privacy"
            },
            {
                label: "Team",
                path: "/team"
            },

        ],
        [
            {
                label: "Blogs",
                path: "/blogs"
            },
            {
                label: "Cancellation",
                path: "/cancellation"
            },
            {
                label: "Terms",
                path: "/terms"
            },
        ],
    ]
    const findUs = [
        {
            label: "+880 1611 327 764",
            path: "https://wa.me/+8801611327764"
        },
        {
            label: "+880 1611 327 764",
            path: "tel:+8801611327764"
        },
        {
            label: "banglaexpress01@gmail.com",
            path: "banglaexpress01@gmail.com"
        },
        {
            label: "South View Graund floor, House #14, Road #17, Sectors #14, Uttara Dhaka, Dhaka-1230 Bangladesh",
        },
    ]
    const Title = ({ children }) => <h3 className="text-base font-bold">{children}</h3>
    const LinksBox = ({ children, className = "" }) => <div className={cn("flex-grow space-y-4 text-base inline-flex flex-col items-start", className)}>{children}</div>
    const pathName = usePathname()

    const [clicked, setClicked] = useState(false)

    const playClick = () => {
        setClicked(true)
        const audio = new Audio('/assets/sounds/click.mp3')
        audio.play()
    }

    return (
        <footer className="bg-white">
            <hr />
            <section className="py-12 lg:py-16">
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
                                <li className="flex items-start justify-start gap-2">
                                    <a
                                        href={findUs[0].path}
                                        className="flex items-center gap-2 transition-all ease-in hover:translate-x-2 hover:underline hover:decoration-2 hover:underline-offset-4"
                                        onClick={playClick}
                                    >
                                        <WhatsAppIcon />
                                        {findUs[0].label}
                                    </a>
                                </li>
                                <li className="flex items-start gap-2">
                                    <a
                                        href={findUs[1].path}
                                        className="flex items-center gap-2 transition-all ease-in hover:translate-x-2 hover:underline hover:decoration-2 hover:underline-offset-4"
                                        onClick={playClick}
                                    >
                                        <CallIcon />
                                        {findUs[1].label}
                                    </a>
                                </li>
                                <li className="flex items-start gap-2">
                                    <a
                                        href={findUs[2].path}
                                        className="flex items-center gap-2 transition-all ease-in hover:translate-x-2 hover:underline hover:decoration-2 hover:underline-offset-4"
                                        onClick={playClick}
                                    >
                                        <MailIcon />
                                        {findUs[2].label}
                                    </a>
                                </li>
                                <li className="flex items-start gap-2">
                                    <MapIcon />
                                    {findUs[3].label}
                                </li>
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