import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./routes/main";
import TopNavbar from "./component/topNavbar";
import Auth from "./routes/auth";

function App() {
  return (
    <div className="App">
      <div className="App-navbar">
        <TopNavbar/>
      </div>
      <header className="App-header">
        <BrowserRouter basename="/to_do_list">
          <div className="w-full overflow-hidden">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Auth pgnum={'1'} />} />
              <Route path="/signup" element={<Auth pgnum={'2'}/>} />

              {/* <Route path="/navigation" element={<Navigation />} />
              <Route path="/dashboard" element={<FDashboard />} />
              <Route path="/auth" element={<LoginSignup />} /> */}
            </Routes>
          </div>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
