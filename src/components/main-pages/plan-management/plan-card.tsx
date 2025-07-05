"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  CheckCircle as CheckIcon,
  Star as StarIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
} from "@mui/icons-material";
import { pl } from "date-fns/locale";

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
  category: "basic" | "pro" | "enterprise";
}

interface PlanCardProps {
  plan: Plan;
  billingPeriod: "monthly" | "annual";
  onEdit: (plan: Plan) => void;
  onDelete: (plan: Plan) => void;
  onDuplicate: (plan: Plan) => void;
  isAdmin?: boolean;
}

export default function PlanCard({
  plan,
  billingPeriod,
  onEdit,
  onDelete,
  onDuplicate,
}: PlanCardProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getCurrentPrice = () => {
    return billingPeriod === "monthly" ? plan.monthlyPrice : plan.annualPrice;
  };

  const getPriceLabel = () => {
    if (billingPeriod === "monthly") {
      return "Per user, per month";
    }
    return "Per user, per month & billed annually";
  };

  const calculateSavings = () => {
    if (billingPeriod === "annual") {
      const monthlyCost = plan.monthlyPrice * 12;
      const annualCost = plan.annualPrice;
      if (monthlyCost > annualCost) {
        const savings = ((monthlyCost - annualCost) / monthlyCost) * 100;
        return Math.round(savings);
      }
    }
    return 0;
  };

  return (
    <Card
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: plan.isPopular ? 2 : 1,
        borderColor: "divider",
        // background: plan.isPopular
        //   ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        //   : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        color: plan.isPopular ? "black" : "inherit",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-4px)",
        },
        borderRadius: 3,
      }}
    >
      {/* Popular Badge */}
      {plan.isPopular && (
        <Box
          sx={{
            position: "absolute",
            top: 19,
            right: 40,
            zIndex: 1,
            // borderColor: "#C8C1DC",
            border: "1px solid #C8C1DC",
            borderRadius: "12px",
          }}
        >
          <Chip
            label="Popular"
            color="warning"
            size="small"
            icon={<StarIcon />}
            sx={{
              fontWeight: "bold",
              px: 1,
              bgcolor: "transparent",
              color: "#7E42F5",
              "& .MuiChip-icon": {
                color: "#7E42F5",
              },
            }}
          />
        </Box>
      )}

      {/* Admin Menu */}

      <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
        <IconButton size="small" onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              onEdit(plan);
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            Edit Plan
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDuplicate(plan);
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <CopyIcon fontSize="small" />
            </ListItemIcon>
            Duplicate Plan
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDelete(plan);
              handleMenuClose();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            Delete Plan
          </MenuItem>
        </Menu>
      </Box>

      <CardContent
        sx={{
          flex: 1,
          pt: plan.isPopular ? 0 : 2,
          px: plan.isPopular ? 0 : 2,
        }}
      >
        <div
          className={`${
            plan.isPopular &&
            "bg-gradient-to-b from-[#F1ECFE] via-[#F1ECFE] to-[#FCF9FE] p-4 pb-0"
          } border-b border-gray-200 `}
        >
          {/* Plan Header */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={{
                color: plan.isPopular ? "black" : "inherit",
                fontWeight: "bold",
              }}
            >
              {plan.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                color: plan.isPopular ? "#636263" : "text.secondary",
              }}
            >
              {plan.description}
            </Typography>

            {/* Pricing */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
                <Typography
                  variant="h4"
                  component="span"
                  fontWeight="bold"
                  sx={{ color: plan.isPopular ? "black" : "inherit" }}
                >
                  ${getCurrentPrice()}
                </Typography>
                {billingPeriod === "annual" && calculateSavings() > 0 && (
                  <Chip
                    label={`Save ${calculateSavings()}%`}
                    color="success"
                    size="small"
                    sx={{
                      bgcolor: undefined,
                      color: undefined,
                    }}
                  />
                )}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                }}
              >
                {getPriceLabel()}
              </Typography>
            </Box>
          </Box>
        </div>

        {/* Features */}
        <Box sx={{ my: 3, px: plan.isPopular ? 2 : 0 }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{ color: "inherit", fontWeight: "bold" }}
          >
            Features
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              color: "text.secondary",
            }}
          >
            Everything in {plan.category}, Plus & Business
          </Typography>
          <List dense sx={{ py: 0 }}>
            {plan.features.map((feature) => (
              <ListItem key={feature.id} sx={{ px: 0, py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckIcon
                    sx={{
                      color: "success.main",
                      fontSize: "small",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={feature.name}
                  secondary={feature.description}
                  primaryTypographyProps={{
                    variant: "body2",
                    sx: { color: "inherit" },
                  }}
                  secondaryTypographyProps={{
                    variant: "caption",
                    sx: {
                      color: "text.secondary",
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant={"outlined"}
          color={plan.buttonColor}
          size="large"
          sx={{
            bgcolor: undefined,
            color: undefined,
            borderColor: undefined,
            "&:hover": {
              bgcolor: undefined,
            },
          }}
        >
          {plan.buttonText}
          {/* Choose Plan */}
        </Button>
      </CardActions>
    </Card>
  );
}
