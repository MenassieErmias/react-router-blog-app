import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./components/Home";
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import Missing from "./components/Missing";
import About from "./components/About";
import EditPost from "./components/EditPost";

import { Routes, Route, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';

import { format } from 'date-fns';
import api from './api/posts';


function App() {
  // CONSTANTS
  // const API_URL = "http://localhost:3500/posts"
  // STATE
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  // HOOKS
  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const filteredResults = posts.filter(post => (
      (post.body).toLowerCase().includes(search.toLowerCase()) ||
      (post.title).toLowerCase().includes(search.toLowerCase())
    ));
    setSearchResults(filteredResults.reverse())
  }, [posts, search])

  // FUNCTIONS
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList);
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {
      id: id,
      title: postTitle,
      datetime: datetime,
      body: postBody
    }
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/')
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleEdit = async(id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {
      id: id,
      title: editTitle,
      datetime: datetime,
      body: editBody
    }

    try{
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post=> post.id === id ? { ...response.data }: post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="/post/:id" element={<PostPage handleDelete={handleDelete} posts={posts} />} />
        <Route
          path="/post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          } />
        <Route 
          path="/edit/:id" 
          element={
            <EditPost 
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />
          } />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
