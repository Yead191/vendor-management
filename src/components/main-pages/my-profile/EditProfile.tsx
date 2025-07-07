import {
  Business,
  Email,
  LocationOn,
  Person,
  Phone,
  PhotoCamera,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

type EditProfileProps = {
  handleProfileSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setProfileData: (data: any) => void; // Replace 'any' with your profile data type if available
  profileData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    address: string;
    bio: string;
    [key: string]: any;
  };
  profileImage: string;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EditProfile({
  handleProfileSubmit,
  setProfileData,
  profileData,
  profileImage,
  handleImageChange,
}: EditProfileProps) {
  return (
    <form onSubmit={handleProfileSubmit}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {/* Profile Image Section */}
        <Box sx={{ flex: { xs: "1 0 100%", md: "1 0 33.333%" } }}>
          <Card sx={{ textAlign: "start", p: 2 }}>
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  src={profileImage}
                  sx={{ width: 120, height: 120, mx: "auto" }}
                />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="profile-image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="profile-image-upload">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      right: -8,
                      bgcolor: "background.paper",
                      boxShadow: 2,
                      "&:hover": { bgcolor: "grey.100" },
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
                <div className="flex justify-center items-center mt-5">
                  <Badge badgeContent={profileData.role} color="primary" />
                </div>
              </Box>
              <div>
                <Box
                  sx={{
                    display: "flex",

                    gap: 6,
                  }}
                >
                  <Typography variant="h6">
                    {profileData.firstName} {profileData.lastName}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {profileData.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profileData.company}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Box>

        {/* Profile Form */}
        <Box sx={{ flex: { xs: "1 0 100%", md: "1 0 66.666%" } }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ flex: { xs: "1 0 100%", sm: "1 0 50%" } }}>
              <TextField
                fullWidth
                label="First Name"
                value={profileData.firstName}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    firstName: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 0 100%", sm: "1 0 50%" } }}>
              <TextField
                fullWidth
                label="Last Name"
                value={profileData.lastName}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    lastName: e.target.value,
                  })
                }
              />
            </Box>
            <Box sx={{ flex: "1 0 100%" }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    email: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 0 100%", sm: "1 0 50%" } }}>
              <TextField
                fullWidth
                label="Phone"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    phone: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 0 100%", sm: "1 0 50%" } }}>
              <TextField
                fullWidth
                label="Company"
                value={profileData.company}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    company: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ flex: "1 0 100%" }}>
              <TextField
                fullWidth
                label="Address"
                value={profileData.address}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    address: e.target.value,
                  })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ flex: "1 0 100%" }}>
              <TextField
                fullWidth
                label="Bio"
                multiline
                rows={3}
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
                placeholder="Tell us about yourself and your business..."
              />
            </Box>
          </Box>
        </Box>

        {/* Submit Button */}
        <Box sx={{ flex: "1 0 100%" }}>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Link href="/analytics">
              <Button variant="outlined" size="large">
                Cancel
              </Button>
            </Link>
            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{
                bgcolor: "#6366f1",
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
