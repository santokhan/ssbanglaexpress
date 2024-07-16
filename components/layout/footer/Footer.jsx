import Link from "next/link";
import Logo from "../Logo";
import Copyright from "./Copyright";
import Social from "./Social";
import { cn } from "@/lib/utils";

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
                label: "Cookies",
                path: "/Cookies"
            },
            {
                label: "Terms",
                path: "/terms"
            },
        ],
        [
            {
                label: "Press",
                path: "/press"
            },
            {
                label: "Blog",
                path: "/blog"
            },
            {
                label: "Privacy",
                path: "/privacy"
            },
            {
                label: "Claim",
                path: "/claim"
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
            label: "South View Graund floor, House #14, Road #17, Sectors #14, Uttara Dhaka, Dhaka-1230 Bangladesh 🇧🇩",
        },
    ]

    const Title = ({ children }) => <h3 className="text-base font-bold">{children}</h3>
    const LinksBox = ({ children, className = "" }) => <div className={cn("flex-grow space-y-4 text-base inline-flex flex-col items-start", className)}>{children}</div>

    return (
        <footer className="bg-white">
            <hr />
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:divide-y sm:divide-gray-200">
                    <div className="flex flex-wrap gap-x-12 gap-y-12">
                        <div className="basis-64 flex-grow space-y-8">
                            <Logo />
                            <p className="lg:pr-6">To be market leader and to be customers first choice for economy express courier service industry in Bangladesh and to offer the possible shortest time with most affordable price.</p>
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
                                        )}
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
                                            "transition-all ease-in hover:translate-x-2 hover:underline hover:decoration-2 hover:underline-offset-4"
                                        )}
                                    >{nav.label}</Link>
                                ))
                            }
                        </LinksBox>
                        <LinksBox className="basis-64">
                            <Title>Find us</Title>
                            <ul className="flex flex-col items-start space-y-4">
                                <li className="flex items-start justify-start gap-2">
                                    <a href={findUs[0].path} className="flex items-center gap-2 transition-all ease-in hover:translate-x-2 hover:underline hover:decoration-2 hover:underline-offset-4">
                                        <svg className="size-5 flex-shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.3084 15.2751C18.3084 15.5751 18.2417 15.8834 18.1 16.1834C17.9584 16.4834 17.775 16.7667 17.5334 17.0334C17.125 17.4834 16.675 17.8084 16.1667 18.0167C15.6667 18.2251 15.125 18.3334 14.5417 18.3334C13.6917 18.3334 12.7834 18.1334 11.825 17.7251C10.8667 17.3167 9.90835 16.7667 8.95835 16.0751C8.00002 15.3751 7.09169 14.6001 6.22502 13.7417C5.36669 12.8751 4.59169 11.9667 3.90002 11.0167C3.21669 10.0667 2.66669 9.11675 2.26669 8.17508C1.86669 7.22508 1.66669 6.31675 1.66669 5.45008C1.66669 4.88341 1.76669 4.34175 1.96669 3.84175C2.16669 3.33341 2.48335 2.86675 2.92502 2.45008C3.45835 1.92508 4.04169 1.66675 4.65835 1.66675C4.89169 1.66675 5.12502 1.71675 5.33335 1.81675C5.55002 1.91675 5.74169 2.06675 5.89169 2.28341L7.82502 5.00842C7.97502 5.21675 8.08335 5.40841 8.15835 5.59175C8.23335 5.76675 8.27502 5.94175 8.27502 6.10008C8.27502 6.30008 8.21669 6.50008 8.10002 6.69175C7.99169 6.88341 7.83335 7.08341 7.63335 7.28341L7.00002 7.94175C6.90835 8.03341 6.86669 8.14175 6.86669 8.27508C6.86669 8.34175 6.87502 8.40008 6.89169 8.46675C6.91669 8.53341 6.94169 8.58341 6.95835 8.63341C7.10835 8.90841 7.36669 9.26675 7.73335 9.70008C8.10835 10.1334 8.50835 10.5751 8.94169 11.0167C9.39169 11.4584 9.82502 11.8667 10.2667 12.2417C10.7 12.6084 11.0584 12.8584 11.3417 13.0084C11.3834 13.0251 11.4334 13.0501 11.4917 13.0751C11.5584 13.1001 11.625 13.1084 11.7 13.1084C11.8417 13.1084 11.95 13.0584 12.0417 12.9667L12.675 12.3417C12.8834 12.1334 13.0834 11.9751 13.275 11.8751C13.4667 11.7584 13.6584 11.7001 13.8667 11.7001C14.025 11.7001 14.1917 11.7334 14.375 11.8084C14.5584 11.8834 14.75 11.9917 14.9584 12.1334L17.7167 14.0917C17.9334 14.2417 18.0834 14.4167 18.175 14.6251C18.2584 14.8334 18.3084 15.0417 18.3084 15.2751Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} />
                                        </svg>
                                        {findUs[0].label}
                                    </a>
                                </li>
                                <li className="flex items-start justify-start gap-2">
                                    <a href={findUs[1].path} className="flex items-center gap-2 transition-all ease-in hover:translate-x-2 hover:underline hover:decoration-2 hover:underline-offset-4">
                                        <svg className="size-5 flex-shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.3084 15.2751C18.3084 15.5751 18.2417 15.8834 18.1 16.1834C17.9584 16.4834 17.775 16.7667 17.5334 17.0334C17.125 17.4834 16.675 17.8084 16.1667 18.0167C15.6667 18.2251 15.125 18.3334 14.5417 18.3334C13.6917 18.3334 12.7834 18.1334 11.825 17.7251C10.8667 17.3167 9.90835 16.7667 8.95835 16.0751C8.00002 15.3751 7.09169 14.6001 6.22502 13.7417C5.36669 12.8751 4.59169 11.9667 3.90002 11.0167C3.21669 10.0667 2.66669 9.11675 2.26669 8.17508C1.86669 7.22508 1.66669 6.31675 1.66669 5.45008C1.66669 4.88341 1.76669 4.34175 1.96669 3.84175C2.16669 3.33341 2.48335 2.86675 2.92502 2.45008C3.45835 1.92508 4.04169 1.66675 4.65835 1.66675C4.89169 1.66675 5.12502 1.71675 5.33335 1.81675C5.55002 1.91675 5.74169 2.06675 5.89169 2.28341L7.82502 5.00842C7.97502 5.21675 8.08335 5.40841 8.15835 5.59175C8.23335 5.76675 8.27502 5.94175 8.27502 6.10008C8.27502 6.30008 8.21669 6.50008 8.10002 6.69175C7.99169 6.88341 7.83335 7.08341 7.63335 7.28341L7.00002 7.94175C6.90835 8.03341 6.86669 8.14175 6.86669 8.27508C6.86669 8.34175 6.87502 8.40008 6.89169 8.46675C6.91669 8.53341 6.94169 8.58341 6.95835 8.63341C7.10835 8.90841 7.36669 9.26675 7.73335 9.70008C8.10835 10.1334 8.50835 10.5751 8.94169 11.0167C9.39169 11.4584 9.82502 11.8667 10.2667 12.2417C10.7 12.6084 11.0584 12.8584 11.3417 13.0084C11.3834 13.0251 11.4334 13.0501 11.4917 13.0751C11.5584 13.1001 11.625 13.1084 11.7 13.1084C11.8417 13.1084 11.95 13.0584 12.0417 12.9667L12.675 12.3417C12.8834 12.1334 13.0834 11.9751 13.275 11.8751C13.4667 11.7584 13.6584 11.7001 13.8667 11.7001C14.025 11.7001 14.1917 11.7334 14.375 11.8084C14.5584 11.8834 14.75 11.9917 14.9584 12.1334L17.7167 14.0917C17.9334 14.2417 18.0834 14.4167 18.175 14.6251C18.2584 14.8334 18.3084 15.0417 18.3084 15.2751Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} />
                                        </svg>
                                        {findUs[1].label}
                                    </a>
                                </li>
                                <li className="flex items-start justify-start gap-2">
                                    <a href={findUs[2].path} className="flex items-center gap-2 transition-all ease-in hover:translate-x-2 hover:underline hover:decoration-2 hover:underline-offset-4">
                                        <svg className="size-5 flex-shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.1667 17.0834H5.83335C3.33335 17.0834 1.66669 15.8334 1.66669 12.9167V7.08341C1.66669 4.16675 3.33335 2.91675 5.83335 2.91675H14.1667C16.6667 2.91675 18.3334 4.16675 18.3334 7.08341V12.9167C18.3334 15.8334 16.6667 17.0834 14.1667 17.0834Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" /><path d="M14.1666 7.5L11.5583 9.58333C10.7 10.2667 9.29164 10.2667 8.43331 9.58333L5.83331 7.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {findUs[2].label}
                                    </a>
                                </li>
                                <li className="flex items-start justify-start gap-2">
                                    <svg className="size-5 flex-shrink-0" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 11.1917C11.436 11.1917 12.6 10.0276 12.6 8.5917C12.6 7.15576 11.436 5.9917 10 5.9917C8.56408 5.9917 7.40002 7.15576 7.40002 8.5917C7.40002 10.0276 8.56408 11.1917 10 11.1917Z" stroke="currentColor" strokeWidth="1.5" /><path d="M3.01663 7.07508C4.65829 -0.141583 15.35 -0.13325 16.9833 7.08342C17.9416 11.3167 15.3083 14.9001 13 17.1168C11.325 18.7334 8.67496 18.7334 6.99163 17.1168C4.69163 14.9001 2.05829 11.3084 3.01663 7.07508Z" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                    {findUs[3].label}
                                </li>
                            </ul>
                        </LinksBox>
                    </div>
                </div>
            </section>
            <Copyright />
        </footer>
    );
};

export default Footer;