import { useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

function Login() {
  const [formData, setFormData] = useState({
    emailOrRollNumber: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const { role } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.emailOrRollNumber, formData.password);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="card">
      <h2>{role === 'student' ? 'Student Login' : 'HOD Login'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>{role === 'student' ? 'Email or Roll Number' : 'Email'}</label>
          <input
            type="text"
            name="emailOrRollNumber"
            value={formData.emailOrRollNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
        {role === 'student' && (
          <>
            {' | '}
            <Link to="/register">Register</Link>
          </>
        )}
      </p>
    </div>
  );
}

export default Login;