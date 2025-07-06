import type React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";
import {
  People,
  Business,
  AttachMoney,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";

export const PremiumMetricCard = ({
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
}) => {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        borderRadius: 4,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background:
            trend === "up"
              ? "linear-gradient(90deg, #10b981, #059669)"
              : trend === "down"
              ? "linear-gradient(90deg, #ef4444, #dc2626)"
              : "linear-gradient(90deg, #6366f1, #4f46e5)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2.5}>
          {/* Header with Icon and Trend */}
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <div className="flex items-center gap-2">
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  width: 48,
                  height: 48,
                  "& .MuiSvgIcon-root": {
                    fontSize: "1.5rem",
                  },
                }}
              >
                {icon}
              </Avatar>
              {/* Value */}
              <Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    lineHeight: 1.2,
                    fontSize: { xs: "1.75rem", sm: "2rem" },
                  }}
                >
                  {value}
                </Typography>
              </Box>
            </div>

            {trend && trendValue && (
              <Chip
                icon={trend === "up" ? <TrendingUp /> : <TrendingDown />}
                label={trendValue}
                size="small"
                sx={{
                  bgcolor:
                    trend === "up"
                      ? alpha("#10b981", 0.1)
                      : alpha("#ef4444", 0.1),
                  color: trend === "up" ? "#059669" : "#dc2626",
                  border: `1px solid ${
                    trend === "up"
                      ? alpha("#10b981", 0.2)
                      : alpha("#ef4444", 0.2)
                  }`,
                  fontWeight: 600,
                  "& .MuiChip-icon": {
                    fontSize: "1rem",
                    color: "inherit",
                  },
                }}
              />
            )}
          </Box>

          {/* Title and Subtitle */}
          <Stack spacing={0.5}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                fontSize: "1rem",
              }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: "0.8rem",
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
