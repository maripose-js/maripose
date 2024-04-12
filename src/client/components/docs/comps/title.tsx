import React from "react";
import { Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconBase } from "../../icons/base.tsx";
import Slugger from "github-slugger";
const slugger = new Slugger();

const useHeaderSlug = (children: string) => {
  return slugger.slug(children);
};

export const HashTag = ({
  children,
  size,
}: {
  children: React.ReactNode;
  size: number;
}) => {
  slugger.reset();
  const slug = slugger.slug(
    (children as React.ReactElement).props.children as string,
  );
  return (
    <>
      <Link to={`#${slug}`}>
        <div className={"group"}>
          <div
            className={
              "-ml-6 pr-2 py-2 inline-flex opacity-0 group-hover:text-[var(--mantine-primary-color-5)] group-hover:lg:opacity-100 transition-opacity absolute"
            }
          >
            <IconBase icon={"tabler:hash"} size={size as any} />
          </div>
          {children}
        </div>
      </Link>
    </>
  );
};

export const H1 = (props: React.ComponentProps<"h1">) => (
  <HashTag size={6}>
    <h1
      {...props}
      className={"text-3xl mb-4 leading-10 tracking-tight font-bold mt-7"}
    />
  </HashTag>
);

export const H2 = (props: React.ComponentProps<"h2">) => {
  const slug = useHeaderSlug(props.children as string);

  return (
    <HashTag size={5}>
      <h2
        {...props}
        className={"mb-3 text-2xl tracking-tight font-bold mt-5"}
        id={slug}
      />
    </HashTag>
  );
};

export const H3 = (props: React.ComponentProps<"h3">) => {
  const slug = useHeaderSlug(props.children as string);

  return (
    <HashTag size={4}>
      <h3 {...props} id={slug} className={"mb-2 leading-7 text-xl font-bold"} />
    </HashTag>
  );
};

export const H4 = (props: React.ComponentProps<"h4">) => {
  const slug = useHeaderSlug(props.children as string);

  return (
    <HashTag size={4}>
      <h4 {...props} className={"leading-6 text-base font-bold"} id={slug} />
    </HashTag>
  );
};

export const H5 = (props: React.ComponentProps<"h5">) => {
  const slug = useHeaderSlug(props.children as string);

  return (
    <HashTag size={3}>
      <Title order={5} id={slug} {...props} />
    </HashTag>
  );
};

export const H6 = (props: React.ComponentProps<"h6">) => {
  const slug = useHeaderSlug(props.children as string);

  return (
    <HashTag size={3}>
      <Title id={slug} order={6} {...props} />
    </HashTag>
  );
};
