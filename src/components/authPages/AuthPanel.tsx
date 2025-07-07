"use client";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { Business, TrendingUp } from "@mui/icons-material";
import Image from "next/image";

interface AuthPanelProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function AuthPanel({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}: AuthPanelProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: "#6366f1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        position: "relative",
        overflow: "hidden",
        height: "100vh",
        "&::before": {
          content: '""',
          position: "absolute",
          top: -50,
          right: -50,
          width: "40%",
          height: "40vh",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          zIndex: 1,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -100,
          left: -100,
          width: 300,
          height: "40vh",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.05)",
          zIndex: 1,
        },
        borderRadius: "0 50px 50px 0",
      }}
    >
      <Box sx={{ zIndex: 2, textAlign: "start", maxWidth: 400 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            mb: 3,
          }}
        >
          <Business sx={{ fontSize: 48, color: "white", mr: 2 }} />
          <TrendingUp
            sx={{ fontSize: 32, color: "rgba(255, 255, 255, 0.8)" }}
          />
        </Box>

        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: "white",
            fontWeight: "bold",
            mb: 2,
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            mb: 4,
            lineHeight: 1.6,
            fontSize: "16px",
          }}
        >
          {subtitle}
        </Typography>

        {buttonText && (
          <Button
            variant="outlined"
            size="large"
            onClick={onButtonClick}
            sx={{
              color: "white",
              borderColor: "rgba(255, 255, 255, 0.5)",
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            {buttonText}
          </Button>
        )}
      </Box>
      {/* <Box sx={{ zIndex: 2, textAlign: "start", maxWidth: 400 }}>
        <Image width={400} height={400} src="/logo2.png" alt="Logo" />
      </Box> */}
    </Box>
  );
}
