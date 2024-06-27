import React, { useEffect } from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Header from "./assets/Header"
import Project from "./pages/Projects"
import Footer from "./assets/Footer"
import CreatePost from "./pages/CreatePost"
import EditPost from '@/pages/EditPost'
import { useSelector } from 'react-redux';
import Post from "./pages/Post"
import ScrollToTop from "./assets/ScrollToTop"
import Search from "./pages/Search"

function App() {
  const { presentUser } = useSelector((state) => state.user);

  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/projects" element={<Project />} />
          <Route path="/dashboard" element={presentUser ? <Dashboard /> : <Navigate to="/signin" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/post/:slug" element={<Post />} />
          <Route path="/create-post" element={presentUser  ? <CreatePost /> : <Navigate to="/signin" replace />} />
          <Route path="/edit-post/:postId" element={presentUser  ? <EditPost /> : <Navigate to="/signin" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
