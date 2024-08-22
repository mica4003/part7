import React, { useState } from "react";
import PropTypes from "prop-types";
import storage from "../services/storage";
import { Link, useParams } from "react-router-dom";


const Blog = ({ blogs, handleVote, handleDelete, handleComment }) => {
  const {id} = useParams()
  const blog = blogs.find(blog=>blog.id===id)
  const nameOfUser = blog.user ? blog.user.name : "anonymous";
  const canRemove = blog.user ? blog.user.username === storage.me() : true;
  console.log(blog.user, storage.me(), canRemove);
  const [comment, setComment] = useState("")

  const submitComment = (event)=>{
    event.preventDefault()
    handleComment(id, comment)
    setComment("")
  }

  return (
    <div className="blog">
      <h2>{blog.title} by {blog.author}</h2>
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes}
          <button style={{ marginLeft: 3 }} onClick={() => handleVote(blog)}>
            like
          </button>
        </div>
        <div>{nameOfUser}</div>
        {canRemove && (
          <button onClick={() => handleDelete(blog)}>remove</button>
        )}
      </div>
      <form onSubmit={submitComment}>
        <input
          type="text"
          value={comment}
          onChange={({target})=>setComment(target.value)}
        />
        <span><button>add comment</button></span>
      </form>
      {blog.comments.length>0 && (      
        <>
          <h3>Comments</h3>
          <ul>
            {blog.comments.map((comment,index)=><li key={index}>{comment}</li>)}
          </ul>
        </>)}
    </div>
  );
}

Blog.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        username: PropTypes.string
      })
    })
  ).isRequired,
  handleVote: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;


{/*const Blog = ({ blog, handleVote, handleDelete }) => {
  const [visible, setVisible] = useState(false);

  const nameOfUser = blog.user ? blog.user.name : "anonymous";

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  const canRemove = blog.user ? blog.user.username === storage.me() : true;

  console.log(blog.user, storage.me(), canRemove);
  return (
    <div style={style} className="blog">
      {blog.title} by {blog.author}
      <button style={{ marginLeft: 3 }} onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      {visible && (
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            likes {blog.likes}
            <button style={{ marginLeft: 3 }} onClick={() => handleVote(blog)}>
              like
            </button>
          </div>
          <div>{nameOfUser}</div>
          {canRemove && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};*/}

{/*Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object,
  }).isRequired,
  handleVote: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};*/}
