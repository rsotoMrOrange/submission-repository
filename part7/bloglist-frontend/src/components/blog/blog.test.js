import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./blog.component";

test("Renders content", () => {
  const blog = {
    title: "Testing blog",
    author: "Testing file",
    url: "url",
    likes: 19834,
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".blogStyle");
  expect(div).toHaveTextContent("Testing blog - Testing file");
});

test('clicking the "view" button shows more information about the blog', async () => {
  const blog = {
    title: "Testing blog",
    author: "Testing file",
    url: "url",
    likes: 19834,
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const url = screen.getByText("url");
  expect(url).toBeDefined();

  const likes = screen.getByText("19834");
  expect(likes).toBeDefined();
});

test("blog's additional information is not shown by default", () => {
  const blog = {
    title: "Testing blog",
    author: "Testing file",
    url: "url",
    likes: 19834,
  };

  render(<Blog blog={blog} />);

  const title = screen.getByText("Testing blog - Testing file");
  expect(title).toBeDefined();

  const viewButton = screen.getByText("view");
  expect(viewButton).toBeDefined();

  const url = screen.queryByText("url");
  expect(url).toBeNull();
});

test('"likes" event handler is called when the "like" button is clicked', async () => {
  const blog = {
    title: "Testing blog",
    author: "Testing file",
    url: "url",
    likes: 19834,
  };

  const updateBlog = jest.fn();
  updateBlog
    .mockReturnValueOnce({
      title: "Testing blog",
      author: "Testing file",
      url: "url",
      likes: 19835,
    })
    .mockReturnValueOnce({
      title: "Testing blog",
      author: "Testing file",
      url: "url",
      likes: 19836,
    });
  const deleteBlog = jest.fn();
  const user = userEvent.setup();

  render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />);
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(updateBlog.mock.calls).toHaveLength(2);
});
