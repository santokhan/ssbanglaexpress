import Image from "next/image"
import placeholder from '@/assets/images/placeholder.png'
import Link from "next/link"

const BlogCard = ({ image = "", title = "Title", description = "Lorem ipsum dolor sit amit lorem ipsum dolor sit amit ipsum dolor sit amit. Lorem ipsum dolor sit amit. Lorem ipsum dolor sit amit. Lorem ipsum dolor sit amit. Lorem ipsum dolor sit amit." }) => {
    return (
        <div className="rounded-lg lg:rounded-xl bg-white">
            <Link href={"/blogs"}>
                <Image src={image || placeholder} alt="" className="w-full aspect-video lg:aspect-[4/3] bg-gray-50 rounded-lg lg:rounded-xl" width={400} height={400} />
            </Link>
            <div className="py-4">
                <time dateTime="2022-02-03" className="text-gray-700 font-semibold">Feb 3, 2022</time>
                <h4 className="mt-2 mb-2 text-lg font-semibold lg:text-[1.5rem]">
                    <Link href={"/blogs"} className="" style={{
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        display: "-webkit-box",
                        overflowY: "hidden",
                    }}>{title}</Link>
                </h4>
                {/* <p className="mb-4" style={{
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    display: "-webkit-box",
                    overflowY: "hidden",
                }}>{description}</p> */}
                <Link href={"/blogs"} className="text-sm text-rose-800">Read more</Link>
            </div>
        </div>
    )
}

export default BlogCard