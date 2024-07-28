import SectionTitle from '@/components/common/SectionTitle';
import React from 'react';
import servicesSection from '@/assets/images/services-section.png';
import servicesImage from '@/assets/images/services-image.png';
import Image from 'next/image';

const Details = () => {
  return (
    <section className="section">
      <div className="max-w-4xl mx-auto">
        <SectionTitle className="text-center">Empowering Your <span className="text-rose-800">Business</span> Potential</SectionTitle>
        <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci at quos dolorem totam tempore cumque.</p>
      </div>
      <div className="container mx-auto px-4 overflow-hidden flex flex-wrap items-center gap-8">
        <div className="basis-96 flex-grow">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <li className="py-2">
              <div className="size-8 rounded-full shadow-lg mb-4 text-center bg-white text-rose-800">?</div>
              <span className="inline-block">International Courier Export</span>
            </li>
            <li className="py-2">
              <div className="size-8 rounded-full shadow-lg mb-4 text-center bg-white text-rose-800">?</div>
              <span className="inline-block">Imports (Courier & Cargo)</span>
            </li>
            <li className="py-2">
              <div className="size-8 rounded-full shadow-lg mb-4 text-center bg-white text-rose-800">?</div>
              <span className="inline-block">Customs Clearance</span>
            </li>
            <li className="py-2">
              <div className="size-8 rounded-full shadow-lg mb-4 text-center bg-white text-rose-800">?</div>
              <span className="inline-block">24x7 hour Online Internet Tracking</span>
            </li>
            <li className="py-2">
              <div className="size-8 rounded-full shadow-lg mb-4 text-center bg-white text-rose-800">?</div>
              <span className="inline-block">Instant Customer Query Response</span>
            </li>
            <li className="py-2">
              <div className="size-8 rounded-full shadow-lg mb-4 text-center bg-white text-rose-800">?</div>
              <span className="inline-block">Pick up and delivery services</span>
            </li>
          </ul>
        </div>
        <div className="basis-96 flex-grow relative flex items-center">
          <div className="w-7/12 overflow-hidden h-full">
            <Image src={servicesSection} alt="service-image" className="w-full aspect-[3/4] object-cover rounded-xl" width={800} height={600} />
          </div>
          <div className="w-6/12 overflow-hidden h-full absolute left-1/2 flex flex-col justify-center">
            <Image src={servicesImage} alt="service-image" className="w-full aspect-[3/4] object-cover rounded-xl border-[6px] border-white" width={800} height={600} />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 overflow-hidden flex flex-wrap">
        <div className="basis-96 flex-grow">
          <div className=" px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Working Hours</h2>
            <ul className="">
              <li className="flex items-start py-2">
                <span className="inline-block w-1/3">Sunday - Thursday:</span>
                <span className="inline-block w-2/3">08:00 - 22:00</span>
              </li>
              <li className="flex items-start py-2">
                <span className="inline-block w-1/3">Saturday:</span>
                <span className="inline-block w-2/3">08:00 - 20:00</span>
              </li>
              <li className="flex items-start py-2">
                <span className="inline-block w-1/3">Friday and holidays:</span>
                <span className="inline-block w-2/3">10:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
