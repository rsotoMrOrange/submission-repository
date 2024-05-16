import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getById } from "../../services/users";

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
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      <div>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UserView;
