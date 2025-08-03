import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', formData);
      setSuccess('Password reset successfully');
      setError('');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
      setSuccess('');
    }
  };

  return (
    <div className="card">
      <h2>Reset Password</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgotPassword;