import SectionTitle from '@/components/common/SectionTitle';
import React from 'react';
import shippingBoxes from '@/assets/images/shipping-boxes.png';
import aboutUs from '@/assets/images/about-us.png';
import Image from 'next/image';

const Details = () => {
  const strengths = [
    {
      title: 'Daily pickup, no limits',
      description: 'Schedule parcel pickup anywhere in Dhaka without restrictions.',
    },
    {
      title: 'Cash on delivery',
      description: 'Receive COD payments securely and quickly with merchant support.',
    },
    {
      title: 'Faster payment service',
      description: 'Choose bank transfer or mobile payment for fast settlement.',
    },
    {
      title: 'Online management',
      description: 'Monitor every delivery through a simple merchant dashboard.',
    },
    {
      title: 'Real-time tracking',
      description: 'Know exact parcel status from pickup to delivery.',
    },
    {
      title: '24/7 customer service',
      description: 'Our support team is available around the clock for every query.',
    },
  ];

  return (
    <section className="section bg-slate-50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <div>
            <SectionTitle className="text-left">Merchant and Customer Satisfaction is Our First Priority</SectionTitle>
            <p className="mt-4 max-w-2xl text-gray-600">
              We offer the lowest delivery charge with the highest value along with 100% safety of your product. SS Bangla Express delivers your parcels right on time.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {strengths.map((item, index) => (
                <div key={index} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-slate-200">
              <Image
                src={aboutUs}
                alt="Logistics operations"
                className="w-full object-cover"
                width={900}
                height={700}
              />
            </div>
            <div className="overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-slate-200">
              <Image
                src={shippingBoxes}
                alt="Courier service"
                className="w-full object-cover"
                width={900}
                height={700}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
