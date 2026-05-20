import { cn } from "@/lib/utils";

const ContactForm = ({ className = "" }) => {
    return (
        <div className={cn("py-12 lg:py-20 space-y-8 lg:space-y-12 px-4 lg:p-8 max-w-2xl mx-auto", className)}>
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Contact information</p>
                <div className="mt-6 space-y-4 text-gray-700">
                    <div>
                        <p className="font-semibold">WhatsApp</p>
                        <p className="text-sm text-slate-600">+8801611327764</p>
                    </div>
                    <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-sm text-slate-600">banglaexpress01@gmail.com</p>
                    </div>
                    <div>
                        <p className="font-semibold">Address</p>
                        <p className="text-sm text-slate-600">South View, House #14, Road #17, Sector #14, Uttara, Dhaka 1230</p>
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-4xl font-bold text-center mb-4">Get in touch</h2>
                <form className="space-y-5">
                    <div className="flex flex-wrap lg:flex-nowrap gap-5">
                        <div className="w-full">
                            <input
                                type="text"
                                id="firstName"
                                className="bg-gray-100 text-gray-900 text-base rounded-lg focus:outline-none block w-full px-4 py-3"
                                placeholder="First name"
                                required
                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                id="lastName"
                                className="bg-gray-100 text-gray-900 text-base rounded-lg focus:outline-none block w-full px-4 py-3"
                                placeholder="Last name"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap lg:flex-nowrap gap-5">
                        <div className="w-full">
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-100 text-gray-900 text-base rounded-lg focus:outline-none block w-full px-4 py-3"
                                placeholder="banglaexpress01@gmail.com"
                                required
                            />
                        </div>
                        <div className="w-full">
                            <input
                                type="text"
                                id="phone"
                                className="bg-gray-100 text-gray-900 text-base rounded-lg focus:outline-none block w-full px-4 py-3"
                                placeholder="+880 1611 327 764"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <textarea
                            id="message"
                            rows="6"
                            className="block px-4 py-3 w-full text-base text-gray-900 bg-gray-100 rounded-3xl focus:outline-none"
                            placeholder="Message"
                        ></textarea>
                    </div>
                    <div className="flex justify-end w-full mt-8">
                        <button
                            type="submit"
                            className="text-white bg-black hover:brightness-90 font-medium rounded-full text-base w-full sm:w-auto px-6 py-3 text-center"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactForm