const FAQ = () => {
  return (
    <div className="space-y-3">
      <details className="rounded-lg overflow-hidden shadow-lg bg-white">
        <summary className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 bg-white p-4">
          <span>What is Micro Components?</span>
          <i className="fa fa-angle-down" />
        </summary>
        <div className="accordion border-t">
          <div className="py-5 font-light bg-white p-4">
            <p className="mb-2 text-gray-500">
              Micro Components is an open-source library of interactive
              components built on top of Tailwind CSS including buttons,
              dropdowns, modals, navbars, and more.
            </p>
          </div>
        </div>
      </details>
      <details className="rounded-lg overflow-hidden shadow-lg bg-white">
        <summary className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 bg-white p-4">
          <span>Is there a Figma file available?</span>
          <i className="fa fa-angle-down" />
        </summary>
        <div className="accordion border-t">
          <div className="py-5 font-light bg-white p-4">
            <p className="mb-2 text-gray-500">
              Micro Components is first conceptualized and designed using the
              Figma software so everything you see in the library has a design
              equivalent in our Figma file.
            </p>
          </div>
        </div>
      </details>
      <details className="rounded-lg overflow-hidden shadow-lg bg-white">
        <summary className="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 bg-white p-4">
          <span>What are the differences between Micro Components and Tailwind UI?</span>
          <i className="fa fa-angle-down" />
        </summary>
        <div className="accordion border-t">
          <div className="py-5 font-light bg-white p-4">
            <p className="mb-2 text-gray-500">
              The main difference is that the core components from Micro
              Components are open source under the MIT license, whereas Tailwind
              UI is a paid product.
            </p>
          </div>
        </div>
      </details>
    </div>
  );
};

export default FAQ;
