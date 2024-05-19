import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getById } from "../../services/users";
import { Box, List, ListItem, Typography } from "@mui/material";

const UserView = () => {
  const userId = useParams().id;

  const result = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getById(userId),
    refetchOnWindowFocus: false,
  });

  const user = result.data;

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Typography variant="h2" gutterBottom>
        {user.name}
      </Typography>
      <Typography variant="h5" mx={2} gutterBottom>
        Added blogs
      </Typography>
      <Box>
        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id}>
              <Box
                padding={1}
                sx={{
                  "&:hover": {
                    background: "#def1ff",
                    borderRadius: "8%",
                  },
                }}
              >
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default UserView;
