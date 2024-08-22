import React from "react";
import { useParams, Link } from "react-router-dom";

const UserDetail = ({ blogs }) => {
  const { id } = useParams();
  const userBlogs = blogs.filter((blog) => blog.user.id === id);
  
  if (!userBlogs) {
    return <div>No Blogs are found.</div>;
  }

  return (
    <div>
      <h3>{userBlogs[0].user.name}</h3>
      <h4>Added Blogs</h4>
      <ul>
        {userBlogs.map((blog) => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;