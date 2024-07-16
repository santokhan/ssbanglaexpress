import React from 'react';

const Details = () => {
  return (
    <section className="section">
      <div className="container mx-auto px-4 overflow-hidden flex flex-wrap">
        <div className="basis-96 flex-grow px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Services</h2>
          <ul className="">
            <li className="flex items-start py-2">
              <span className="inline-block w-1/2">International Courier Export</span>
            </li>
            <li className="flex items-start py-2">
              <span className="inline-block w-1/2">Imports (Courier & Cargo)</span>
            </li>
            <li className="flex items-start py-2">
              <span className="inline-block w-1/2">Customs Clearance</span>
            </li>
            <li className="flex items-start py-2">
              <span className="inline-block w-1/2">24x7 hour Online Internet Tracking</span>
            </li>
            <li className="flex items-start py-2">
              <span className="inline-block w-1/2">Instant Customer Query Response</span>
            </li>
            <li className="flex items-start py-2">
              <span className="inline-block w-1/2">Pick up and delivery services</span>
            </li>
          </ul>
        </div>
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
