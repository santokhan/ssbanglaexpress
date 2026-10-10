import { cn } from "@/lib/utils";

const Map = ({ className = "" }) => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d666.0221061169709!2d90.39013031122323!3d23.868104361615657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5005da954dd%3A0x49e0a339571a2082!2sShikder%20Palace!5e0!3m2!1sen!2ssg!4v1791658151391!5m2!1sen!2ssg"
      className={cn(
        "w-full aspect-video max-h-[540px] object-cover",
        className,
      )}
      style={{
        border: 0,
        boxShadow: "-16px 20px 0px 0px rgba(0, 0, 0, 0.1)",
      }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};

export default Map;
