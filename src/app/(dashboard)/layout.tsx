"use client";
import HeaderDashboard from "@/components/ui/HeaderDashboard";
import AppSidebar from "@/components/ui/Sidebar";
import Head from "next/head";

import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="">
        <AppSidebar />
      </div>
      <div className="flex-1 w-full">
        {/* header */}
        <HeaderDashboard />
        <div className=" p-6">{children}</div>
      </div>
    </div>
  );
}
