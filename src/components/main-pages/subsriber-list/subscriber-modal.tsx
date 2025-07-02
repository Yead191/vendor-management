"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import { PhotoCamera as PhotoCameraIcon } from "@mui/icons-material";

interface Customer {
  id?: number;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: string;
  address: string;
  avatar?: string;
}

interface CustomerModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (customer: Customer) => void;
  customer?: Customer | null;
  mode: "add" | "edit";
}

export default function SubscriberModal({
  open,
  onClose,
  onSave,
  customer,
  mode,
}: CustomerModalProps) {
  const [formData, setFormData] = useState<Customer>({
    name: "",
    email: "",
    phone: "",
    plan: "Basic",
    status: "Active",
    address: "",
    avatar: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (customer && mode === "edit") {
      setFormData(customer);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        plan: "Basic",
        status: "Active",
        address: "",
        avatar: "",
      });
    }
    setErrors({});
  }, [customer, mode, open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const handleInputChange =
    (field: keyof Customer) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: "" });
      }
    };

  const handleSelectChange = (field: keyof Customer) => (event: any) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">
          {mode === "add" ? "Add New Customer" : "Edit Customer"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          {/* Avatar Section */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Box sx={{ position: "relative", textAlign: "center" }}>
              <Avatar
                src={formData.avatar || "/placeholder.svg?height=80&width=80"}
                sx={{ width: 80, height: 80, mb: 1, mx: "auto" }}
              >
                {formData.name?.charAt(0).toUpperCase()}
              </Avatar>

              {/* Hidden File Input */}
              <input
                accept="image/*"
                type="file"
                id="avatar-upload"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData((prev) => ({
                        ...prev,
                        avatar: reader.result as string,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />

              {/* Upload Button */}
              <label htmlFor="avatar-upload">
                <Button
                  size="small"
                  variant="outlined"
                  component="span"
                  startIcon={<PhotoCameraIcon />}
                  sx={{ fontSize: "0.75rem", mt: 1 }}
                >
                  Upload Photo
                </Button>
              </label>
            </Box>
          </Box>

          <Stack spacing={3}>
            {/* Personal Information */}
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Personal Information
              </Typography>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                />
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={2}
                  value={formData.address}
                  onChange={handleInputChange("address")}
                  error={!!errors.address}
                  helperText={errors.address}
                  required
                />
              </Stack>
            </Box>

            {/* Account Settings */}
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Account Settings
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Plan</InputLabel>
                  <Select
                    value={formData.plan}
                    label="Plan"
                    onChange={handleSelectChange("plan")}
                  >
                    <MenuItem value="Basic">Basic</MenuItem>
                    <MenuItem value="Premium">Premium</MenuItem>
                    <MenuItem value="Enterprise">Enterprise</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    label="Status"
                    onChange={handleSelectChange("status")}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ backgroundColor: "#6366f1" }}
        >
          {mode === "add" ? "Add Customer" : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
