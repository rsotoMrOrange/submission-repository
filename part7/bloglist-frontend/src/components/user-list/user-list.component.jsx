import React from "react";
import { useQuery } from "@tanstack/react-query";
import userService from "../../services/users";
import User from "../user/user.component";

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
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <User
          key={user.username}
          userId={user.id}
          name={user.name}
          blogCount={user.blogs.length}
        />
      ))}
    </div>
  );
};

export default UserList;
