import PropType from "prop-types";
import "./blog.styles.css";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Blog = ({ blog }) => {
  return (
    <Box className="blogStyle" padding={1}>
      <p>
        <Link to={`/blogs/${blog.id}`}>
          {" "}
          {blog.title} - {blog.author}{" "}
        </Link>
      </p>
    </Box>
  );
};

Blog.propTypes = {
  blog: PropType.object.isRequired,
};

export default Blog;
