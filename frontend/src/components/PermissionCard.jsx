import { useState } from 'react';

function PermissionCard({ permission, onUpdateStatus }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (status) => {
    onUpdateStatus(permission._id, status);
    setIsEditing(false);
  };

  return (
    <div className="permission-card">
      {onUpdateStatus && (
        <div className="buttons" style={{ marginBottom: '0.5rem' }}>
          {isEditing || permission.status === 'pending' ? (
            <>
              <button
                className="approve"
                onClick={() => handleUpdate('approved')}
              >
                Approve
              </button>
              <button
                className="reject"
                onClick={() => handleUpdate('rejected')}
              >
                Reject
              </button>
            </>
          ) : (
            <button
              className="approve"
              onClick={handleEdit}
            >
              Edit Status
            </button>
          )}
        </div>
      )}
      <h3>{permission.title}</h3>
      <p>Description: {permission.description}</p>
      <p>Date: {new Date(permission.date).toLocaleDateString()}</p>
      <p>Status: {permission.status}</p>
      {permission.student && (
        <p>
          Student: {permission.student.fullName} ({permission.student.rollNumber})
        </p>
      )}
    </div>
  );
}

export default PermissionCard;