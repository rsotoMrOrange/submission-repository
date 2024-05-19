import React from "react";
import { useQuery } from "@tanstack/react-query";
import userService from "../../services/users";
import User from "../user/user.component";
import { Box, List, ListItem, Typography } from "@mui/material";

const UserList = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
  });

  const users = result.data;

  if (!users) {
    return <div>loading...</div>;
  }

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <User
              userId={user.id}
              name={user.name}
              blogCount={user.blogs.length}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default UserList;
