import { usePathname } from "next/navigation";
import NavLink from "./NavLink.js";
import { navbarNavsArray } from "../navs.js";

const NavList = () => {
  const pathName = usePathname();

  return (
    <div className="flex flex-col lg:flex-row items-center text-2xl lg:text-xl">
      {navbarNavsArray.map((linkObject) => (
        <NavLink
          key={linkObject.link}
          link={linkObject.link}
          name={linkObject.name}
          isActive={pathName === linkObject.link}
        />
      ))}
    </div>
  );
};

export default NavList;
