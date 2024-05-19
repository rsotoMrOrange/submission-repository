import PropType from "prop-types";
import "./blog.styles.css";
import { Link } from "react-router-dom";
import { Box, Divider, Typography, Stack } from "@mui/material";

const Blog = ({ blog }) => {
  return (
    <Box
      className="blogStyle"
      padding={1}
      margin={1}
      sx={{
        "&:hover": {
          background: "#def1ff",
          borderRadius: "8%",
        },
      }}
    >
      <Link to={`/blogs/${blog.id}`}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body">{blog.title}</Typography>
          <Divider orientation="vertical" flexItem />
          <Typography variant="body">{blog.author}</Typography>
        </Stack>
      </Link>
    </Box>
  );
};

Blog.propTypes = {
  blog: PropType.object.isRequired,
};

export default Blog;
