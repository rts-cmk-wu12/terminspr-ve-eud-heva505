"use client";

import { useMemo, useState } from "react";

import { makeActivityPlaceholder } from "@/lib/placeholder";

export default function SmartImage({

  src,

  alt,

  // أبعاد الرسم داخل البطاقة (نحتاجها لتوليد الـSVG)

  fallbackText = "",

  width = 356,

  height = 236,

  className = "",

  imgProps = {}, // تمرير خصائص إضافية للـ<img>

}) {

  // نحضّر placeholder لمرة واحدة

  const placeholder = useMemo(

    () => makeActivityPlaceholder(fallbackText || alt || "A", { w: width, h: height }),

    [fallbackText, alt, width, height]

  );

  const [currentSrc, setCurrentSrc] = useState(src || placeholder);

  return (
<img

      src={currentSrc}

      alt={alt || "image"}

      className={className}

      loading="lazy"

      onError={() => setCurrentSrc(placeholder)} // أي خطأ → بديل

      {...imgProps}

    />

  );

}
 