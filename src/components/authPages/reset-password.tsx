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

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ResetPassword() {
    const router = useRouter()
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: typeof errors = {
      newPassword: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!form.newPassword) {
      newErrors.newPassword = "Please input your new Password!";
      isValid = false;
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password!";
      isValid = false;
    } else if (form.confirmPassword !== form.newPassword) {
      newErrors.confirmPassword =
        "The new password you entered does not match!";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Handle password update logic
    console.log("Password updated:", form);
    toast.success("Password updated successfully!");
    router.push("/auth/login"); 
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
          Reset Password
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#666",
            mb: 4,
          }}
        >
          Please set a new password to get access of your account!
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            name="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            placeholder="Enter new password"
            value={form.newPassword}
            onChange={handleChange}
            error={!!errors.newPassword}
            helperText={errors.newPassword}
            sx={{
              mb: 3,
              height: "52px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                background: "white",
              },
            }}
          />

          <TextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            placeholder="Enter confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            sx={{
              mb: 3,
              height: "52px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                background: "white",
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(135deg, #7B2CBF 0%, #6366f1 100%)",
              borderRadius: 2,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
              mb: 2,
              "&:hover": {
                background: "linear-gradient(135deg, #6A1B9A 0%, #6366f1 100%)",
              },
            }}
          >
            Update Password
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
