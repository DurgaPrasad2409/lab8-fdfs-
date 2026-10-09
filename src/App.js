import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#20232a', color: '#61dafb' }}>
      <h2 style={{ margin: 0 }}>Student Portal</h2>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
            <Link to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
            <button onClick={() => setIsAuthenticated(false)} style={{ padding: '6px 12px', background: '#e63946', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}

function Login({ setIsAuthenticated }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!user || !pass) {
      setError('Please fill in both fields.');
      return;
    }
    setIsAuthenticated(true);
  };

  return (
    <div style={{ maxWidth: '350px', margin: '60px auto', padding: '25px', background: '#282c34', color: '#fff', borderRadius: '8px', textAlign: 'center' }}>
      <h2>Student Login</h2>
      {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
        <input type="text" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #555' }} />
        <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #555' }} />
        <button type="submit" style={{ padding: '10px', background: '#61dafb', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px', color: '#333' }}>
      <h2>Academic Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '20px' }}>
        <div style={{ padding: '20px', background: '#f0f4f8', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Courses</h3><p style={{ fontSize: '24px', fontWeight: 'bold' }}>5</p>
        </div>
        <div style={{ padding: '20px', background: '#f0f4f8', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Attendance</h3><p style={{ fontSize: '24px', fontWeight: 'bold', color: 'green' }}>94%</p>
        </div>
        <div style={{ padding: '20px', background: '#f0f4f8', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Lab Modules</h3><p style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>Lab 8</p>
        </div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Student Profile</h2>
      <p><strong>Status:</strong> Enrolled</p>
      <p><strong>Program:</strong> Front End Development Frameworks</p>
      <p><strong>Module:</strong> Lab - 8 (React Router & Modules)</p>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}