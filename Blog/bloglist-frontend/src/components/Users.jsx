/*import React from "react";
import Blog from "./Blog"
import { Link , useNavigate} from "react-router-dom"

const Users = ({ blogs }) => {
  const navigate = useNavigate();
  // Create an object to hold the blog count for each user
  const userBlogCount = {};
  console.log(blogs)
  blogs.forEach(blog => {
    const userName = blog.user.name
    if(userBlogCount[userName]){
      userBlogCount[userName] +=1
    }else{
      userBlogCount[userName]=1
    }
  });
  
  const users = Object.keys(userBlogCount).map(user=>{
    return {
      name: user,
      blogsCreated: userBlogCount[user]
    }
  })
  console.log(users)
  return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.name}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogsCreated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default Users;*/

import React from "react";
import Blog from "./Blog";
import { Link, useNavigate } from "react-router-dom";

const Users = ({ blogs }) => {
  const navigate = useNavigate();

  // Create an object to hold the blog count for each user
  const userBlogCount = {};

  blogs.forEach((blog) => {
    const userName = blog.user.name;
    const userId = blog.user.id;
    if (userBlogCount[userId]) {
      userBlogCount[userId].blogsCreated += 1;
    } else {
      userBlogCount[userId] = {
        id: userId,
        name: userName,
        blogsCreated: 1,
      };
    }
  });
 
  const users = Object.values(userBlogCount);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogsCreated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
