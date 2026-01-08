import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import ReportError from "./pages/ReportError";
import Login from "./pages/Login";
import "./index.css";

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("page-enter-active");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("page-exit-active");
      setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage("page-enter-active");
      }, 200);
    }
  }, [location, displayLocation]);

  return (
    <div className={transitionStage}>
      <Routes location={displayLocation}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/report-error" element={<ReportError />} />
      </Routes>
    </div>
  );
}

import Sidebar from "./components/Sidebar";

function ProtectedApp() {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  if (!isAuthenticated) {
    return <Login />;
  }
  
  return (
    <>
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`app-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <AnimatedRoutes />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProtectedApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
