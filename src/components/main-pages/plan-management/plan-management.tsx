"use client";

import type React from "react";
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Chip,
  Alert,
  Snackbar,
  Container,
  Card,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import PlanCard from "./plan-card";
import PlanModal from "./plan-modal";
import ConfirmationDialog from "../customer-list/confirmation-dialog";

interface Feature {
  id: string;
  name: string;
  description?: string;
}

interface Plan {
  id: number;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  isPopular: boolean;
  features: Feature[];
  buttonText: string;
  buttonColor: "primary" | "secondary" | "success" | "warning";
  category: "basic" | "pro" | "enterprise";
}

// Mock data
const mockPlans: Plan[] = [
  {
    id: 1,
    name: "Creator",
    description:
      "Unlock powerful AI tools to create your content, wherever you work online.",
    monthlyPrice: 19,
    annualPrice: 190,
    isPopular: false,
    buttonText: "Choose Plan",
    buttonColor: "primary",
    category: "basic",
    features: [
      { id: "1", name: "01 User Access" },
      { id: "2", name: "Access to Fiora AI Chatbot" },
      { id: "3", name: "Access to SEO Mode" },
      { id: "4", name: "AI Image Generation and editing Tool" },
      { id: "5", name: "03 Brand Voice Access" },
      { id: "6", name: "Use AI with Browser Extension" },
    ],
  },
  {
    id: 2,
    name: "Pro Plan",
    description:
      "Leverage advanced AI to create content for multiple brands or campaigns.",
    monthlyPrice: 99,
    annualPrice: 990,
    isPopular: true,
    buttonText: "Switch to this Plan",
    buttonColor: "primary",
    category: "pro",
    features: [
      { id: "7", name: "05 User Access", description: "Unlimited Access" },
      { id: "8", name: "10 Knowledge Assets" },
      { id: "9", name: "Access to Pro SEO Mode" },
      { id: "10", name: "Collaboration with our Management" },
      { id: "11", name: "10 Brand Voice Access" },
      { id: "12", name: "01 Page Custom change Access" },
    ],
  },
  {
    id: 3,
    name: "Business Plan",
    description:
      "Personalized AI with enhanced controls, security, team training, and tech support.",
    monthlyPrice: 199,
    annualPrice: 1990,
    isPopular: false,
    buttonText: "Choose Plan",
    buttonColor: "success",
    category: "enterprise",
    features: [
      { id: "13", name: "Unlimited Feature Usage" },
      { id: "14", name: "Performance Analytics & Insights" },
      { id: "15", name: "Custom Style Guides with New View" },
      { id: "16", name: "Advanced Admin Panel Access" },
      { id: "17", name: "Group Document Collaboration" },
      { id: "18", name: "High Security Platform" },
    ],
  },
];

export default function PlanManagement() {
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [planModalMode, setPlanModalMode] = useState<"add" | "edit">("add");
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<Plan | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: "monthly" | "annual"
  ) => {
    setBillingPeriod(newValue);
  };

  const handleAddPlan = () => {
    setPlanModalMode("add");
    setEditingPlan(null);
    setPlanModalOpen(true);
  };

  const handleEditPlan = (plan: Plan) => {
    setPlanModalMode("edit");
    setEditingPlan(plan);
    setPlanModalOpen(true);
  };

  const handleDeletePlan = (plan: Plan) => {
    setPlanToDelete(plan);
    setConfirmationOpen(true);
  };

  const handleDuplicatePlan = (plan: Plan) => {
    const duplicatedPlan: Plan = {
      ...plan,
      id: Math.max(...plans.map((p) => p.id)) + 1,
      name: `${plan.name} (Copy)`,
      isPopular: false,
    };
    setPlans([...plans, duplicatedPlan]);
    setSnackbar({
      open: true,
      message: `Plan "${plan.name}" duplicated successfully`,
      severity: "success",
    });
  };

  const handleSavePlan = (planData: Plan) => {
    if (planModalMode === "add") {
      const newPlan: Plan = {
        ...planData,
        id: Math.max(...plans.map((p) => p.id)) + 1,
      };
      setPlans([...plans, newPlan]);
      setSnackbar({
        open: true,
        message: "Plan added successfully",
        severity: "success",
      });
    } else if (editingPlan) {
      setPlans(
        plans.map((p) =>
          p.id === editingPlan.id ? { ...planData, id: editingPlan.id } : p
        )
      );
      setSnackbar({
        open: true,
        message: "Plan updated successfully",
        severity: "success",
      });
    }
  };

  const handleConfirmDelete = () => {
    if (planToDelete) {
      setPlans(plans.filter((p) => p.id !== planToDelete.id));
      setSnackbar({
        open: true,
        message: `Plan "${planToDelete.name}" deleted successfully`,
        severity: "success",
      });
      setPlanToDelete(null);
    }
  };

  const calculateAnnualSavings = () => {
    const totalMonthlyCost = plans.reduce(
      (sum, plan) => sum + plan.monthlyPrice * 12,
      0
    );
    const totalAnnualCost = plans.reduce(
      (sum, plan) => sum + plan.annualPrice,
      0
    );
    if (totalMonthlyCost > totalAnnualCost) {
      const savings =
        ((totalMonthlyCost - totalAnnualCost) / totalMonthlyCost) * 100;
      return Math.round(savings);
    }
    return 0;
  };

  return (
    <Box
      sx={{
        p: "16px 24px",
        backgroundColor: "background.default",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        {/* Billing Period Tabs */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Paper sx={{ p: 0.5, borderRadius: 2 }}>
            <Tabs
              value={billingPeriod}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root": {
                  minWidth: 120,
                  textTransform: "none",
                  fontWeight: 600,
                },
              }}
            >
              <Tab label="Monthly" value="monthly" />
              <Tab
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    Annual
                    {calculateAnnualSavings() > 0 && (
                      <Chip
                        label={`Save ${calculateAnnualSavings()}%`}
                        color="success"
                        size="small"
                      />
                    )}
                  </Box>
                }
                value="annual"
              />
            </Tabs>
          </Paper>
        </Box>

        {billingPeriod === "annual" && calculateAnnualSavings() > 0 && (
          <Alert severity="success" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
            Save {calculateAnnualSavings()}% with annual billing across all
            plans!
          </Alert>
        )}
      </Box>

      {/* Plans Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(auto-fit, minmax(300px, 1fr))",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billingPeriod={billingPeriod}
            onEdit={handleEditPlan}
            onDelete={handleDeletePlan}
            onDuplicate={handleDuplicatePlan}
          />
        ))}

        {/* Add New Plan Card */}
        <Card
          sx={{
            height: "100%",
            minHeight: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: 2,
            borderStyle: "dashed",
            borderColor: "primary.main",
            background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "primary.dark",
              background: "linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)",
              transform: "translateY(-2px)",
              boxShadow: 4,
            },
          }}
          onClick={handleAddPlan}
        >
          <Box sx={{ textAlign: "center", p: 3 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                mx: "auto",
              }}
            >
              <AddIcon sx={{ fontSize: 40, color: "white" }} />
            </Box>
            <Typography variant="h6" gutterBottom color="primary">
              Add New Plan
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create a new subscription plan with custom features and pricing
            </Typography>
          </Box>
        </Card>
      </Box>

      {/* Plan Modal */}
      <PlanModal
        open={planModalOpen}
        onClose={() => setPlanModalOpen(false)}
        plan={editingPlan}
        mode={planModalMode}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Plan"
        message="Are you sure you want to delete this plan? This action will permanently remove the plan and cannot be undone. Existing customers on this plan will need to be migrated to another plan."
        confirmText="Delete Plan"
        cancelText="Cancel"
        severity="error"
        customerName={planToDelete?.name}
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
  );
}
