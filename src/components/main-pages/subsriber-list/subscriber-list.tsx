"use client";

import type React from "react";
import { useState, useMemo } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  IconButton,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Typography,
  Toolbar,
  Tooltip,
  Menu,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Avatar,
  Stack,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  PersonAdd as PersonAddIcon,
  Download as DownloadIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { de } from "date-fns/locale";
import SubscriberModal from "./subscriber-modal";
import DeleteDialog from "./DeleteDialog";

// Mock data
const mockCustomers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    plan: "Premium",
    status: "Active",
    startDate: "2024-01-15",
    avatar: "/assets/user1.jpg?height=40&width=40",
    address: "123 Main St, New York, NY 10001",
    totalOrders: 24,
    totalSpent: 2450.0,
    endDate: "2024-04-20",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 987-6543",
    plan: "Basic",
    status: "Active",
    startDate: "2024-02-10",
    avatar: "/assets/user1.jpg?height=40&width=40",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    totalOrders: 12,
    totalSpent: 890.5,
    endDate: "2024-04-18",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "mike.brown@email.com",
    phone: "+1 (555) 456-7890",
    plan: "Enterprise",
    status: "Inactive",
    startDate: "2023-12-05",
    avatar: "/assets/user1.jpg?height=40&width=40",
    address: "789 Pine St, Chicago, IL 60604",
    totalOrders: 45,
    totalSpent: 5670.25,
    endDate: "2024-04-10",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 321-0987",
    plan: "Premium",
    status: "Active",
    startDate: "2024-04-08",
    avatar: "/assets/user1.jpg?height=40&width=40",
    address: "321 Elm St, Miami, FL 33104",
    totalOrders: 18,
    totalSpent: 1890.75,
    endDate: "2024-04-19",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 654-3210",
    plan: "Basic",
    status: "Active",
    startDate: "2024-02-04",
    avatar: "/assets/user1.jpg?height=40&width=40",
    address: "654 Maple Dr, Seattle, WA 98104",
    totalOrders: 8,
    totalSpent: 445.3,
    endDate: "2024-04-21",
  },
  {
    id: 6,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    plan: "Premium",
    status: "Active",
    startDate: "2024-04-15",
    avatar: "/assets/user1.jpg?height=40&width=40",
    address: "123 Main St, New York, NY 10004",
    totalOrders: 24,
    totalSpent: 2450.0,
    endDate: "2024-04-20",
  },
  {
    id: 7,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 987-6543",
    plan: "Basic",
    status: "Active",
    startDate: "2024-02-10",
    avatar: "/assets/user1.jpg?height=40&width=40",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    totalOrders: 12,
    totalSpent: 890.5,
    endDate: "2024-04-18",
  },
  {
    id: 8,
    name: "Michael Brown",
    email: "mike.brown@email.com",
    phone: "+1 (555) 456-7890",
    plan: "Enterprise",
    status: "Inactive",
    startDate: "2023-12-05",
    avatar: "/assets/user1.jpg?height=40&width=40",
    address: "789 Pine St, Chicago, IL 60604",
    totalOrders: 45,
    totalSpent: 5670.25,
    endDate: "2024-04-10",
  },
  {
    id: 9,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 321-0987",
    plan: "Premium",
    status: "Active",
    startDate: "2024-04-08",
    avatar: "/assets/user1.jpg?height=40&width=40",
    address: "321 Elm St, Miami, FL 33104",
    totalOrders: 18,
    totalSpent: 1890.75,
    endDate: "2024-04-19",
  },
  {
    id: 10,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 654-3210",
    plan: "Basic",
    status: "Active",
    startDate: "2024-02-04",
    avatar: "/assets/user1.jpg?height=40&width=40",
    address: "654 Maple Dr, Seattle, WA 98104",
    totalOrders: 8,
    totalSpent: 445.3,
    endDate: "2024-04-21",
  },
];

const planColors = {
  Basic: "default",
  Premium: "primary",
  Enterprise: "secondary",
} as const;

const statusColors = {
  Active: "success",
  Inactive: "error",
} as const;

export default function SubscriberList() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailCustomer, setDetailCustomer] = useState<any>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Modal states
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [customerModalMode, setCustomerModalMode] = useState<"add" | "edit">(
    "add"
  );
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<any>(null);

  // Filter and search logic
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPlan = !planFilter || customer.plan === planFilter;
      const matchesStatus = !statusFilter || customer.status === statusFilter;

      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [customers, searchTerm, planFilter, statusFilter]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredCustomers.map((customer) => customer.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    customerId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCustomer(customerId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCustomer(null);
  };

  const handleViewDetails = (customer: any) => {
    setDetailCustomer(customer);
    setDetailOpen(true);
    handleMenuClose();
  };

  const handleAddCustomer = () => {
    setCustomerModalMode("add");
    setEditingCustomer(null);
    setCustomerModalOpen(true);
  };

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

  const handleDeleteCustomer = () => {
    const customer = customers.find((c) => c.id === selectedCustomer);
    if (customer) {
      setCustomerToDelete(customer);
      setConfirmationOpen(true);
    }
    handleMenuClose();
  };

  const handleSaveCustomer = (customerData: any) => {
    if (customerModalMode === "add") {
      const newCustomer = {
        ...customerData,
        id: Math.max(...customers.map((c) => c.id)) + 1,
        joinDate: new Date().toISOString().split("T")[0],
        totalOrders: 0,
        totalSpent: 0,
        lastActivity: new Date().toISOString().split("T")[0],
      };
      setCustomers([...customers, newCustomer]);
      setSnackbar({
        open: true,
        message: "Customer added successfully",
        severity: "success",
      });
    } else {
      setCustomers(
        customers.map((c) =>
          c.id === editingCustomer.id ? { ...c, ...customerData } : c
        )
      );
      setSnackbar({
        open: true,
        message: "Customer updated successfully",
        severity: "success",
      });
    }
  };

  const handleConfirmDelete = () => {
    if (customerToDelete) {
      setCustomers(customers.filter((c) => c.id !== customerToDelete.id));
      setSnackbar({
        open: true,
        message: `Customer "${customerToDelete.name}" deleted successfully`,
        severity: "success",
      });
      setCustomerToDelete(null);
    }
  };

  const handleBulkAction = (action: string) => {
    if (action === "Delete") {
      setCustomers(customers.filter((c) => !selected.includes(c.id)));
    }
    setSnackbar({
      open: true,
      message: `${action} applied to ${selected.length} customers`,
      severity: "success",
    });
    setSelected([]);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, p: "16px 24px" }}>
          {/* Toolbar */}
          <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}
            >
              {/* Search */}
              <TextField
                size="small"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon
                      sx={{
                        color: "text.secondary",
                        mr: 1,
                        backgroundColor: "#EEF2FF",
                        borderRadius: "30px",
                        p: "4px",
                        fontSize: "30px",
                      }}
                    />
                  ),
                  sx: {
                    // borderRadius: "15px",
                  },
                }}
                sx={{
                  minWidth: 250,
                  // borderRadius: "50px",
                }}
              />

              {/* Filters */}
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Plan</InputLabel>
                <Select
                  value={planFilter}
                  label="Plan"
                  onChange={(e) => setPlanFilter(e.target.value)}
                >
                  <MenuItem value="">All Plans</MenuItem>
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                  <MenuItem value="Enterprise">Enterprise</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Actions */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {selected.length > 0 && (
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ActiveIcon />}
                    onClick={() => handleBulkAction("Activate")}
                  >
                    Activate ({selected.length})
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleBulkAction("Delete")}
                  >
                    Delete ({selected.length})
                  </Button>
                </>
              )}
              <Button
                variant="contained"
                size="small"
                startIcon={<PersonAddIcon />}
                onClick={handleAddCustomer}
                sx={{
                  backgroundColor: "#6366f1",
                }}
              >
                Add Customer
              </Button>
              {/* <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
              >
                Export
              </Button> */}
            </Box>
          </Toolbar>

          {/* Table */}
          <TableContainer>
            <Table sx={{ minWidth: 750 }}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < filteredCustomers.length
                      }
                      checked={
                        filteredCustomers.length > 0 &&
                        selected.length === filteredCustomers.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone No.</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((customer) => {
                    const isItemSelected = isSelected(customer.id);
                    return (
                      <TableRow
                        hover
                        key={customer.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onChange={() => handleClick(customer.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Avatar
                              src={customer.avatar}
                              sx={{ width: 32, height: 32 }}
                            >
                              {customer.name.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" fontWeight="medium">
                              {customer.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>
                          <Chip
                            label={customer.plan}
                            color={
                              planColors[
                                customer.plan as keyof typeof planColors
                              ]
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={customer.status}
                            color={
                              statusColors[
                                customer.status as keyof typeof statusColors
                              ]
                            }
                            size="small"
                            icon={
                              customer.status === "Active" ? (
                                <ActiveIcon />
                              ) : (
                                <InactiveIcon />
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(customer.startDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(customer.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="More actions">
                            <IconButton
                              size="small"
                              onClick={(e) => handleMenuClick(e, customer.id)}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[8, 16, 24]}
            component="div"
            count={filteredCustomers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(Number.parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              const customer = customers.find((c) => c.id === selectedCustomer);
              if (customer) handleViewDetails(customer);
            }}
          >
            <ListItemIcon>
              <ViewIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View Details</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              const customer = customers.find((c) => c.id === selectedCustomer);
              if (customer) handleEditCustomer(customer);
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit Customer</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDeleteCustomer}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete Customer</ListItemText>
          </MenuItem>
        </Menu>

        {/* Customer Detail Dialog */}
        <Dialog
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src={detailCustomer?.avatar}
                sx={{ width: 48, height: 48 }}
              >
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <EmailIcon color="action" />
                        <Typography variant="body2">
                          {detailCustomer?.email}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <PhoneIcon color="action" />
                        <Typography variant="body2">
                          {detailCustomer?.phone}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
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
                            new Date(
                              detailCustomer.startDate
                            ).toLocaleDateString()}
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
                            new Date(
                              detailCustomer.endDate
                            ).toLocaleDateString()}
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

        {/* Customer Modal */}
        <SubscriberModal
          open={customerModalOpen}
          onClose={() => setCustomerModalOpen(false)}
          onSave={handleSaveCustomer}
          customer={editingCustomer}
          mode={customerModalMode}
        />

        {/* Confirmation Dialog */}
        <DeleteDialog
          open={confirmationOpen}
          onClose={() => setConfirmationOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Customer"
          message="Are you sure you want to delete this customer? This action will permanently remove all customer data and cannot be undone."
          confirmText="Delete Customer"
          cancelText="Cancel"
          severity="error"
          customerName={customerToDelete?.name}
        />

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
}
