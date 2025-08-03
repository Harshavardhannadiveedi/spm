import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PermissionCard from '../components/PermissionCard.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

function Home() {
  const { user } = useContext(AuthContext);
  const [permissions, setPermissions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      const fetchPermissions = async () => {
        try {
          const url =
            user.role === 'hod'
              ? 'https://spm-1-mvbj.onrender.com/api/permissions'
              : 'https://spm-1-mvbj.onrender.com/api/permissions/my-permissions';
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setPermissions(response.data);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch permissions');
        }
      };
      fetchPermissions();
    }
  }, [user]);

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `https://spm-1-mvbj.onrender.com/api/permissions/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setPermissions(
        permissions.map((p) => (p._id === id ? response.data : p))
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update permission');
    }
  };

  return (
    <div className="text-center">
      {user ? (
        <>
          <h1>Welcome back, {user.role === 'student' ? user.fullName : user.email}!</h1>
          {user.role === 'student' && (
            <Link to="/permissions/request" className="create-permission">
              <svg viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" />
              </svg>
              Create Permission
            </Link>
          )}
          {user.role === 'hod' && (
            <Link to="/users/search" className="create-permission">
              <svg viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" />
              </svg>
              Search Students
            </Link>
          )}
          <h2>{user.role === 'hod' ? 'All Permissions' : 'Your Permissions'}</h2>
          {error && <p className="error">{error}</p>}
          {permissions.length === 0 ? (
            <p>No permissions found.</p>
          ) : (
            <div className="grid gap-4">
              {permissions.map((permission) => (
                <PermissionCard
                  key={permission._id}
                  permission={permission}
                  onUpdateStatus={user.role === 'hod' ? handleUpdateStatus : null}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <p>Please select a login option.</p>
      )}
    </div>
  );
}

export default Home;
