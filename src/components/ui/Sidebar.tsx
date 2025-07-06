"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import {
  BarChart,
  Person,
  Business,
  People,
  Assignment,
  Settings,
  ExpandLess,
  ExpandMore,
  Info,
  Security,
  Article,
  Help,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { toast } from "sonner";
import Image from "next/image";

const drawerWidth = 280;

interface SidebarProps {
  open?: boolean;
}

export default function Sidebar({ open = true }: SidebarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Analytics", icon: <BarChart />, path: "/analytics" },
    { name: "Customer List", icon: <Person />, path: "/customer-list" },
    { name: "Vendor List", icon: <Business />, path: "/vendor-list" },
    { name: "Subscriber List", icon: <People />, path: "/subscriber-list" },
    { name: "Plan Management", icon: <Assignment />, path: "/plan-management" },
  ];

  const settingsItems = [
    { name: "About us", icon: <Info />, path: "/about-us" },
    { name: "Privacy Policy", icon: <Security />, path: "/privacy-policy" },
    { name: "Terms & Condition", icon: <Article />, path: "/terms-condition" },
    { name: "FAQ", icon: <Help />, path: "/faq" },
  ];

  const isActive = (path: string) => pathname === path;
  const isSettingsActive = settingsItems.some((item) => pathname === item.path);

  const handleLogOut = () => {
    toast.warning("Are you sure you want to log out?", {
      duration: 5000,
      description: "You will be logged out and redirected to the login page.",
      action: {
        label: "Logout",
        onClick: async () => {
          toast.success("Logged out successfully");
          router.push("/auth/login");
        },
      },
    });
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          boxShadow: "none",
          position: "fixed",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 1.5 }}>
        {/* <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#8B5CF6",
            fontSize: "2rem",
            letterSpacing: "-0.025em",
            textAlign: "center",
            fontVariant: "small-caps",
          }}
        >
          Vendor Hub
        </Typography> */}
        <Image src="/assets/logo.png" style={{
          height: "90px",
          objectPosition: "center",
          objectFit: "cover",
        }} alt="Logo" width={260} height={50} />
      </Box>

      {/* Navigation */}
      <List
        sx={{
          px: 0,
          py: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                onClick={() => router.push(item.path)}
                sx={{
                  py: 0.75,
                  px: 3,
                  backgroundColor: isActive(item.path)
                    ? "#EEF2FF"
                    : "transparent",
                  borderRight: isActive(item.path)
                    ? "3px solid #6366f1"
                    : "3px solid transparent",
                  "&:hover": {
                    backgroundColor: "#EEF2FF",
                    borderRight: "3px solid #6366f1",
                  },
                  "& .MuiListItemIcon-root": {
                    color: isActive(item.path) ? "#6366f1" : "#6b7280",
                    minWidth: 40,
                  },
                  "& .MuiListItemText-primary": {
                    color: isActive(item.path) ? "#6366f1" : "#4b5563",
                    fontWeight: isActive(item.path) ? 600 : 500,
                    fontSize: "0.95rem",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}

          {/* Settings */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => setSettingsOpen(!settingsOpen)}
              sx={{
                py: 1.5,
                px: 3,
                backgroundColor: isSettingsActive ? "#f8fafc" : "transparent",
                // borderRight: isSettingsActive
                //   ? "3px solid #6366f1"
                //   : "3px solid transparent",
                "&:hover": { backgroundColor: "#f8fafc" },
                "& .MuiListItemIcon-root": {
                  color: isSettingsActive ? "#6366f1" : "#6b7280",
                  minWidth: 40,
                },
                "& .MuiListItemText-primary": {
                  color: isSettingsActive ? "#6366f1" : "#4b5563",
                  fontWeight: isSettingsActive ? 600 : 500,
                  fontSize: "0.95rem",
                },
              }}
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
              {settingsOpen ? (
                <ExpandLess sx={{ color: "#6b7280" }} />
              ) : (
                <ExpandMore sx={{ color: "#6b7280" }} />
              )}
            </ListItemButton>
          </ListItem>

          <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {settingsItems.map((item) => (
                <ListItem key={item.name} disablePadding>
                  <ListItemButton
                    onClick={() => router.push(item.path)}
                    sx={{
                      py: 1,
                      pl: 6,
                      pr: 3,
                      backgroundColor: isActive(item.path)
                        ? "#EEF2FF"
                        : "transparent",
                      borderRight: isActive(item.path)
                        ? "3px solid #6366f1"
                        : "3px solid transparent",
                      "&:hover": {
                        backgroundColor: "#EEF2FF",
                        borderRight: "3px solid #6366f1",
                      },
                      "& .MuiListItemIcon-root": {
                        color: isActive(item.path) ? "#6366f1" : "#9ca3af",
                        minWidth: 36,
                      },
                      "& .MuiListItemText-primary": {
                        color: isActive(item.path) ? "#6366f1" : "#6b7280",
                        fontWeight: isActive(item.path) ? 600 : 500,
                        fontSize: "0.9rem",
                      },
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>

        {/* Logout Button at Bottom */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogOut}
            sx={{
              py: 1.25,
              px: 3,
              mt: 2,
              "&:hover": {
                backgroundColor: "#fef2f2",
              },
              "& .MuiListItemIcon-root": {
                color: "#ef4444",
                minWidth: 40,
              },
              "& .MuiListItemText-primary": {
                color: "#b91c1c",
                fontWeight: 500,
                fontSize: "0.95rem",
              },
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
