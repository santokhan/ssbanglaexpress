import { cn } from "@/lib/utils";

const ContactForm = ({ className = "" }) => {
    return (
        <div className={cn("py-12 lg:py-20 space-y-6 px-4 lg:p-8 max-w-2xl mx-auto", className)}>
            <h2 className="text-4xl font-bold text-center mb-4">Get in touch</h2>
            <form>
                <div className="flex flex-wrap lg:flex-nowrap gap-5">
                    <div className="w-full mb-5">
                        <input
                            type="text"
                            id="firstName"
                            className="bg-gray-100 text-gray-900 text-base rounded-lg focus:outline-none block w-full px-4 py-3"
                            placeholder="John"
                            required=""
                        />
                    </div>
                    <div className="w-full mb-5">
                        <input
                            type="text"
                            id="lastName"
                            className="bg-gray-100 text-gray-900 text-base rounded-lg focus:outline-none block w-full px-4 py-3"
                            placeholder="Doe"
                            required=""
                        />
                    </div>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap gap-5">
                    <div className="w-full mb-5">
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-100 text-gray-900 text-base rounded-lg focus:outline-none block w-full px-4 py-3"
                            placeholder="banglaexpress01@gmail.com"
                            required=""
                        />
                    </div>
                    <div className="w-full mb-5">
                        <input
                            type="text"
                            id="phone"
                            className="bg-gray-100 text-gray-900 text-base rounded-lg focus:outline-none block w-full px-4 py-3"
                            placeholder="+123 456 789"
                            required=""
                        />
                    </div>
                </div>
                <div>
                    <textarea
                        id="message"
                        rows="6"
                        className="block px-4 py-3 w-full text-base text-gray-900 bg-gray-100 rounded-100 focus:outline-none"
                        placeholder="Message"
                    ></textarea>
                </div>
                <div className="flex justify-end w-full mt-8">
                    <button
                        type="submit"
                        className="text-white bg-black hover:brightness-90 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm