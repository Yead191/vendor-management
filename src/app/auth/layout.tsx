"use client";

import { AuthPanel } from "@/components/authPages/AuthPanel";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  const handleLearnMore = () => {
    console.log("Learn more clicked");
  };
  return (
    <div className=" min-h-screen items-center justify-center grid grid-cols-12">
      <div className="col-span-8 ">
        <AuthPanel
          title="VendorHub"
          subtitle="Streamline your vendor relationships and optimize procurement processes with our comprehensive management platform"
          buttonText=""
          onButtonClick={handleLearnMore}
        />
      </div>
      <div className="col-span-4">{children}</div>
    </div>
  );
}
