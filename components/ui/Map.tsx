import { cn } from "@/lib/utils"

const Map = ({ className = "" }) => {
    return (
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.6052071534746!2d90.38781757612213!3d23.868148884244395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c77ebf98ae5d%3A0x45d26277cb3ef909!2sSS%20Bangla%20Express!5e0!3m2!1sen!2ssg!4v1722178712080!5m2!1sen!2ssg"
            className={cn("w-full aspect-video max-h-[540px] object-cover", className)}
            style={{
                border: 0,
                boxShadow: "-16px 20px 0px 0px rgba(0, 0, 0, 0.1)"
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        />
    )
}

export default Map