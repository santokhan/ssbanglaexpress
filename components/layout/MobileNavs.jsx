// MobileNavs.jsx

"use client";

import Drawer from "rc-drawer";
import { Suspense, useState } from "react";
import { twMerge } from "tailwind-merge";
import { CloseCircle } from "iconsax-react";
import Social from "./footer/Social";
import NavList from "./navbar/NavList";

const MobileNavs = ({ transparent = false }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleOpen}
        className={twMerge("hover:text-rose-950")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-8"
        >
          <path
            fillRule="evenodd"
            d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
            fill="currentColor"
          />
        </svg>
      </button>
      {open && (
        <Drawer
          open={open}
          onClose={toggleOpen}
          className="w-full h-full z-[5] fixed right-0 top-0 bg-white p-6 border-l"
        >
          <button
            type="button"
            onClick={toggleOpen}
            className="absolute top-4 right-4 hover:text-rose-950"
          >
            <CloseCircle aria-hidden="true" className="h-7 w-7" />
          </button>
          <div className="mt-12">
            <NavList
              transparent={transparent}
              className={"flex-col items-start !text-2xl gap-3"}
            />
          </div>
          <div className="flex justify-center mt-12">
            <Social />
          </div>
        </Drawer>
      )}
    </>
  );
};

export default MobileNavs;
