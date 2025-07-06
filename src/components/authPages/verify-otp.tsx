"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const OTP_LENGTH = 5;

const VerifyOtp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/\D/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value[0];
    setOtp(newOtp);

    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      toast.error(`Please enter a valid ${OTP_LENGTH}-digit OTP code!`);
      return;
    }

    console.log("Submitted OTP:", code);
    toast.success("Password reset successfully");
    router.push("/auth/reset-password");
  };

  const handleResendEmail = () => {
    toast.success("Another code sent to your email!");
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
          Verification Code
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#666",
            mb: 4,
          }}
        >
          We sent a verification code to your email. Please enter the{" "}
          {OTP_LENGTH}-digit code below to continue.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", marginTop: "24px" }}
        >
          <Box display="flex" justifyContent="space-between" gap={1} mb={3}>
            {otp.map((digit, index) => (
              <TextField
                key={index}
                inputRef={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) =>
                  handleChange(e.target as HTMLInputElement, index)
                }
                onKeyDown={(e) =>
                  handleKeyDown(
                    e as React.KeyboardEvent<HTMLInputElement>,
                    index
                  )
                }
                onFocus={(e) => e.target.select()}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontWeight: "bold",
                  },
                }}
                variant="standard"
                autoComplete="one-time-code"
                inputMode="numeric"
                sx={{
                  width: 50,
                  "& input": {
                    fontSize: "1.5rem",
                    padding: 1,
                  },
                  "& .MuiInput-underline:before": {
                    borderBottom: "2px solid #286a25",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "3px solid #286a25",
                  },
                }}
              />
            ))}
          </Box>

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
            Confirm Code
          </Button>

          <Box className="flex items-center justify-center gap-3 mt-6">
            <Typography variant="body2">
              You have not received the email?
            </Typography>
            <Typography
              variant="body2"
              onClick={handleResendEmail}
              className="underline font-medium"
              sx={{ color: "blue", cursor: "pointer" }}
            >
              Resend
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default VerifyOtp;
