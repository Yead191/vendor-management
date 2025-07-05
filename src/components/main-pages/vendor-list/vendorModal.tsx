"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Avatar,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { useRef } from "react";
import { toast } from "sonner";

interface VendorData {
  id: number;
  name: string;
  category: string;
  email: string;
  phone: string;
  rating: number;
  status: string;
  totalProducts: number;
  joinedDate: string;
  isVerified: boolean;
  description: string;
  avatar: string;
  address: string;
}

interface VendorModalProps {
  open: boolean;
  onClose: () => void;
  vendor?: VendorData;
  //   onSave: (vendor: VendorData) => void;
}

const categories = [
  "Electronics",
  "Apparel",
  "Home & Living",
  "Automotive",
  "Kitchenware",
  "Books",
  "Health & Wellness",
];

const statuses = ["Active", "Inactive", "Pending"];

export default function VendorModal({
  open,
  onClose,
  vendor,
}: VendorModalProps) {
  const [formData, setFormData] = useState<VendorData>({
    id: 0,
    name: "",
    category: "Electronics",
    email: "",
    phone: "",
    rating: 0,
    status: "Active",
    totalProducts: 0,
    joinedDate: new Date().toISOString().split("T")[0],
    isVerified: false,
    description: "",
    avatar: "/placeholder.svg?height=40&width=40",
    address: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (vendor) {
      setFormData(vendor);
    } else {
      setFormData({
        id: 0,
        name: "",
        category: "Electronics",
        email: "",
        phone: "",
        rating: 0,
        status: "Active",
        totalProducts: 0,
        joinedDate: new Date().toISOString().split("T")[0],
        isVerified: false,
        description: "",
        avatar: "/placeholder.svg?height=40&width=40",
        address: "",
      });
    }
  }, [vendor, open]);

  const handleInputChange =
    (field: keyof VendorData) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
    ) => {
      const value = event.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]:
          field === "totalProducts" ? Number.parseInt(value) || 0 : value,
      }));
    };

  const handleSwitchChange =
    (field: keyof VendorData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.checked,
      }));
    };

  const handleSubmit = () => {
    // onSave(formData);
    toast.success("Vendor saved successfully!");
  };

  const isEditing = Boolean(vendor);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", gap: 1, pb: 2 }}
      >
        <BusinessIcon sx={{ color: "primary.main" }} />
        {isEditing ? "Edit Vendor" : "Add New Vendor"}
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        {/* Vendor Logo */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Vendor Logo
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={formData.avatar}
              sx={{ width: 80, height: 80, bgcolor: "grey.200" }}
            >
              <BusinessIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const result = event.target?.result as string;
                    setFormData((prev) => ({
                      ...prev,
                      avatar: result,
                    }));
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              size="small"
              onClick={() => fileInputRef.current?.click()}
            >
              UPLOAD
            </Button>
          </Box>
        </Box>

        {/* Form Fields */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Name and Category Row */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Vendor Name"
              value={formData.name}
              onChange={handleInputChange("name")}
              required
              fullWidth
              variant="outlined"
              placeholder="Enter vendor name"
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={handleInputChange("category")}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Email and Phone Row */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="Enter Vendor email"
              value={formData.email}
              onChange={handleInputChange("email")}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Phone"
              value={formData.phone}
              onChange={handleInputChange("phone")}
              placeholder="Enter Vendor phone"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Address */}
          <TextField
            label="Address"
            value={formData.address}
            onChange={handleInputChange("address")}
            placeholder="Enter Vendor address"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Description */}
          <TextField
            label="Description"
            value={formData.description}
            onChange={handleInputChange("description")}
            multiline
            rows={4}
            fullWidth
            placeholder="Enter vendor description..."
          />

          {/* Status, Total Products, and Verified Row */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                onChange={handleInputChange("status")}
                label="Status"
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Total Products"
              type="number"
              value={formData.totalProducts}
              onChange={handleInputChange("totalProducts")}
              sx={{ minWidth: 150 }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isVerified}
                  onChange={handleSwitchChange("isVerified")}
                  color="primary"
                />
              }
              label="Verified"
              sx={{ ml: 2 }}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button onClick={onClose} variant="outlined">
          CANCEL
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ minWidth: 120 }}
        >
          {isEditing ? "UPDATE VENDOR" : "ADD VENDOR"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
