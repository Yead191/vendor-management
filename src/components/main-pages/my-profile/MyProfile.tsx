"use client";

import type React from "react";
import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  Typography,
  Alert,
} from "@mui/material";
import { Person, Lock } from "@mui/icons-material";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function MyProfile() {
  const [tabValue, setTabValue] = useState(0);
  const [profileImage, setProfileImage] = useState<string>(
    "/assets/oq.jpg?height=120&width=120"
  );

  const [successMessage, setSuccessMessage] = useState("");

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Quader",
    email: "john.doe@vendor.com",
    phone: "+1 (555) 123-4567",
    company: "Vendor Hub Ltd.",
    address: "123 Business St, City, State 12345",
    bio: "Experienced vendor with 10+ years in supply chain management.",
    profileImage: "/placeholder.svg?height=120&width=120",
    role: "Admin",
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setSuccessMessage("");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle profile update logic here
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <Container maxWidth="md" sx={{}}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        {/* Header */}
        <Box sx={{ bgcolor: "#6366f1", color: "white", p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Profile Settings
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Manage your account settings and preferences
          </Typography>
        </Box>

        {/* Success Message */}
        {successMessage && (
          <Alert severity="success" sx={{ m: 2 }}>
            {successMessage}
          </Alert>
        )}

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="profile tabs"
          >
            <Tab
              icon={<Person />}
              label="Edit Profile"
              iconPosition="start"
              sx={{ minHeight: 64, textTransform: "none", fontSize: "1rem" }}
            />
            <Tab
              icon={<Lock />}
              label="Change Password"
              iconPosition="start"
              sx={{ minHeight: 64, textTransform: "none", fontSize: "1rem" }}
            />
          </Tabs>
        </Box>

        {/* Edit Profile Tab */}
        <TabPanel value={tabValue} index={0}>
          <EditProfile
            handleProfileSubmit={handleProfileSubmit}
            profileData={profileData}
            setProfileData={setProfileData}
            profileImage={profileImage}
            handleImageChange={handleImageChange}
          />
        </TabPanel>

        {/* Change Password Tab */}
        <TabPanel value={tabValue} index={1}>
          <ChangePassword setSuccessMessage={setSuccessMessage} />
        </TabPanel>
      </Paper>
    </Container>
  );
}
