"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Alert,
  Stack,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";

interface Feature {
  id: string;
  name: string;
  description?: string;
}

interface Plan {
  id?: number;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  isPopular: boolean;
  features: Feature[];
  buttonText: string;
  buttonColor: "primary" | "secondary" | "success" | "warning";
  featureTitle: string;
}
interface PlanModalProps {
  open: boolean;
  onClose: () => void;
  plan?: Plan | null;
  mode: "add" | "edit";
  onSave: (plan: Plan) => void;
}

export default function PlanModal({
  open,
  onClose,
  plan,
  mode,
  onSave,
}: PlanModalProps) {
  const [formData, setFormData] = useState<Plan>({
    name: "",
    description: "",
    monthlyPrice: 0,
    annualPrice: 0,
    isPopular: false,
    features: [],
    buttonText: "Get Started",
    buttonColor: "primary",
    featureTitle: "",
  });

  const [newFeature, setNewFeature] = useState("");
  const [newFeatureDescription, setNewFeatureDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (plan && mode === "edit") {
      setFormData(plan);
    } else {
      setFormData({
        name: "",
        description: "",
        monthlyPrice: 0,
        annualPrice: 0,
        isPopular: false,
        features: [],
        buttonText: "Get Started",
        buttonColor: "primary",
        featureTitle: "",
      });
    }
    setErrors({});
    setNewFeature("");
    setNewFeatureDescription("");
  }, [plan, mode, open]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Plan name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Plan description is required";
    }

    if (formData.monthlyPrice <= 0) {
      newErrors.monthlyPrice = "Monthly price must be greater than 0";
    }

    if (formData.annualPrice <= 0) {
      newErrors.annualPrice = "Annual price must be greater than 0";
    }

    if (formData.features.length === 0) {
      newErrors.features = "At least one feature is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log(formData);
      onSave(formData);
      onClose();
    }
  };

  const handleInputChange =
    (field: keyof Plan) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = field.includes("Price")
        ? Number.parseFloat(event.target.value) || 0
        : event.target.value;
      setFormData({ ...formData, [field]: value });
      if (errors[field]) {
        setErrors({ ...errors, [field]: "" });
      }
    };

  const handleSelectChange = (field: keyof Plan) => (event: any) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSwitchChange =
    (field: keyof Plan) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.checked });
    };

  const addFeature = () => {
    if (newFeature.trim()) {
      const feature: Feature = {
        id: Date.now().toString(),
        name: newFeature.trim(),
        description: newFeatureDescription.trim() || undefined,
      };
      setFormData({
        ...formData,
        features: [...formData.features, feature],
      });
      setNewFeature("");
      setNewFeatureDescription("");
      if (errors.features) {
        setErrors({ ...errors, features: "" });
      }
    }
  };

  const removeFeature = (featureId: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter((f) => f.id !== featureId),
    });
  };

  const calculateAnnualSavings = () => {
    const monthlyCost = formData.monthlyPrice * 12;
    const annualCost = formData.annualPrice;
    if (monthlyCost > annualCost) {
      const savings = ((monthlyCost - annualCost) / monthlyCost) * 100;
      return Math.round(savings);
    }
    return 0;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6">
            {mode === "add" ? "Add New Plan" : "Edit Plan"}
          </Typography>
          {formData.isPopular && <StarIcon color="warning" />}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Stack spacing={3}>
            {/* Basic Information */}
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Basic Information
              </Typography>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Plan Name"
                  value={formData.name}
                  onChange={handleInputChange("name")}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                />
                <TextField
                  fullWidth
                  label="Plan Description"
                  multiline
                  rows={2}
                  value={formData.description}
                  onChange={handleInputChange("description")}
                  error={!!errors.description}
                  helperText={errors.description}
                  required
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                  <FormControl fullWidth>
                    {/* <InputLabel>Feature Title</InputLabel> */}
                    <TextField
                      fullWidth
                      label="Feature Title"
                      type="text"
                      value={formData.featureTitle}
                      onChange={handleInputChange("featureTitle")}
                      error={!!errors.featureTitle}
                      helperText={errors.featureTitle}
                      required
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Button Color</InputLabel>
                    <Select
                      value={formData.buttonColor}
                      label="Button Color"
                      onChange={handleSelectChange("buttonColor")}
                    >
                      <MenuItem value="primary">Primary</MenuItem>
                      <MenuItem value="secondary">Secondary</MenuItem>
                      <MenuItem value="success">Success</MenuItem>
                      <MenuItem value="warning">Warning</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </Box>

            {/* Pricing */}
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Pricing
              </Typography>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Monthly Price"
                  type="number"
                  value={formData.monthlyPrice}
                  onChange={handleInputChange("monthlyPrice")}
                  error={!!errors.monthlyPrice}
                  helperText={errors.monthlyPrice}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
                <TextField
                  fullWidth
                  label="Annual Price"
                  type="number"
                  value={formData.annualPrice}
                  onChange={handleInputChange("annualPrice")}
                  error={!!errors.annualPrice}
                  helperText={errors.annualPrice}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Box>
              {calculateAnnualSavings() > 0 && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Annual plan saves {calculateAnnualSavings()}% compared to
                  monthly billing
                </Alert>
              )}
            </Box>

            {/* Settings */}
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Settings
              </Typography>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isPopular}
                      onChange={handleSwitchChange("isPopular")}
                    />
                  }
                  label="Mark as Popular Plan"
                />
                <TextField
                  fullWidth
                  label="Button Text"
                  value={formData.buttonText}
                  onChange={handleInputChange("buttonText")}
                  placeholder="e.g., Get Started, Contact Sales, etc."
                />
              </Stack>
            </Box>

            {/* Features */}
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Features
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Feature Name"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addFeature()}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Description (Optional)"
                  value={newFeatureDescription}
                  onChange={(e) => setNewFeatureDescription(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addFeature()}
                />
                <Button
                  variant="outlined"
                  onClick={addFeature}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Box>
              {errors.features && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{ mb: 1, display: "block" }}
                >
                  {errors.features}
                </Typography>
              )}
              <List
                sx={{
                  maxHeight: 200,
                  overflow: "auto",
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                }}
              >
                {formData.features.map((feature, index) => (
                  <Box key={feature.id}>
                    <ListItem>
                      <ListItemText
                        primary={feature.name}
                        secondary={feature.description}
                        primaryTypographyProps={{ variant: "body2" }}
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => removeFeature(feature.id)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < formData.features.length - 1 && <Divider />}
                  </Box>
                ))}
                {formData.features.length === 0 && (
                  <ListItem>
                    <ListItemText
                      primary="No features added yet"
                      primaryTypographyProps={{
                        color: "text.secondary",
                        style: { fontStyle: "italic" },
                      }}
                    />
                  </ListItem>
                )}
              </List>
            </Box>
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {mode === "add" ? "Add Plan" : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
