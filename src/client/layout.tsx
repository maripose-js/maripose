import React from "react";
import NextTopLoader from "nextjs-toploader";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextTopLoader color="#59cdb5" />
      {children}
    </>
  );
};
