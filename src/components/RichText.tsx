"use client";

import { useEffect, useState } from "react";

export default function RichText({ content }: { content: string }) {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { remark } = await import("remark");
      const remarkHtml = (await import("remark-html")).default;
      const vfile = await remark().use(remarkHtml).process(content || "");
      if (!cancelled) setHtmlContent(String(vfile));
    })();
    return () => {
      cancelled = true;
    };
  }, [content]);

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
