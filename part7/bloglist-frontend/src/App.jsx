import React, { useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import BlogList from "./components/blog-list/blog-list.component";
import BlogForm from "./components/blog-form/blog-form.component";
import BlogView from "./components/blog-view/blow-view.component";
import Login from "./components/login/login.component";
import Notification from "./components/notification/notification.component";
import UserList from "./components/user-list/user-list.component";
import UserView from "./components/user-view/user-view.component";

import { useUserDispatch, useUserValue } from "./UserContext";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { Container } from "@mui/material";
import Divider from "@mui/material/Divider";
import { lightBlue } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Home = () => {
  return (
    <>
      <BlogForm />
      <BlogList />
    </>
  );
};

const App = () => {
  const { user } = useUserValue();
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "SET_USER", payload: { user: user } });
      userDispatch({ type: "SET_TOKEN", payload: { token: user.token } });
    } else {
      navigate("/login");
    }
  }, []);

  const padding = {
    padding: 5,
    margin: 5,
  };

  return (
    <Container>
      {user && (
        <Stack direction="row" spacing={2} alignItems="center">
          <Link style={padding} to="/">
            <Typography
              variant="body"
              padding={1}
              sx={{
                "&:hover": {
                  borderRadius: "8%",
                  background: "#1976D2",
                  color: "white",
                },
              }}
            >
              home
            </Typography>
          </Link>
          <Link style={padding} to="/users">
            <Typography
              variant="body"
              padding={1}
              sx={{
                "&:hover": {
                  borderRadius: "8%",
                  background: "#1976D2",
                  color: "white",
                },
              }}
            >
              users
            </Typography>
          </Link>
          <Chip
            color="primary"
            variant="outlined"
            avatar={
              <Avatar sx={{ bgcolor: lightBlue[100] }}>
                {user?.name?.at(0)}
              </Avatar>
            }
            label={user?.name}
          />
          <Divider orientation="vertical" flexItem />
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              window.localStorage.clear();
              window.location.reload();
            }}
          >
            logout
          </Button>
        </Stack>
      )}

      <Typography variant="h1" gutterBottom>
        blogs
      </Typography>
      <Notification />
      <Divider variant="middle" sx={{ mt: 4, mb: 4 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserView />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </Container>
  );
};

export default App;
