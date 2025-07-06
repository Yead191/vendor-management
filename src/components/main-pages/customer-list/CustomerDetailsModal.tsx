import { Edit, Email, LocationCity, Phone } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { CalendarIcon } from "@mui/x-date-pickers";
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
    // Add other fields as needed
  };
  handleMenuClose: () => void;
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

  const [detailOpen, setDetailOpen] = useState(false);
  const [customerModalOpen, setCustomerModalOpen] = useState(false);

  const handleEditCustomer = (detailedCustomer: any) => {
    // console.log(detailedCustomer);
    if (detailedCustomer) {
      setCustomerModalMode("edit");
      setEditingCustomer(detailedCustomer);
      setDetailOpen(false);
      setCustomerModalOpen(true);
    }
    handleMenuClose();
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", gap: 3 }}>
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
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
        </DialogActions>
      </Dialog>
      {/* Customer Modal */}
      <CustomerModal
        open={customerModalOpen}
        onClose={() => setCustomerModalOpen(false)}
        customer={editingCustomer}
        mode={customerModalMode}
      />
    </>
  );
}
