import React from 'react'
import aboutImage from '@/assets/images/about-us.png'
import SectionTitle from '@/components/common/SectionTitle'
import Image from 'next/image'

const AboutUs = () => {
    return (
        <section className="section">
            <div className="container mx-auto px-4 flex flex-wrap items-center gap-12">
                <Image src={aboutImage} alt={'about'} className="basis-96 flex-grow aspect-[4/3] object-cover rounded-xl" width={600} height={600} />

                <div className="basis-96 flex-grow space-y-4">
                    <SectionTitle className="">Efficient Shipment Services: Reliable Delivery Solutions</SectionTitle>

                    <div className="">
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold mb-2">Domestic and International Shipping</h3>
                            <p className="text-gray-700 mb-4">
                                From local deliveries to global shipments, we offer comprehensive shipping solutions tailored to your needs.
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl font-semibold mb-2">Express Delivery Options</h3>
                            <p className="text-gray-700 mb-4">
                                Need it there fast? Choose from our range of express delivery services to ensure your package arrives on time.
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl font-semibold mb-2">Customs Clearance Assistance</h3>
                            <p className="text-gray-700 mb-4">
                                Navigating customs regulations can be complex. Our experts provide guidance to ensure your shipments clear smoothly.
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-xl font-semibold mb-2">Parcel Tracking</h3>
                            <p className="text-gray-700 mb-4">
                                Stay informed with real-time tracking updates. Know where your package is every step of the way.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs
