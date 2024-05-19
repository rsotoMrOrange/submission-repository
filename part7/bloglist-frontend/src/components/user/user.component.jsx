import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const User = ({ userId, name, blogCount }) => {
  return (
    <Box
      padding={1}
      sx={{
        "&:hover": {
          background: "#def1ff",
          borderRadius: "8%",
        },
      }}
    >
      {" "}
      <Link to={`/users/${userId}`}>{name}</Link> - {blogCount}
    </Box>
  );
};

export default User;
