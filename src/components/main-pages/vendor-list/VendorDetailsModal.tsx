"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Card,
  CardContent,
  IconButton,
  Rating,
  Stack,
  Button,
} from "@mui/material";
import {
  Edit as EditIcon,
  Close as CloseIcon,
  Inventory as InventoryIcon,
  Star as StarIcon,
  CalendarMonth as CalendarIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Verified as VerifiedIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import VendorModal from "./vendorModal";
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

interface VendorDetailsProps {
  vendor?: VendorData;
  onBack?: () => void;
}

const sampleVendor: VendorData = {
  id: 1,
  name: "GreenTech Supplies",
  category: "Electronics",
  email: "contact@greentech.com",
  phone: "+1-234-567-890",
  rating: 4.5,
  status: "Active",
  totalProducts: 120,
  joinedDate: "2024-02-15",
  isVerified: true,
  description: "Leading supplier of eco-friendly electronics and components",
  avatar: "/placeholder.svg?height=40&width=40",
  address: "123 Green Street, San Francisco, CA, USA",
};

export default function VendorDetails({
  vendor: propVendor,
  onBack,
}: VendorDetailsProps) {
  const [vendor, setVendor] = useState<VendorData>(propVendor || sampleVendor);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseDetails = () => {
    if (onBack) {
      onBack();
    } else {
      setIsDetailsOpen(false);
    }
  };

  const handleSaveVendor = (updatedVendor: VendorData) => {
    setVendor(updatedVendor);
    // toast.success("Vendor details updated successfully");
    setIsModalOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  if (!isDetailsOpen) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Vendor details closed
        </Typography>
        <Button
          variant="contained"
          onClick={() => setIsDetailsOpen(true)}
          sx={{ mt: 2 }}
        >
          Reopen Details
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          p: 2,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {onBack && (
            <IconButton onClick={onBack} sx={{ mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Avatar
            src={vendor.avatar}
            sx={{
              width: 56,
              height: 56,
              bgcolor: "grey.300",
            }}
          >
            <InventoryIcon />
          </Avatar>
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <Typography variant="h5" fontWeight="bold">
                {vendor.name}
              </Typography>
              {vendor.isVerified && (
                <VerifiedIcon sx={{ color: "primary.main", fontSize: 20 }} />
              )}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Chip label={vendor.category} size="small" variant="outlined" />
              <Chip
                label={vendor.status}
                size="small"
                color={vendor.status === "Active" ? "success" : "default"}
                variant="filled"
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={handleEditClick} sx={{ color: "primary.main" }}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={handleCloseDetails}
            sx={{ color: "text.secondary" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent sx={{ textAlign: "center", py: 3 }}>
            <InventoryIcon
              sx={{ fontSize: 40, color: "primary.main", mb: 1 }}
            />
            <Typography variant="h3" fontWeight="bold" color="text.primary">
              {vendor.totalProducts}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Products
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent sx={{ textAlign: "center", py: 3 }}>
            <StarIcon sx={{ fontSize: 40, color: "orange", mb: 1 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography variant="h3" fontWeight="bold" color="text.primary">
                {vendor.rating}
              </Typography>
              <Rating
                value={vendor.rating}
                readOnly
                precision={0.5}
                size="small"
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Rating
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, minWidth: 200 }}>
          <CardContent sx={{ textAlign: "center", py: 3 }}>
            <CalendarIcon sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              {formatDate(vendor.joinedDate)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Member Since
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Description */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {vendor.description}
          </Typography>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <EmailIcon sx={{ color: "primary.main" }} />
            Contact
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <EmailIcon sx={{ color: "primary.main", fontSize: 20 }} />
              <Box>
                <Typography variant="body2" fontWeight="medium">
                  Email:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {vendor.email}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <PhoneIcon sx={{ color: "error.main", fontSize: 20 }} />
              <Box>
                <Typography variant="body2" fontWeight="medium">
                  Phone:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {vendor.phone}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Address */}
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <LocationIcon sx={{ color: "primary.main" }} />
            Address
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {vendor.address}
          </Typography>
        </CardContent>
      </Card>

      {/* Modal */}
      <VendorModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vendor={vendor}
      />
    </Box>
  );
}
