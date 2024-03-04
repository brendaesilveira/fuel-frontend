import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectsList from "./pages/ProjectsList";
import CreateProject from "./pages/CreateProject";
import ProjectDetails from "./pages/ProjectDetails";
import EditProject from "./pages/EditProject";
import { useContext } from 'react';
import { ThemeContext } from './context/theme.context';
import Signup from "./pages/Signup";
import Login from "./pages/Login"
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/projects"
          element={
          <IsPrivate>
          <ProjectsList />
          </IsPrivate>}
        />
        <Route
          path="/projects/create"
          element={
            <IsPrivate>
          <CreateProject />
          </IsPrivate>}
        />
        <Route
          path="/projects/:projectId"
          element={
          <IsPrivate>
          <ProjectDetails />
          </IsPrivate>}
        />
        <Route
          path="/projects/edit/:projectId"
          element={
          <IsPrivate>
          <EditProject />
          </IsPrivate>}
        />
        <Route
          path="/signup"
          element={
          <IsAnon>
          <Signup />
          </IsAnon>}
        />
        <Route
          path="/login"
          element={
          <IsAnon>
          <Login />
          </IsAnon>}
        />
      </Routes>
    </div>
  );
}

export default App;
