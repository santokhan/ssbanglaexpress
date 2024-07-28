'use server'

import SectionTitle from "@/components/common/SectionTitle"
import Blogs from "./Blogs"
import Href from "@/components/common/Href"

const BlogsSection = async () => {
    const res = await fetch('http://localhost:3000/blogs.json')
    const blogs = await res.json()

    return (
        <section className="section">
            <div className="max-w-2xl mx-auto px-4">
                <SectionTitle className="text-center">Get The <span className="text-rose-800">Latest</span> Our News</SectionTitle>
                <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos saepe officiis voluptatibus similique suscipit</p>
            </div>
            {blogs.length > 0 ? <Blogs blogs={blogs} /> : ""}
            <div className="container mx-auto px-4 flex justify-center">
                <Href href={"/blogs"}>Read more</Href>
            </div>
        </section>
    );
}

export default BlogsSection