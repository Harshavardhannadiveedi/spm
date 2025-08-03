import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="card">
        <h2>Welcome</h2>
        <button onClick={() => navigate('/login/student')}>Student Login</button>
        <button onClick={() => navigate('/login/hod')}>HOD Login</button>
      </div>
    </div>
  );
}

export default Landing;