"use client";

import type React from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { People, Business, AttachMoney } from "@mui/icons-material";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useState } from "react";
import { PremiumMetricCard } from "./PremiumMetricCard";

interface CustomerVendorDatum {
  year: string;
  month: string;
  customers: number;
  vendors: number;
}

// New data for Customer + Vendor chart
const customerVendorData = [
  { month: "Jan", customers: 200, vendors: 45 },
  { month: "Feb", customers: 450, vendors: 52 },
  { month: "Mar", customers: 380, vendors: 61 },
  { month: "Apr", customers: 230, vendors: 68 },
  { month: "May", customers: 340, vendors: 75 },
  { month: "Jun", customers: 470, vendors: 83 },
  { month: "Jul", customers: 380, vendors: 91 },
  { month: "Aug", customers: 250, vendors: 98 },
  { month: "Sep", customers: 460, vendors: 106 },
  { month: "Oct", customers: 490, vendors: 115 },
  { month: "Nov", customers: 210, vendors: 123 },
  { month: "Dec", customers: 460, vendors: 132 },
];

// New data for Subscription chart
const subscriptionData = [
  {
    month: "Jan",
    starter: 420,
    professional: 380,
    enterprise: 200,
    custom: 50,
  },
  {
    month: "Feb",
    starter: 485,
    professional: 420,
    enterprise: 235,
    custom: 58,
  },
  {
    month: "Mar",
    starter: 560,
    professional: 485,
    enterprise: 270,
    custom: 67,
  },
  {
    month: "Apr",
    starter: 635,
    professional: 550,
    enterprise: 305,
    custom: 76,
  },
  {
    month: "May",
    starter: 710,
    professional: 615,
    enterprise: 340,
    custom: 85,
  },
  {
    month: "Jun",
    starter: 785,
    professional: 680,
    enterprise: 375,
    custom: 94,
  },
  {
    month: "Jul",
    starter: 860,
    professional: 745,
    enterprise: 410,
    custom: 103,
  },
  {
    month: "Aug",
    starter: 935,
    professional: 810,
    enterprise: 445,
    custom: 112,
  },
  {
    month: "Sep",
    starter: 1010,
    professional: 875,
    enterprise: 480,
    custom: 121,
  },
  {
    month: "Oct",
    starter: 1085,
    professional: 940,
    enterprise: 515,
    custom: 130,
  },
  {
    month: "Nov",
    starter: 1160,
    professional: 1005,
    enterprise: 550,
    custom: 139,
  },
  {
    month: "Dec",
    starter: 1235,
    professional: 1070,
    enterprise: 585,
    custom: 148,
  },
];

const ChartContainer = ({
  title,
  children,
  height = 350,
}: {
  title: string;
  children: React.ReactNode;
  height?: number;
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: 3,
      background: "white",
      height: "100%",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
    }}
  >
    <Typography
      variant="h6"
      fontWeight="600"
      gutterBottom
      sx={{ color: "#1e293b", mb: 3 }}
    >
      {title}
    </Typography>
    <Box sx={{ height }}>{children}</Box>
  </Paper>
);

export default function AnalyticsPage() {
  const currentYear = new Date().getFullYear();
  const [selectedCustomerVendorYear, setSelectedCustomerVendorYear] =
    useState(currentYear);
  const [selectedSubscriptionYear, setSelectedSubscriptionYear] =
    useState(currentYear);

  const getLastFiveYears = () => {
    return Array.from({ length: 5 }, (_, index) => currentYear - index);
  };
  const availableYears = getLastFiveYears();

  // console.log(currentYear);
  return (
    <div className="overflow-hidden">
      {/* KPI Cards */}
      <div className="flex space-between gap-3 w-full">
        <div className="w-full">
          <PremiumMetricCard
            title="Active Users"
            value="4,560"
            subtitle="Across all platforms"
            icon={<People />}
            trend="up"
            trendValue="+12%"
          />
        </div>
        <div className="w-full">
          <PremiumMetricCard
            title="Vendor Partners"
            value="132"
            subtitle="Verified vendors"
            icon={<Business />}
            trend="up"
            trendValue="+8%"
          />
        </div>
        <div className="w-full ">
          <PremiumMetricCard
            title="Total Revenue"
            value="$1.2M"
            subtitle="Monthly recurring revenue"
            icon={<AttachMoney />}
            trend="up"
            trendValue="+23%"
          />
        </div>
      </div>

      {/* New Full Width Charts */}
      <Box sx={{ mt: 3 }}>
        {/* Customer + Vendor Bar Chart */}
        <Card style={{ borderRadius: "12px" }}>
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                fontSize: "20px",
                fontWeight: 500,
              }}
            >
              <span>Total Customer & Vendor Growth</span>
              <Select
                value={selectedCustomerVendorYear}
                onChange={(e) => setSelectedCustomerVendorYear(e.target.value)}
                size="small"
                style={{ width: 120 }}
              >
                <MenuItem value="Year" disabled>
                  Year
                </MenuItem>

                {availableYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div style={{ height: "190px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerVendorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#666" }}
                  />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      background: "white",
                      border: "none",
                      borderRadius: "8px",
                      color: "black",
                    }}
                  />
                  <Bar
                    dataKey="customers"
                    name="Customers"
                    fill="#4ade80"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="vendors"
                    name="Vendors"
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Bar Chart */}
        <Box sx={{ mt: 3 }}>
          <Card style={{ borderRadius: "12px" }}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                  fontSize: "20px",
                  fontWeight: 500,
                }}
              >
                <span>Total Subscription Tiers Growth</span>
                <Select
                  value={selectedSubscriptionYear}
                  onChange={(e) => setSelectedSubscriptionYear(e.target.value)}
                  size="small"
                  style={{ width: 120 }}
                >
                  <MenuItem value="Year" disabled>
                    Year
                  </MenuItem>
                  {availableYears.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div style={{ height: "190px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subscriptionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#666" }}
                    />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        background: "white",
                        border: "none",
                        borderRadius: "8px",
                        color: "black",
                      }}
                    />
                    <Bar
                      dataKey="starter"
                      name="Starter"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="professional"
                      name="Professional"
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="enterprise"
                      name="Enterprise"
                      fill="#06d6a0"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="custom"
                      name="Custom"
                      fill="#f59e0b"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
}
