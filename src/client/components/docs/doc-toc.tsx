import type { PageData } from "@/app.tsx";
import { Title } from "@mantine/core";
import React, { type Dispatch, type SetStateAction, useState } from "react";
import { Text } from "@mantine/core";
const useIntersectionObserver = (
  setActiveId: Dispatch<SetStateAction<string>>,
  isScrolling: boolean,
) => {
  let listRef = React.useRef<IntersectionObserverEntry[]>([]);

  React.useEffect(() => {
    let headings = Array.from(document.querySelectorAll("h2, h3, h4, h5, h6"));

    let callback = (elements: IntersectionObserverEntry[]) => {
      if (isScrolling) {
        return;
      }

      listRef.current = elements.reduce((prev, el) => {
        prev[el.target.id] = el;

        return prev;
      }, listRef.current as any);

      let visibles: string[] = [];

      Object.keys(listRef.current).forEach((key) => {
        let el = listRef.current[key as any];

        if (el.isIntersecting) {
          visibles.push(el.target.id);
        }
      });

      let getIndex = (id: string): number => {
        return headings.findIndex((heading) => heading.id === id);
      };

      visibles = visibles.filter((id) => id !== "");

      if (visibles.length === 1) {
        setActiveId(visibles[0]);
      } else if (visibles.length > 1) {
        let sortedvisibles = visibles.sort((a, b) => {
          return getIndex(a) > getIndex(b) ? 1 : -1;
        });

        setActiveId(sortedvisibles[0]);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-115px 0% 0%",
    });

    headings.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId, isScrolling]);
};

export const DocToc = ({ data }: { data: PageData }) => {
  const headingsLength = data.meta?.toc?.length ?? 1;
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string>("");
  useIntersectionObserver(setActiveId, isScrolling);

  return (
    <div>
      {data.meta?.toc?.length! > 0 ? (
        <div>
          <Title order={3} size={"sm"} c={"dimmed"}>
            Table of Contents
          </Title>
          <ul className={"relative ml-1 mt-2"}>
            {data.meta?.toc?.map((heading, index) => (
              <li
                key={heading.id}
                data-headings={data.meta?.toc?.length ?? 1}
                className={`mp-doc-toc-link ${
                  heading.id === activeId ? `mp-doc-toc-link-active` : ""
                }`}
                style={
                  {
                    marginLeft:
                      (heading.depth === 2
                        ? heading.depth - 1.7
                        : heading.depth - 2) *
                        12 +
                      2,
                    ...(heading.id === activeId
                      ? {
                          "--before-height": `${100 / headingsLength - 2}%`,
                          "--before-top": `${(100 / headingsLength) * index}%`,
                        }
                      : {}),
                  } as React.CSSProperties
                }
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsScrolling(true);
                    const target = document.getElementById(heading.id);
                    if (target) {
                      const targetTop =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        60;
                      window.scrollTo({ top: targetTop, behavior: "smooth" });
                    }
                    setActiveId(heading.id);
                    setTimeout(() => setIsScrolling(false), 1000);
                  }}
                  className={
                    "whitespace-nowrap overflow-ellipsis w-full h-full"
                  }
                >
                  <Text
                    c={"dimmed"}
                    className={"hover:!text-white"}
                    size={"md"}
                  >
                    {heading.text}
                  </Text>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
