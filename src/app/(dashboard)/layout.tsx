"use client";
import AppSidebar from "@/components/ui/Sidebar";
import { KeyboardArrowDown, Notifications } from "@mui/icons-material";
import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const formatPathName = (slug: string | undefined) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Check if the string looks like an ID (Mongo _id or numeric)
  const isIdSegment = (str: string) =>
    /^[a-f\d]{24}$/i.test(str) || /^\d+$/.test(str);

  const pathSegments = pathname?.split("/").filter(Boolean) || [];

  let targetSlug = pathSegments[pathSegments.length - 1];

  if (isIdSegment(targetSlug)) {
    targetSlug = pathSegments[pathSegments.length - 2];
  }
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="w-[280px]">
        <AppSidebar />
      </div>
      <div className="flex-1">
        {/* header */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: "280px",
            right: 0,
            height: "65px",
            backgroundColor: "#ffffff",
            px: 3,
            py: 2.75,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 10,
            borderBottom: "1px solid #f3f4f6",
          }}
        >
          {/* Page Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 550,
              fontSize: "1.5rem",
              m: 0,
            }}
          >
            {formatPathName(targetSlug)}
          </Typography>

          {/* Right Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            {/* Notification */}
            <IconButton sx={{ p: 0 }}>
              <Badge
                variant="dot"
                color="error"
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Notifications sx={{ color: "#555" }} />
              </Badge>
            </IconButton>

            {/* User Info */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
                  Asadur R. Yead
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#888",
                    lineHeight: 1.2,
                  }}
                >
                  Admin
                </Typography>
              </Box>

              <Avatar
                src="/assets/user1.jpg?height=40&width=40"
                alt="User"
                sx={{ width: 36, height: 36 }}
              />
            </Box>
          </Box>
        </Box>
        <div className="mt-[65px] p-6">{children}</div>
      </div>
    </div>
  );
}
