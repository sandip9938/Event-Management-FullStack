import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  Box,
  Stack,
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const HomePage = () => {
  const navigate = useNavigate();

  // Load theme from localStorage and ensure default is "light"
  const getInitialTheme = () => localStorage.getItem("theme") === "dark";
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  // Ensure theme stays in sync across tabs/windows
  useEffect(() => {
    const handleStorageChange = () => setDarkMode(getInitialTheme);
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: "#2E7D32" }, // Green theme
          secondary: { main: "#FFC107" },
        },
        typography: {
          fontFamily: '"Roboto", sans-serif',
          h3: { fontWeight: 700, letterSpacing: "1px" },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          py: 4,
        }}
      >
        {/* Theme Toggle Button */}
        <Box sx={{ position: "absolute", top: 20, right: 20 }}>
          <IconButton
            onClick={toggleDarkMode}
            color="inherit"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        {/* Elegant Heading */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: darkMode ? "#A5D6A7" : "#2E7D32",
            letterSpacing: "1px",
            mb: 2,
          }}
        >
          Welcome to Event Management System
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Discover and manage events effortlessly. Join, create, and explore
          events near you!
        </Typography>

        {/* Action Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ width: "100%", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/events")}
            sx={{ px: 4, py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
          >
            View Events
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/login")}
            sx={{ px: 4, py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
          >
            Login / Register
          </Button>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default HomePage;
