import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import CreateForm from './components/CreateForm';
import Togglable from './components/Togglable';

const Error = ({ error }) => {
  if (error === null) return null;

  return <div className="error">{error}</div>;
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setErrorMessage] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const blog = await blogService.create({
      title,
      author,
      url,
    });
    try {
      setTitle('');
      setAuthor('');
      setURL('');
      setBlogs(blogs.concat(blog));
    } catch (exception) {
      setErrorMessage('There was an error');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogForm = () => (
    <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
      <CreateForm
        handleNewBlog={handleNewBlog}
        title={title}
        author={author}
        url={url}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setURL={setURL}
      />
    </Togglable>
  );

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <span>{user.username} is logged in</span>
      <button
        onClick={() => {
          handleLogout();
        }}
      >
        logout
      </button>
      <p></p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <Error error={error} />
      {user === null && loginForm()}
      {user !== null && blogList()}
      {user !== null && blogForm()}
    </div>
  );
};

export default App;
