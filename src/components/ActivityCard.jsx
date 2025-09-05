"use client";
// Importer / استيراد
import Link from "next/link";
import { useMemo, useState } from "react";

function makeActivityPlaceholder(text = "A", { w = 356, h = 344 } = {}) {
  const initials =
    (text || "A")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((s) => s[0]?.toUpperCase() || "")
      .join("") || "A";
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
<stop offset='0%' stop-color='#000000' stop-opacity='1'/>
<stop offset='100%' stop-color='#E1A1E9' stop-opacity='0.8'/>
</linearGradient></defs>
<rect x='0' y='0' width='${w}' height='${h}' rx='24' ry='24' fill='url(#g)'/>
<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
     font-family='ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto'
     font-size='${Math.round(
       h * 0.28
     )}' fill='#000' fill-opacity='0.75'>${initials}</text>
</svg>`;
  const enc = encodeURIComponent(svg)
    .replace(/%20/g, " ")
    .replace(/%0A/g, "")
    .replace(/%3D/g, "=")
    .replace(/%3A/g, ":")
    .replace(/%2F/g, "/")
    .replace(/%22/g, "'");
  return `data:image/svg+xml;charset=utf-8,${enc}`;
}
function SmartImage({
  src,
  alt,
  fallbackText = "",
  width = 356,
  height = 344,
  className = "",
  imgProps = {},
}) {
  const placeholder = // Memo / حفظ محاسبات
    useMemo(
      () =>
        makeActivityPlaceholder(fallbackText || alt || "A", {
          w: width,
          h: height,
        }),
      [fallbackText, alt, width, height]
    );
  const [apiImage, setCurrentSrc] = // Tilstand / حالة
    useState(src || placeholder);
  // UI
  return (
    <img
      src={apiImage}
      alt={alt || "image"}
      className={className}
      loading="lazy"
      onError={() => setCurrentSrc(placeholder)}
      {...imgProps}
    />
  );
}
// Komponent / المكوّن الرئيسي

export default function ActivityCard({ activity }) {
  const { id, name, image, minAge, maxAge, ageRange, asset } = activity || {};
  const apiImage = asset?.url || image;

  return (
    <li>
      <Link href={`/activities/${id}`} className="block group">
        <div
          className={[
            "relative overflow-hidden rounded-[24px]",
            "bg-white/5 ring-1 ring-black/5",
            "transition-transform duration-300 group-hover:scale-[1.01]",
            "shadow-[0_8px_24px_rgba(0,0,0,0.25)]",
            "w-full max-w-[356px] h-[344px]",
          ].join(" ")}
        >
          {}
          <SmartImage
            src={apiImage}
            alt={name ?? "Activity image"}
            fallbackText={name}
            width={356}
            height={344}
            className="w-full h-full object-cover"
          />

          {}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent z-[1]" />

          {}
          <div
            className="
              absolute left-0 right-0 bottom-0 z-[3]
              rounded-tr-[28px] rounded-bl-[28px]   
               bg-[#E1A1E9]/80 backdrop-blur-[3px]  
              px-4 py-6 text-ink
            "
          >
            <div className="text-16 font-semibold leading-tight line-clamp-1">
              {name}
            </div>
            <div className="text-12 opacity-70">
              {ageRange
                ? ageRange
                : minAge != null && maxAge != null
                ? `${minAge}-${maxAge} år`
                : "Aldersgruppe"}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
