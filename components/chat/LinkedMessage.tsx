"use client";

import { useEffect, useState } from "react";

const URL_PATTERN = /https?:\/\/[^\s<>{}\[\]"']+/gi;

type LinkPreview = {
  url: string;
  title?: string;
  image?: string;
  description?: string;
};

function extractLinks(content: string) {
  const matches = content.match(URL_PATTERN) ?? [];
  const cleanedLinks = matches.map((url) => url.replace(/[),.!?;:]+$/, ""));

  return [...new Set(cleanedLinks)];
}

function MessageText({ content, links, mine }: {
  content: string;
  links: string[];
  mine: boolean;
}) {
  const pieces = content.split(URL_PATTERN);
  let linkIndex = 0;

  return (
    <p className="whitespace-pre-wrap break-words text-sm leading-6">
      {pieces.map((piece, index) => {
        if (index % 2 === 0) return piece;

        const href = links[linkIndex++] ?? piece;
        const linkColor = mine ? "text-white" : "text-[#a61940]";

        return (
          <a
            key={`${index}-${piece}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-semibold underline underline-offset-2 ${linkColor}`}
          >
            {piece}
          </a>
        );
      })}
    </p>
  );
}

function LinkPreviewCard({ preview, mine }: {
  preview: LinkPreview;
  mine: boolean;
}) {
  const borderColor = mine ? "border-white/20" : "border-slate-200";
  const detailsBackground = mine ? "bg-white/10" : "bg-slate-50";

  return (
    <a
      href={preview.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`mt-3 block overflow-hidden rounded-xl border ${borderColor}`}
    >
      {preview.image && (
        <img
          src={preview.image}
          alt=""
          className="max-h-48 w-full object-cover"
          loading="lazy"
        />
      )}

      <span className={`block p-3 ${detailsBackground}`}>
        {preview.title && (
          <span className="block text-sm font-bold">{preview.title}</span>
        )}
        {preview.description && (
          <span className="mt-1 line-clamp-2 block text-xs opacity-75">
            {preview.description}
          </span>
        )}
        <span className="mt-1 block break-all text-[11px] opacity-70">
          {preview.url}
        </span>
      </span>
    </a>
  );
}

function LinkList({ links, mine }: { links: string[]; mine: boolean }) {
  const background = mine ? "bg-white/10" : "bg-slate-50";

  return (
    <div className={`mt-2 rounded-lg px-3 py-2 text-xs ${background}`}>
      <p className="mb-1 font-semibold">Link shared</p>
      {links.map((link) => (
        <a
          key={link}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block break-all underline underline-offset-2"
        >
          {link}
        </a>
      ))}
    </div>
  );
}

export default function LinkedMessage({
  content,
  mine,
}: {
  content: string;
  mine: boolean;
}) {
  const links = extractLinks(content);
  const [preview, setPreview] = useState<LinkPreview | null>(null);

  useEffect(() => {
    let isActive = true;
    setPreview(null);

    if (links.length > 0) {
      const previewUrl = links[0];
      const query = encodeURIComponent(previewUrl);

      void fetch(`/api/link-preview?url=${query}`)
        .then((response) => (response.ok ? response.json() : null))
        .then((data) => {
          if (isActive && data) {
            setPreview({ url: previewUrl, ...data });
          }
        })
        .catch(() => {});
    }

    return () => {
      isActive = false;
    };
  }, [content]);

  return (
    <>
      <MessageText content={content} links={links} mine={mine} />

      {links.length > 0 &&
        (preview?.image ? (
          <LinkPreviewCard preview={preview} mine={mine} />
        ) : (
          <LinkList links={links} mine={mine} />
        ))}
    </>
  );
}
