import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import BackgroundAnimation from './components/BackgroundAnimation.jsx';
import Landing from './pages/Landing.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import PermissionRequest from './pages/PermissionRequest.jsx';
import SearchStudents from './pages/SearchStudents.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <div className="container">
      <BackgroundAnimation />
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login/:role" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/permissions/request"
            element={
              <ProtectedRoute role="student">
                <PermissionRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/search"
            element={
              <ProtectedRoute role="hod">
                <SearchStudents />
              </ProtectedRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;