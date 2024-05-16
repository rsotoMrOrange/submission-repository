import { useState } from "react";
import PropType from "prop-types";
import "./blog.styles.css";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div className="blogStyle">
      <p>
        <Link to={`/blogs/${blog.id}`}>
          {" "}
          {blog.title} - {blog.author}{" "}
        </Link>
      </p>
    </div>
  );
};

Blog.propTypes = {
  blog: PropType.object.isRequired,
};

export default Blog;
