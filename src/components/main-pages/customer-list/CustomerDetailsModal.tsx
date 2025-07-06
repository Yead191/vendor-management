import { Edit, Email, LocationCity, Phone } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  Typography,
  Tabs,
  Tab,
  TextField,
  IconButton,
  InputAdornment,
  DialogContent,
} from "@mui/material";
import { CalendarIcon } from "@mui/x-date-pickers";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import CustomerModal from "./customer-modal";
import { toast } from "sonner";

interface CustomerDetailsModalProps {
  open: boolean;
  onClose: () => void;
  detailCustomer: {
    id?: string | number;
    name?: string;
    avatar?: string;
    email?: string;
    phone?: string;
    address?: string;
    joinDate?: string;
  };
  handleMenuClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CustomerDetailsModal({
  open,
  onClose,
  detailCustomer,
  handleMenuClose,
}: CustomerDetailsModalProps) {
  const [customerModalMode, setCustomerModalMode] = useState<"add" | "edit">(
    "add"
  );
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEditCustomer = (detailedCustomer: any) => {
    if (detailedCustomer) {
      setCustomerModalMode("edit");
      setEditingCustomer(detailedCustomer);
      setCustomerModalOpen(true);
      handleMenuClose();
    }
  };

  const handleSaveCustomer = (customerData: any) => {
    if (customerModalMode === "add") {
      const newCustomer = {
        ...customerData,
        joinDate: new Date().toISOString().split("T")[0],
        totalOrders: 0,
        totalSpent: 0,
        lastActivity: new Date().toISOString().split("T")[0],
      };
      console.log(newCustomer);
      toast.info("Feature will be added in the future");
    } else {
      toast.info("Feature will be added in the future");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    toast.info("Password change feature will be added in the future");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar src={detailCustomer?.avatar} sx={{ width: 48, height: 48 }}>
              {detailCustomer?.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6">{detailCustomer?.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Customer ID: #{detailCustomer?.id}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="customer details tabs"
            >
              <Tab label="Details" />
              <Tab label="Change Password" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Card sx={{ flex: 1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Contact Information
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Email color="action" />
                      <Typography variant="body2">
                        {detailCustomer?.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Phone color="action" />
                      <Typography variant="body2">
                        {detailCustomer?.phone}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocationCity color="action" />
                      <Typography variant="body2">
                        {detailCustomer?.address}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarIcon color="action" />
                      <Typography variant="body2">
                        {detailCustomer?.joinDate}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Current Password"
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        edge="end"
                      >
                        {showCurrentPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          {tabValue === 0 && (
            <Button
              onClick={() => handleEditCustomer(detailCustomer)}
              variant="contained"
              startIcon={<Edit />}
              sx={{
                backgroundColor: "#6366f1",
              }}
            >
              Edit Customer
            </Button>
          )}
          {tabValue === 1 && (
            <Button
              onClick={handlePasswordSubmit}
              variant="contained"
              sx={{ backgroundColor: "#6366f1" }}
            >
              Save Password
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <CustomerModal
        open={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        customer={editingCustomer}
        mode={customerModalMode}
      />
    </>
  );
}
