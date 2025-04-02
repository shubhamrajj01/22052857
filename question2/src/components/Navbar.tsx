import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from "@mui/material";
import {
  HomeRounded,
  TrendingUpRounded,
  PeopleAltRounded,
  NotificationsRounded,
  SearchRounded,
  AddCircleOutlineRounded,
  MenuRounded,
  CloseRounded
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationCount] = useState(3);
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/": "Real-Time Social Feed | SocialMetrics",
    "/top-users": "Top Influencers | SocialMetrics",
    "/trending-posts": "Viral Content | SocialMetrics",
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <>
      <Helmet>
        <title>{pageTitles[location.pathname] || "SocialMetrics"}</title>
        <meta name="description" content="Track social media engagement metrics in real-time." />
        <link rel="canonical" href={`https://socialmetrics.com${location.pathname}`} />
      </Helmet>

      <AppBar
        position="sticky"
        elevation={scrolled ? 4 : 1}
        sx={{
          background: scrolled
            ? "rgba(25, 25, 35, 0.95)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backdropFilter: "blur(8px)",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Avatar src="/logo-icon.png" alt="SocialMetrics" sx={{ width: 40, height: 40, mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, display: { xs: "none", md: "block" } }}>
              SocialMetrics
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button component={Link} to="/" startIcon={<HomeRounded />} sx={{ color: "white" }}>
              Feed
            </Button>
            <Button component={Link} to="/top-users" startIcon={<PeopleAltRounded />} sx={{ color: "white" }}>
              Top Users
            </Button>
            <Button component={Link} to="/trending-posts" startIcon={<TrendingUpRounded />} sx={{ color: "white" }}>
              Trending
            </Button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit">
              <SearchRounded />
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsRounded />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <AddCircleOutlineRounded />
            </IconButton>
            <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ display: { md: "none" } }}>
              {mobileOpen ? <CloseRounded /> : <MenuRounded />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250, bgcolor: "#2c2f33", height: "100vh", color: "white" }}>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/" onClick={handleDrawerToggle}>
              <ListItemIcon>
                <HomeRounded sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Feed" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/top-users" onClick={handleDrawerToggle}>
              <ListItemIcon>
                <PeopleAltRounded sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Top Users" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/trending-posts" onClick={handleDrawerToggle}>
              <ListItemIcon>
                <TrendingUpRounded sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Trending Posts" />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
          <ListItem disablePadding>
            <ListItemButton onClick={handleDrawerToggle}>
              <ListItemIcon>
                <SearchRounded sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleDrawerToggle}>
              <ListItemIcon>
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsRounded sx={{ color: "white" }} />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
