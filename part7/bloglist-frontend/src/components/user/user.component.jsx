import React from "react";
import { Link } from "react-router-dom";

const User = ({ userId, name, blogCount }) => {
  return (
    <div>
      {" "}
      <Link to={`/users/${userId}`}>{name}</Link> - {blogCount}
    </div>
  );
};

export default User;
