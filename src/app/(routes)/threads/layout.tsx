import React from "react";
import LeftSideBar from "../../_components/LeftSideBar";
import RightSideBar from "../../_components/RightSideBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto max-w-[90rem] flex">
        <LeftSideBar />
        {children}
        <RightSideBar />
      </div>
    </>
  );
}
