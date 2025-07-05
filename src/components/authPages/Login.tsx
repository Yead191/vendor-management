"use client";

import type React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Login attempt:", formData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        minHeight: "100vh",
        // backgroundColor: "#fafafa",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            color: "#333",
            mb: 1,
          }}
        >
          Welcome Back!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#666",
            mb: 4,
          }}
        >
          Sign in to your vendor dashboard
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            required
            fullWidth
            variant="outlined"
            placeholder="Email Address"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#9D4EDD" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "#9D4EDD",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#7B2CBF",
                },
              },
            }}
          />

          <TextField
            required
            fullWidth
            variant="outlined"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange("password")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#9D4EDD" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    sx={{ color: "#9D4EDD" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "#9D4EDD",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#7B2CBF",
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(135deg, #7B2CBF 0%, #9D4EDD 100%)",
              borderRadius: 2,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              mb: 2,
              "&:hover": {
                background: "linear-gradient(135deg, #6A1B9A 0%, #8E24AA 100%)",
              },
            }}
          >
            Sign In
          </Button>

          <Link
            href="#"
            underline="hover"
            sx={{
              color: "#9D4EDD",
              fontSize: "0.9rem",
              fontWeight: 500,
              "&:hover": {
                color: "#7B2CBF",
              },
            }}
          >
            Forgot Password?
          </Link>
        </Box>

        <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid #eee" }}>
          <Typography variant="body2" sx={{ color: "#666" }}>
            Don't have an account?{" "}
            <Link
              href="#"
              underline="hover"
              sx={{
                color: "#9D4EDD",
                fontWeight: 600,
                "&:hover": {
                  color: "#7B2CBF",
                },
              }}
            >
              Contact Admin
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
