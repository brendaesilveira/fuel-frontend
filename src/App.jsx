import { Routes, Route } from "react-router-dom";

// Styles
import "../src/styles/App.css";
import "../src/styles/homepage.css";
import "../src/styles/login-page.css";
import "../src/styles/mainpage.css";
import "../src/styles/signup.css";
import "../src/styles/setup.css";
import "../src/styles/connect-page.css";
import "../src/styles/profile.css";

// Components
import Match from './components/Match'
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import IsSetupIncompleted from "./components/IsSetupIncompleted";
import Settings from './components/Settings';
import Loading from './components/Loading';

// Pages
import Home from "./pages/Home";
import Connect from './pages/Connect'
import Signup from "./pages/Signup";
import Login from "./pages/Login"
import Main from './pages/Main'
import Setup from './pages/Setup'
import Profile from './pages/Profile'

// Context
import { useContext } from 'react';
import { SettingsContext } from './context/settings.context';


function App() {

  const { showSettings } = useContext(SettingsContext);

  return (
    <div>

      <Routes>
        <Route
          path="/"
          element={<Main />}
        />
        <Route
          path="/connect"
          element={
          <IsPrivate>
          <Connect />
          </IsPrivate>}
        />
        <Route
          path="/home"
          element={
            <IsSetupIncompleted>
          <Home />
          </IsSetupIncompleted>}
        />
        <Route
          path="/profile/:userId"
          element={
          <IsPrivate>
          <Profile />
          </IsPrivate>}
        />
        <Route
          path="/setup"
          element={
          <IsPrivate>
          <Setup />
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
