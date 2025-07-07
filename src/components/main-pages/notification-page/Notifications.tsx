"use client";

import type React from "react";
import { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Stack,
  Paper,
} from "@mui/material";
import {
  Notifications,
  MarkEmailRead,
  Delete,
  MoreVert,
  FilterList,
  Search,
  Circle,
  CheckCircle,
  Payment,
  Person,
  Settings,
  Backup,
  ShoppingCart,
} from "@mui/icons-material";
import {
  initialNotifications,
  Notification,
} from "@/data/initalNortifications";

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "order":
      return <ShoppingCart />;
    case "payment":
      return <Payment />;
    case "user":
      return <Person />;
    case "system":
      return <Settings />;
    case "backup":
      return <Backup />;
    default:
      return <Notifications />;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case "order":
      return "#4caf50";
    case "payment":
      return "#2196f3";
    case "user":
      return "#ff9800";
    case "system":
      return "#9c27b0";
    case "backup":
      return "#607d8b";
    default:
      return "#757575";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "success";
    default:
      return "default";
  }
};

export default function NotificationPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );
  const [filterTab, setFilterTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const filteredNotifications = useMemo(() => {
    switch (filterTab) {
      case 1:
        return notifications.filter((n) => !n.isRead);
      case 2:
        return notifications.filter((n) => n.isRead);
      default:
        return notifications;
    }
  }, [notifications, filterTab]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const isAllSelected =
    selectedNotifications.length === filteredNotifications.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id));
    }
  };

  const handleSelectNotification = (id: number) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
    setSelectedNotifications([]);
  };

  const markSelectedAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) =>
        selectedNotifications.includes(notification.id)
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setSelectedNotifications([]);
  };

  const deleteSelected = () => {
    setNotifications((prev) =>
      prev.filter(
        (notification) => !selectedNotifications.includes(notification.id)
      )
    );
    setSelectedNotifications([]);
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

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto", bgcolor: "white" }}>
      {/* Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* Filter Tabs */}
        <Tabs
          value={filterTab}
          onChange={(_, newValue) => setFilterTab(newValue)}
        >
          <Tab label={`All (${notifications.length})`} />
          <Tab label={`Unread (${unreadCount})`} />
          <Tab label={`Read (${notifications.length - unreadCount})`} />
        </Tabs>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {selectedNotifications.length > 0 && (
            <>
              <Button
                variant="outlined"
                size="small"
                startIcon={<MarkEmailRead />}
                onClick={markSelectedAsRead}
              >
                Mark as Read ({selectedNotifications.length})
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Delete />}
                onClick={deleteSelected}
                color="error"
              >
                Delete ({selectedNotifications.length})
              </Button>
            </>
          )}
          <Button
            variant="contained"
            startIcon={<MarkEmailRead />}
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All as Read
          </Button>
          <IconButton onClick={handleMenuClick}>
            <MoreVert />
          </IconButton>
        </Box>
      </Box>

      {/* Bulk Select */}
      {filteredNotifications.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
            }
            label={`Select all (${filteredNotifications.length})`}
          />
        </Box>
      )}

      {/* Notifications List */}
      <Stack spacing={2}>
        {filteredNotifications.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Notifications sx={{ fontSize: 48, color: "#ccc", mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No notifications found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filterTab === 1
                ? "All notifications have been read"
                : "You're all caught up!"}
            </Typography>
          </Paper>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              sx={{
                backgroundColor: !notification.isRead ? "#f8f9ff" : "white",
                borderLeft: !notification.isRead
                  ? "4px solid #1976d2"
                  : "4px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  boxShadow: 2,
                  transform: "translateY(-1px)",
                },
              }}
              onClick={() =>
                !notification.isRead && markAsRead(notification.id)
              }
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  {/* Checkbox */}
                  <Checkbox
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectNotification(notification.id);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* Icon */}
                  <Avatar
                    sx={{
                      backgroundColor: getNotificationColor(notification.type),
                      width: 40,
                      height: 40,
                    }}
                  >
                    {getNotificationIcon(notification.type)}
                  </Avatar>

                  {/* Content */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "1rem" }}
                      >
                        {notification.title}
                      </Typography>
                      {!notification.isRead && (
                        <Circle sx={{ fontSize: 8, color: "#1976d2" }} />
                      )}
                      <Chip
                        label={notification.type}
                        size="small"
                        sx={{
                          backgroundColor: getNotificationColor(
                            notification.type
                          ),
                          color: "white",
                          fontSize: "0.7rem",
                          height: 20,
                        }}
                      />
                      <Chip
                        label={notification.priority}
                        size="small"
                        color={getPriorityColor(notification.priority) as any}
                        variant="outlined"
                        sx={{ fontSize: "0.7rem", height: 20 }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1, lineHeight: 1.5 }}
                    >
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>

                  {/* Status Icon */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {notification.isRead ? (
                      <CheckCircle sx={{ color: "#4caf50", fontSize: 20 }} />
                    ) : (
                      <Circle sx={{ color: "#1976d2", fontSize: 20 }} />
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </Stack>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <FilterList sx={{ mr: 1 }} />
          Filter Options
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Search sx={{ mr: 1 }} />
          Search Notifications
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <Settings sx={{ mr: 1 }} />
          Notification Settings
        </MenuItem>
      </Menu>
    </Box>
  );
}
