import BlogCard from "@/components/common/BlogCard"
import type { StaticImageData } from "next/image";

type Blog = { image?: string | StaticImageData; title?: string };

const Blogs = ({ blogs = Array.from({ length: 6 }, () => ({})) }: { blogs?: Blog[] }) => {

    return (
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((item, index) => (
                <BlogCard key={index} {...item} />
            ))}
        </div>
    )
}

export default Blogs
