import React from "react";
import {
  Box,
  Button,
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Avatar,
  Stack,
} from "@mui/material";
import {
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";

// Mock data

export const planColors = {
  Basic: "default",
  Premium: "primary",
  Enterprise: "secondary",
} as const;

export const statusColors = {
  Active: "success",
  Inactive: "error",
} as const;

export default function SubscriberDetails({
  detailOpen,
  setDetailOpen,
  detailCustomer,
  handleEditCustomer,
}: {
  detailOpen: boolean;
  setDetailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  detailCustomer: any;
  handleEditCustomer: (values: any) => void;
}) {
  return (
    <Dialog
      open={detailOpen}
      onClose={() => setDetailOpen(false)}
      maxWidth="md"
      fullWidth
    >
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
                    <EmailIcon color="action" />
                    <Typography variant="body2">
                      {detailCustomer?.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PhoneIcon color="action" />
                    <Typography variant="body2">
                      {detailCustomer?.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationIcon color="action" />
                    <Typography variant="body2">
                      {detailCustomer?.address}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Account Details
                </Typography>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Plan:
                    </Typography>
                    <Chip
                      label={detailCustomer?.plan}
                      color={
                        planColors[
                          detailCustomer?.plan as keyof typeof planColors
                        ]
                      }
                      size="small"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Status:
                    </Typography>
                    <Chip
                      label={detailCustomer?.status}
                      color={
                        statusColors[
                          detailCustomer?.status as keyof typeof statusColors
                        ]
                      }
                      size="small"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Start Date:
                    </Typography>
                    <Typography variant="body2">
                      {detailCustomer?.startDate &&
                        new Date(detailCustomer.startDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      End Date:
                    </Typography>
                    <Typography variant="body2">
                      {detailCustomer?.endDate &&
                        new Date(detailCustomer.endDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Statistics
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h4" color="primary">
                    {detailCustomer?.totalOrders}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Orders
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h4" color="success.main">
                    ${detailCustomer?.totalSpent?.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Spent
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDetailOpen(false)}>Close</Button>
        <Button
          onClick={() => handleEditCustomer(detailCustomer)}
          variant="contained"
          startIcon={<EditIcon />}
          sx={{
            backgroundColor: "#6366f1",
          }}
        >
          Edit Customer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
