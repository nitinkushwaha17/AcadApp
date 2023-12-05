import { useEffect } from "react";
// import Link from 'next/link';
// import { useRouter } from 'next/router';
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Typography,
  useMediaQuery,
  Link,
  Toolbar,
  Card,
  Icon,
  Stack,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link as Lk } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddIcon from "@mui/icons-material/Add";
import { NavItem } from "./navItem";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../features/sidebarSlice";

const items = [
  {
    href: "/",
    icon: <DashboardIcon fontSize="small" />,
    title: "Home",
  },
  {
    href: "/post",
    icon: <ArticleIcon fontSize="small" />,
    title: "Assignments",
  },
  {
    href: "/post",
    icon: <AccountBoxIcon fontSize="small" />,
    title: "Announcements",
  },
  {
    href: "/classes",
    icon: <OpenInNewIcon fontSize="small" />,
    title: "Classes",
  },
  {
    href: "/add",
    icon: <OpenInNewIcon fontSize="small" />,
    title: "Add",
  },
  {
    href: "/join",
    icon: <OpenInNewIcon fontSize="small" />,
    title: "Join Subject",
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const open = useSelector(state => state.sidebar.open);

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const handleClose = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }

    dispatch(toggle());
  };

  const content = (
    <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
    >
        <Toolbar />
        <Box px={2} mb={4}>
        <Lk to="/new">
          <Button 
            sx={{px: 4, py: 2,backgroundColor: "neutral.700",
              color: "#fff"}}
            onClick={()=>dispatch(toggle())}
            >
              <Stack direction="row" gap={2}>
                <AddIcon />
                <Typography>New Post</Typography>
              </Stack>
          </Button>
          </Lk>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
    </Box>
  );

  if (mdUp) {
    return (
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        sx={{ width: 280 }}
      >
        <Toolbar />
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={handleClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      <Toolbar />
      {content}
    </Drawer>
  );
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default Sidebar;