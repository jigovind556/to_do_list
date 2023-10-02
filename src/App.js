import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./routes/main";
import TopNavbar from "./component/topNavbar";
import Auth from "./routes/auth";
import { useEffect, useState } from "react";
import {
  login,
  signup,
  isAuthenticated,
  logout,
} from "./component/Authentication/authfunctions.js"; // Import the auth functions

function App() {
  const [islogged, setisloggedin] = useState(isAuthenticated()); // Initialize the user authentication state

  useEffect(() => {
    // Check if the user is already authenticated, and if so, redirect to the dashboard
    isAuthenticated(setisloggedin);
  }, []);
  // Function to handle user login
  const handleLogin = (email, password) => {
    // Perform login logic, e.g., call the login function from authFunctions.js
    login(email, password);
    setisloggedin(true);
  };

  // Function to handle user signup
  const handleSignup = (name, email, password) => {
    // Perform signup logic, e.g., call the signup function from authFunctions.js
    signup(name, email, password);
    setisloggedin(true);
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Perform logout logic, e.g., call the logout function from authFunctions.js
    logout();
    setisloggedin(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter basename="/to_do_list">
          <div className="App-navbar">
            {/* Pass the login, signup, and logout functions as props */}
            <TopNavbar
              islogged={islogged}
              handleLogin={handleLogin}
              handleSignup={handleSignup}
              handleLogout={handleLogout}
            />
          </div>
          <div className="w-full overflow-hidden">
            <Routes>
              <Route path="/" element={<Main />} />
              {/* Use ProtectedRoute to protect the dashboard route */}
              {/* <ProtectedRoute
                path="/dashboard"
                element={<Dashboard />}
              /> */}
              <Route
                path="/login"
                element={
                  <Auth pgnum={"1"} handleLogin={handleLogin} />
                }
              />
              <Route
                path="/signup"
                element={
                  <Auth pgnum={"2"} handleSignup={handleSignup} />
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
