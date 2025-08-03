import { useState } from 'react';
import axios from 'axios';
import PermissionCard from '../components/PermissionCard.jsx';

function SearchStudents() {
  const [query, setQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://spm-1-mvbj.onrender.com/api/users/search?query=${query}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setStudents(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search students');
      setStudents([]);
    }
  };

  return (
    <div className="card">
      <h2>Search Students</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSearch}>
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or roll number"
          />
          <button type="submit">Search</button>
        </div>
      </form>
      {students.length > 0 && (
        <div className="grid gap-4">
          {students.map((student) => (
            <div key={student._id} className="permission-card">
              <p><strong>{student.fullName}</strong></p>
              <p>Roll Number: {student.rollNumber}</p>
              <p>Email: {student.email}</p>
              {student.permissions.length > 0 ? (
                <div>
                  <h3>Permissions</h3>
                  {student.permissions.map((permission) => (
                    <PermissionCard
                      key={permission._id}
                      permission={permission}
                      onUpdateStatus={(id, status) =>
                        axios.put(
                          `https://spm-1-mvbj.onrender.com/api/permissions/${id}`,
                          { status },
                          {
                            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                          }
                        ).then((response) => {
                          setStudents(
                            students.map((s) =>
                              s._id === student._id
                                ? {
                                    ...s,
                                    permissions: s.permissions.map((p) =>
                                      p._id === id ? response.data : p
                                    ),
                                  }
                                : s
                            )
                          );
                        })
                      }
                    />
                  ))}
                </div>
              ) : (
                <p>No permissions found for this student.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchStudents;
