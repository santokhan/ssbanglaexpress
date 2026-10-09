"use client";

type AvatarImageProps = {
  src?: string | null;
  alt?: string;
  className?: string;
};

const fallback = "/images/profile-placeholder.png";

export default function AvatarImage({ src, alt = "", className = "" }: AvatarImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src || fallback}
      alt={alt}
      className={className}
      onError={(event) => {
        const fallbackUrl = new URL(fallback, window.location.origin).href;
        if (event.currentTarget.src !== fallbackUrl) event.currentTarget.src = fallback;
      }}
    />
  );
}
