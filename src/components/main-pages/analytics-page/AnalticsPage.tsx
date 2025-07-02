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

// Premium data sets
const revenueData = [
  { month: "Jan", revenue: 45000, users: 1200, vendors: 45 },
  { month: "Feb", revenue: 52000, users: 1450, vendors: 52 },
  { month: "Mar", revenue: 61000, users: 1780, vendors: 61 },
  { month: "Apr", revenue: 68000, users: 2030, vendors: 68 },
  { month: "May", revenue: 75000, users: 2340, vendors: 75 },
  { month: "Jun", revenue: 83000, users: 2670, vendors: 83 },
  { month: "Jul", revenue: 91000, users: 2980, vendors: 91 },
  { month: "Aug", revenue: 98000, users: 3250, vendors: 98 },
  { month: "Sep", revenue: 106000, users: 3560, vendors: 106 },
  { month: "Oct", revenue: 115000, users: 3890, vendors: 115 },
  { month: "Nov", revenue: 123000, users: 4210, vendors: 123 },
  { month: "Dec", revenue: 132000, users: 4560, vendors: 132 },
];

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

const subscriptionTiers = [
  { name: "Starter", value: 35, revenue: 15000, color: "#667eea" },
  { name: "Professional", value: 40, revenue: 45000, color: "#764ba2" },
  { name: "Enterprise", value: 20, revenue: 65000, color: "#f093fb" },
  { name: "Custom", value: 5, revenue: 25000, color: "#4facfe" },
];

const PremiumMetricCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: "up" | "down";
  trendValue?: string;
}) => (
  <Card
    elevation={0}
    sx={{
      background: "white",
      position: "relative",
      overflow: "hidden",
      height: "100%",
      borderRadius: 3,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
    }}
  >
    <CardContent sx={{ position: "relative", zIndex: 1 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <div className="flex gap-2">
          <Avatar sx={{ bgcolor: "#f5f5f5", color: "#666" }}>{icon}</Avatar>
          <Typography variant="h4" fontWeight="bold" gutterBottom color="#333">
            {value}
          </Typography>
        </div>
        {trend && (
          <Chip
            label={trendValue}
            size="small"
            sx={{
              bgcolor:
                trend === "up"
                  ? "rgba(76, 175, 80, 0.1)"
                  : "rgba(244, 67, 54, 0.1)",
              color: trend === "up" ? "#4caf50" : "#f44336",
              border: `1px solid ${trend === "up" ? "#4caf50" : "#f44336"}`,
            }}
          />
        )}
      </Box>

      <Typography variant="body2" color="#666">
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="caption"
          sx={{ color: "#999", mt: 1, display: "block" }}
        >
          {subtitle}
        </Typography>
      )}
    </CardContent>
  </Card>
);

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
      <Box sx={{ mt: 4 }}>
        {/* Customer + Vendor Bar Chart */}
        <Box sx={{ mb: 4 }}>
          <ChartContainer
            title="Customer & Vendor Growth (Jan-Dec)"
            height={184}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerVendorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
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
          </ChartContainer>
        </Box>

        {/* Subscription Bar Chart */}
        <Box>
          <ChartContainer
            title="Subscription Tiers Growth (Jan-Dec)"
            height={184}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subscriptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
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
          </ChartContainer>
        </Box>
      </Box>
    </div>
  );
}
