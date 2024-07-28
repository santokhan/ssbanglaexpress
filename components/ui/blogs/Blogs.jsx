import BlogCard from "@/components/common/BlogCard"
import { Fragment } from "react"

const Blogs = ({ blogs }) => {
    blogs = blogs || Array(6).fill(null)

    return (
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((item, index) => {
                return (
                    <Fragment key={index}>
                        <BlogCard {...item} />
                    </Fragment>
                )
            })}
        </div>
    )
}

export default Blogs