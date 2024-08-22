import { useState, useEffect, createRef } from "react";
import {useQuery, useMutation, useQueryClient,  QueryClient} from '@tanstack/react-query'
import { Link } from "react-router-dom";
import styled from 'styled-components'
import blogService from "./services/blogs";
import loginService from "./services/login";
import storage from "./services/storage";
import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users"
import { useNotificationValue, useNotify } from "./NotificationContext";
import {useUserValue, useUserDispatch} from "./UserContext"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDetail from "./components/UserDetail";

const Nav = styled.div`
  background: BurlyWood;
  padding: 1em;
`
const Button = styled.button`
  background: darkgrey;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`
const App = () => {
  const user = useUserValue()
  const dispatch = useUserDispatch()
  const blogFormRef = createRef();
  const notification = useNotificationValue()
  const notify = useNotify()
  const queryClient = useQueryClient()

  const blogResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })
  const blogs = blogResult.data

  const newBlogMutation = useMutation({
    mutationFn: (blog) => blogService.create(blog),
    onSuccess: (newBlog)=>{
      queryClient.invalidateQueries({queryKey: ['blogs']})
      notify({ message: `Blog created: ${newBlog.title}, ${newBlog.author}`, type: "success" });
    }
  })

  const handleCreate = async (blog) => {
    newBlogMutation.mutate(blog)
    blogFormRef.current.toggleVisibility();
  };

  const voteMutation = useMutation({
    mutationFn: (updatedBlog) => blogService.update(updatedBlog.id, updatedBlog),
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries(['blogs']);
      notify({message:`You liked ${updatedBlog.title} by ${updatedBlog.author}`, type: "success"});
    },
    onError: (error) => {
      notify({ message: `Error: ${error.message}`, type: "error" });
    }
  });

  const handleVote = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    voteMutation.mutate(updatedBlog);
  };

  const commentMutation = useMutation({
    mutationFn: ({id, comment}) => blogService.addComment(id, comment),
    onSuccess: (updatedBlog) =>{
      queryClient.invalidateQueries(["blogs"])
    }
  })

  const handleComment = (id, comment)=>{
    commentMutation.mutate({id, comment})
  }

  const deleteBlogMutation = useMutation({
    mutationFn: (blog) => blogService.remove(blog.id),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['blogs']);
      const blog = variables;
      notify({ message: `Blog ${blog.title}, by ${blog.author} removed`, type: 'success' });
    }
  });

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog)
    }
  };


  useEffect(() => {
    dispatch({type:'LOAD_USER'})
  }, [dispatch]);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      dispatch({type:'LOGIN', payload:user})
      storage.saveUser(user);
      notify({message:`Welcome back, ${user.name}`,type: 'success' });
    } catch (error) {
      notify({message:"Wrong credentials", type:"error"});
    }
  };

  const handleLogout = () => {
    dispatch({type:"LOGOUT"})
    storage.removeUser();
    notify({message:`Bye, ${user.name}!`,type:'success'});
  };

  if(blogResult.isLoading){
    return <div>Loading data...</div>
  }
  if(blogResult.isError){
    return(
      <div>
        Blogs are not available due to issues
      </div>
    )
  }

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <Router>
        <Nav style={{backgroundColor: "lightgray" }}>
          <span><Link>Blogs</Link></span>
          <span style={{ marginLeft: 10}}><Link>Users</Link></span>
          <Notification notification={notification} />
          <span style={{ marginLeft: 10 }}>
            {user.name} logged in
            <Button onClick={handleLogout} style={{ marginLeft: 3 }}>logout</Button>
          </span>
        </Nav>
      <Routes>
        <Route path="/" element={
          <div>
            <Users blogs={blogs}/>
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <NewBlog doCreate={handleCreate} />
            </Togglable>

            {blogs.sort(byLikes).map(blog=> (
              <div key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  {`${blog.title} by ${blog.author}`}
                </Link>
              </div>
            ))}
          </div>}
        />
        
        <Route path="/users/:id" element={<UserDetail blogs={blogs} />} />
        <Route path="/blogs/:id" element={<Blog blogs={blogs} handleVote={handleVote} handleDelete={handleDelete} handleComment={handleComment} />} />
      </Routes>
    </Router>
  );
};

export default App;
