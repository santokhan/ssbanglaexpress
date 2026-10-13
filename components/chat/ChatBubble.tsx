import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function ChatBubble() {
  return (
    <Link
      href="/messages"
      aria-label="Chat with our team"
      className="fixed bottom-5 right-5 z-[70] inline-flex min-h-14 items-center gap-3 rounded-full bg-[#b81e46] px-5 text-sm font-semibold text-white shadow-xl shadow-[#b81e46]/30 transition hover:-translate-y-0.5 hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b81e46] sm:bottom-7 sm:right-7"
    >
      <MessageCircle aria-hidden="true" className="size-5" />
      <span>Message us</span>
    </Link>
  );
}
