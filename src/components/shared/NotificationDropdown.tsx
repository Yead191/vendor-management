"use client";

import React, { useState } from "react";
import {
  Badge,
  IconButton,
  Popover,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Notifications, MarkEmailRead } from "@mui/icons-material";
import {
  initialNotifications,
  Notification,
} from "@/data/initialNotifications";
import Link from "next/link";

export default function NotificationDropdown() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  return (
    <>
      <IconButton sx={{ p: 0 }} onClick={handleClick}>
        <Badge
          badgeContent={unreadCount}
          color="error"
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Notifications sx={{ color: "#555" }} />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            width: 380,
            maxHeight: 600,
            mt: 1,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            borderRadius: 2,
          },
        }}
      >
        <Box>
          {/* Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Button
                size="small"
                startIcon={<MarkEmailRead />}
                onClick={markAllAsRead}
                sx={{
                  fontSize: "0.75rem",
                  textTransform: "none",
                  color: "#1976d2",
                }}
              >
                Mark all as read
              </Button>
            )}
          </Box>

          {/* Notifications List */}
          <Box sx={{ maxHeight: 400, overflow: "auto" }}>
            {notifications.length === 0 ? (
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  color: "#999",
                }}
              >
                <Typography>No notifications</Typography>
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {notifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <ListItem
                      sx={{
                        cursor: "pointer",
                        backgroundColor: !notification.isRead
                          ? "#f8f9ff"
                          : "transparent",
                        borderLeft: !notification.isRead
                          ? "4px solid #1976d2"
                          : "4px solid transparent",
                        "&:hover": {
                          backgroundColor: "#f5f5f5",
                        },
                        py: 1.5,
                        px: 2,
                      }}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 0.5,
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 600,
                                fontSize: "0.9rem",
                              }}
                            >
                              {notification.title}
                            </Typography>
                            {!notification.isRead && (
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  backgroundColor: "#1976d2",
                                }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#666",
                                fontSize: "0.85rem",
                                mb: 0.5,
                              }}
                            >
                              {notification.message}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "#999",
                                fontSize: "0.75rem",
                              }}
                            >
                              {notification.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < notifications.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            )}
          </Box>

          {/* Footer */}
          {notifications.length > 0 && (
            <Link href="notifications" passHref>
              <Box
                sx={{
                  p: 1.5,
                  borderTop: "1px solid #f0f0f0",
                  textAlign: "center",
                }}
              >
                <Button
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontSize: "0.8rem",
                    color: "#1976d2",
                  }}
                >
                  View all notifications
                </Button>
              </Box>
            </Link>
          )}
        </Box>
      </Popover>
    </>
  );
}
