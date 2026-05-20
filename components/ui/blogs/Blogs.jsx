import BlogCard from "@/components/common/BlogCard"

const Blogs = ({ blogs }) => {
    blogs = blogs || Array(6).fill(null)

    return (
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((item, index) => (
                <BlogCard key={index} {...item} />
            ))}
        </div>
    )
}

export default Blogs