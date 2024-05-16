import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getById, update, remove } from "../../services/blogs";
import { useNotificationDispatch } from "../../NotificationContext";

const ERROR = "error";

const BlogView = () => {
  const blogId = useParams().id;
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const navigate = useNavigate();

  const result = useQuery({
    queryKey: ["blogs", { id: blogId }],
    queryFn: () => getById(blogId),
    refetchOnWindowFocus: false,
  });

  const blog = result.data;

  const removeBlog = async () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      await deleteBlog(blog.id);
    }
  };

  const likeBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: (likedBlog) => {
      queryClient.setQueryData(["blogs", { id: blogId }], (oldBlog) =>
        oldBlog
          ? {
              ...oldBlog,
              likes: likedBlog.likes,
            }
          : oldBlog,
      );
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: remove,
    onSuccess: (id) => {
      queryClient.setQueryData(["blogs"], (oldBlogs) =>
        oldBlogs.filter((blog) => blog.id !== id),
      );
    },
  });

  const updateBlog = async () => {
    try {
      let newObject = {
        ...blog,
        likes: blog.likes + 1,
      };
      likeBlogMutation.mutate({
        id: blog.id,
        newObject,
      });
    } catch (error) {
      notificationDispatch({
        type: "SHOW",
        payload: {
          message: `Something went wrong ${error.message}`,
          className: ERROR,
        },
      });
      setTimeout(() => {
        notificationDispatch({
          type: "HIDE",
        });
      }, 5000);
    }
  };

  const deleteBlog = async (id) => {
    try {
      deleteBlogMutation.mutate(id);
      navigate("/");
    } catch (error) {
      notificationDispatch({
        type: "SHOW",
        payload: {
          message: `Something went wrong ${error.message}`,
          className: ERROR,
        },
      });
      setTimeout(() => {
        notificationDispatch({
          type: "HIDE",
        });
      }, 5000);
    }
  };

  const isLoggedUserOwner = () => {
    const username = JSON.parse(
      window.localStorage.getItem("loggedBlogappUser"),
    )?.username;
    return username === blog?.user?.username;
  };

  if (!blog) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} <button onClick={updateBlog}>like</button>
      </p>
      <p>added by {blog?.user?.name}</p>
      {isLoggedUserOwner() && <button onClick={removeBlog}>remove</button>}
    </div>
  );
};

export default BlogView;
