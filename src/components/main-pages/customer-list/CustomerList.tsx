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
import CustomerModal from "./customer-modal";
import ConfirmationDialog from "./confirmation-dialog";
import { CalendarIcon } from "@mui/x-date-pickers";
import { mockCustomers } from "@/data/mockCustomers";
import { toast } from "sonner";
import CustomerDetailsModal from "./CustomerDetailsModal";

const planColors = {
  Basic: "default",
  Premium: "primary",
  Enterprise: "secondary",
} as const;

const statusColors = {
  Active: "success",
  Inactive: "error",
} as const;

export default function CustomerList() {
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

  // console.log(statusFilter);
  // Filter and search logic
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = !statusFilter || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
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

  const handleConfirmDelete = () => {
    if (customerToDelete) {
      toast.info("Feature will be added in the future");
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
      <Box sx={{ p: "16px 24px", backgroundColor: "background.paper" }}>
        {/* header */}
        <Box sx={{}}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              mb: 3,
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <TextField
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ minWidth: 300 }}
                size="small"
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
              />
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Filter by Status"
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
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
                size="medium"
                startIcon={<PersonAddIcon />}
                onClick={handleAddCustomer}
                sx={{
                  backgroundColor: "#6366f1",
                }}
              >
                Add Customer
              </Button>
            </Box>
          </Box>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#F3F5F9" }}>
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
                  <TableCell>Status</TableCell>
                  <TableCell>Join Date</TableCell>

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
                          {new Date(customer.joinDate).toLocaleDateString()}
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
        </Box>
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
        {/* Customer Detail Dialog */}F
        <CustomerDetailsModal
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          detailCustomer={detailCustomer}
          handleMenuClose={handleMenuClose}
        />
        {/* Customer Modal */}
        <CustomerModal
          open={customerModalOpen}
          onClose={() => setCustomerModalOpen(false)}
          customer={editingCustomer}
          mode={customerModalMode}
        />
        {/* Confirmation Dialog */}
        <ConfirmationDialog
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
