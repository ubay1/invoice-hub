"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import Image from "next/image";
import IconMenu1 from "@/components/invoices/IconMenu1";
import IconMenu2 from "@/components/invoices/IconMenu2";
import { usePathname } from "next/navigation";
import IconChevronDown from "@/components/invoices/IconChevronDown";
import IconNotif from "@/components/invoices/IconNotif";
import IconMessage from "@/components/invoices/IconMessage";
import ToggleTheme from "@/components/invoices/ToggleTheme";
import { useTheme } from "@/utils/theme";
import Link from "next/link";
import { IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const drawerWidth = 240;

const DrawerContent = () => {
  const path = usePathname();

  const LIST_SIDEBAR_MENU = [
    {
      text: "Add Invoice",
      path: "/invoices/add",
      icon: (
        <IconMenu1
          color={["/", "/invoices/add"].includes(path) ? "#FFFFFF" : "#9D9D9D"}
        />
      ),
    },
    {
      text: "My Invoice",
      path: "/invoices/list",
      icon: (
        <IconMenu2
          color={["/invoices/list"].includes(path) ? "#FFFFFF" : "#9D9D9D"}
        />
      ),
    },
  ];

  return (
    <>
      <Toolbar>
        <Image src="../logo.svg" priority alt="logo" width={150} height={100} />
      </Toolbar>
      <List>
        <Typography
          component="div"
          sx={{
            paddingX: "24px",
            color: "#9D9D9D",
          }}
        >
          Menu
        </Typography>
        {LIST_SIDEBAR_MENU.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            component={Link}
            href={item.path}
          >
            <ListItemButton sx={{ paddingX: "24px", display: "flex", gap: 1 }}>
              <ListItemIcon style={{ minWidth: 0 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color: path === item.path ? "#FFFFFF" : "#9D9D9D",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default function PageLayout({
  customStyles,
  children,
}: {
  children: React.ReactNode;
  customStyles?: React.CSSProperties;
}) {
  const { isDarkTheme } = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const LIST_TOP_MENU = [
    {
      text: "Notif",
      icon: <IconNotif />,
    },
    {
      text: "Message",
      icon: <IconMessage />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: `${drawerWidth}px`,
          bgcolor: `${isDarkTheme ? "#121212" : "#FFFFFF !important"}`,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon sx={{ color: isDarkTheme ? "#FFFFFF" : "#9D9D9D" }} />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <ToggleTheme />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {LIST_TOP_MENU.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: "#EFF4FB",
                    border: "1px solid #E2E8F0",
                    width: "30px",
                    height: "30px",
                    borderRadius: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {item.icon}

                  {index === 1 && (
                    <Box
                      sx={{
                        border: "1px solid #FFFFFF",
                        bgcolor: "#DC3545",
                        width: "8px",
                        height: "8px",
                        borderRadius: 100,
                        position: "absolute",
                        top: 0,
                        right: 0,
                      }}
                    ></Box>
                  )}
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Box display={"flex"} flexDirection={"column"} alignItems={"end"}>
                <Typography
                  component="div"
                  color={isDarkTheme ? "#FFFFFF" : "#000000"}
                  style={{ fontSize: "14px" }}
                >
                  John Doe
                </Typography>
                <Typography
                  component="div"
                  color={isDarkTheme ? "#FFFFFF" : "#637381"}
                  style={{ fontSize: "12px" }}
                >
                  Verified Member
                </Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"}>
                <Image
                  src="../user.svg"
                  alt="photo-user"
                  priority
                  width={40}
                  height={40}
                />
                <IconChevronDown color={isDarkTheme ? "#FFFFFF" : "#637381"} />
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            bgcolor: isDarkTheme ? "#121212 !important" : "#1C2434 !important",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        // variant="permanent"
        // anchor="left"
      >
        <DrawerContent />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            bgcolor: isDarkTheme ? "#121212 !important" : "#1C2434 !important",
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open
      >
        <DrawerContent />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: 8,
          bgcolor: "background.default",
          marginLeft: { sm: `${drawerWidth}px` },
          ...customStyles,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
