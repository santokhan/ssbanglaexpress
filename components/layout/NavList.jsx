import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navbarNavsArray } from "./navs.js"

const NavList = () => {
  const pathName = usePathname()
  return (
    <div className="flex flex-col lg:flex-row items-center text-2xl lg:text-lg">
      {navbarNavsArray.map((linkObject) => (
        <Link
          key={linkObject.name}
          href={linkObject.link}
          className={cn("mx-4 my-2 hover:underline underline-offset-4 decoration-2",
            pathName === linkObject.link ? "text-rose-700" : ""
          )}
        >
          {linkObject.name}
        </Link>
      ))}
    </div>
  )
};

export default NavList;
