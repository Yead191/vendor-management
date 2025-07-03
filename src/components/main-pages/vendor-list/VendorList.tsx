"use client";

import type React from "react";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  Rating,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  TablePagination,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Business as BusinessIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import VendorModal from "./vendorModal";
import VendorDetails from "./VendorDetailsModal";
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

const sampleVendors: VendorData[] = [
  {
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
  },
  {
    id: 2,
    name: "FashionForward Ltd.",
    category: "Apparel",
    email: "support@fashionforward.com",
    phone: "+1-321-654-098",
    rating: 4.2,
    status: "Active",
    totalProducts: 85,
    joinedDate: "2023-11-10",
    isVerified: true,
    description: "Trendy fashion and apparel supplier",
    avatar: "/placeholder.svg?height=40&width=40",
    address: "456 Fashion Ave, New York, NY, USA",
  },
  {
    id: 3,
    name: "EcoHome Essentials",
    category: "Home & Living",
    email: "info@ecohome.com",
    phone: "+1-555-789-123",
    rating: 4.7,
    status: "Inactive",
    totalProducts: 200,
    joinedDate: "2024-01-05",
    isVerified: false,
    description: "Sustainable home and living products",
    avatar: "/placeholder.svg?height=40&width=40",
    address: "789 Eco Street, Portland, OR, USA",
  },
  {
    id: 4,
    name: "AutoGear Pro",
    category: "Automotive",
    email: "sales@autogearpro.com",
    phone: "+1-777-123-456",
    rating: 4.1,
    status: "Pending",
    totalProducts: 145,
    joinedDate: "2023-09-21",
    isVerified: false,
    description: "Professional automotive parts and accessories",
    avatar: "/placeholder.svg?height=40&width=40",
    address: "321 Auto Lane, Detroit, MI, USA",
  },
  {
    id: 5,
    name: "Kitchen Kings",
    category: "Kitchenware",
    email: "hello@kitchenkings.com",
    phone: "+1-999-222-333",
    rating: 4.6,
    status: "Active",
    totalProducts: 75,
    joinedDate: "2024-03-12",
    isVerified: true,
    description: "Premium kitchen appliances and tools",
    avatar: "/placeholder.svg?height=40&width=40",
    address: "654 Kitchen Blvd, Chicago, IL, USA",
  },
  {
    id: 6,
    name: "BookNest",
    category: "Books",
    email: "contact@booknest.com",
    phone: "+1-888-123-789",
    rating: 4.9,
    status: "Active",
    totalProducts: 340,
    joinedDate: "2022-12-25",
    isVerified: true,
    description: "Comprehensive book and educational materials supplier",
    avatar: "/placeholder.svg?height=40&width=40",
    address: "987 Library St, Boston, MA, USA",
  },
  {
    id: 7,
    name: "HealthVibe",
    category: "Health & Wellness",
    email: "service@healthvibe.com",
    phone: "+1-555-432-876",
    rating: 3.9,
    status: "Inactive",
    totalProducts: 60,
    joinedDate: "2023-07-18",
    isVerified: false,
    description: "Health and wellness products supplier",
    avatar: "/placeholder.svg?height=40&width=40",
    address: "147 Wellness Way, Los Angeles, CA, USA",
  },
  {
    id: 8,
    name: "HealthVibe",
    category: "Health & Wellness",
    email: "service@healthvibe.com",
    phone: "+1-555-432-876",
    rating: 3.9,
    status: "Inactive",
    totalProducts: 60,
    joinedDate: "2023-07-18",
    isVerified: false,
    description: "Health and wellness products supplier",
    avatar: "/placeholder.svg?height=40&width=40",
    address: "147 Wellness Way, Los Angeles, CA, USA",
  },
];

const categories = [
  "All Categories",
  "Electronics",
  "Apparel",
  "Home & Living",
  "Automotive",
  "Kitchenware",
  "Books",
  "Health & Wellness",
];
const statuses = ["All Status", "Active", "Inactive", "Pending"];

export default function VendorList() {
  const [vendors, setVendors] = useState<VendorData[]>(sampleVendors);
  const [filteredVendors, setFilteredVendors] =
    useState<VendorData[]>(sampleVendors);
  const [selectedVendors, setSelectedVendors] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<VendorData | undefined>();
  const [viewingVendor, setViewingVendor] = useState<VendorData | false>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  // Filter vendors based on search and filters
  const applyFilters = () => {
    const filtered = vendors.filter((vendor) => {
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "All Status" || vendor.status === statusFilter;
      const matchesCategory =
        categoryFilter === "All Categories" ||
        vendor.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
    setFilteredVendors(filtered);
    setPage(0);
  };

  // Apply filters whenever search term or filters change

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedVendors(filteredVendors.map((vendor) => vendor.id));
    } else {
      setSelectedVendors([]);
    }
  };

  const handleSelectVendor = (vendorId: number) => {
    setSelectedVendors((prev) =>
      prev.includes(vendorId)
        ? prev.filter((id) => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleAddVendor = () => {
    setEditingVendor(undefined);
    setIsModalOpen(true);
  };

  const handleEditVendor = (vendor: VendorData) => {
    setEditingVendor(vendor);
    setIsModalOpen(true);
  };

  const handleViewVendor = (vendor: VendorData) => {
    setViewingVendor(vendor);
  };

  const handleDeleteVendor = (vendorId: number) => {
    setVendors((prev) => prev.filter((vendor) => vendor.id !== vendorId));
    setSelectedVendors((prev) => prev.filter((id) => id !== vendorId));
  };

  const handleSaveVendor = (vendorData: VendorData) => {
    if (editingVendor) {
      // Update existing vendor
      setVendors((prev) =>
        prev.map((vendor) =>
          vendor.id === editingVendor.id
            ? { ...vendorData, id: editingVendor.id }
            : vendor
        )
      );
      toast.success("Vendor updated successfully!");
    } else {
      // Add new vendor
      const newVendor = {
        ...vendorData,
        id: Math.max(...vendors.map((v) => v.id)) + 1,
      };
      setVendors((prev) => [...prev, newVendor]);
      console.log(newVendor);
    }
    setIsModalOpen(false);
    setEditingVendor(undefined);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "error";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  if (viewingVendor) {
    return (
      <VendorDetails
        vendor={viewingVendor}
        onBack={() => setViewingVendor(false)}
      />
    );
  }

  return (
    <Box sx={{ p: "16px 24px", backgroundColor: "background.paper" }}>
      {/* Search and Filters */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          alignItems: "center",
          flexWrap: "wrap",
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
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            label="Filter by Category"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddVendor}
          sx={{ minWidth: 180, bgcolor: "#6366f1" }}
        >
          ADD NEW VENDOR
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#F3F5F9" }}>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedVendors.length > 0 &&
                    selectedVendors.length < filteredVendors.length
                  }
                  checked={
                    filteredVendors.length > 0 &&
                    selectedVendors.length === filteredVendors.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Vendor</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Category</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Contact</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Products</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Rating</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Joined</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Actions</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVendors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((vendor) => (
                <TableRow key={vendor.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedVendors.includes(vendor.id)}
                      onChange={() => handleSelectVendor(vendor.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        src={vendor.avatar}
                        sx={{ width: 40, height: 40, bgcolor: "grey.200" }}
                      >
                        <BusinessIcon />
                      </Avatar>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Typography fontWeight="medium">
                            {vendor.name}
                          </Typography>
                          {vendor.isVerified && (
                            <VerifiedIcon
                              sx={{ color: "primary.main", fontSize: 16 }}
                            />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {vendor.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={vendor.category}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{vendor.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="medium">
                      {vendor.totalProducts}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Rating
                        value={vendor.rating}
                        readOnly
                        size="small"
                        precision={0.1}
                      />
                      <Typography variant="body2" color="text.secondary">
                        ({vendor.rating})
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={vendor.status}
                      size="small"
                      color={getStatusColor(vendor.status) as any}
                      variant="filled"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(vendor.joinedDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleViewVendor(vendor)}
                      >
                        <ViewIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEditVendor(vendor)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteVendor(vendor.id)}
                        sx={{ color: "error.main" }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredVendors.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(Number.parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 7, 10, 25]}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} of ${count}`
        }
      />

      {/* Modal */}
      <VendorModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingVendor(undefined);
        }}
        vendor={editingVendor}
        onSave={handleSaveVendor}
      />
    </Box>
  );
}
