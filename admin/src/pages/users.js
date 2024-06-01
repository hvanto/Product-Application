import React, { useState, useContext, useEffect } from "react";
import MessageContext from "../contexts/AdminContext.js";
import { getUsers, blockUnblockUser } from "../data/repository.js";

export default function Users() {
  const { setMessage } = useContext(MessageContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (err) {
        console.error("Error loading users:", err);
        setError(err);
      }
    }
    loadUsers();
  }, []);

  const handleBlockUnblock = async (userId, block) => {
    try {
      await blockUnblockUser(userId, block);
      setMessage(<>User with <strong>ID {userId}</strong> has been {block ? "blocked" : "unblocked"}.</>);

      // Update user state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, blocked: block } : user
      ));
    } catch (err) {
      console.error("Error blocking/unblocking user:", err);
      setMessage(<span className="text-danger">Error blocking/unblocking user</span>);
    }
  };

  // Enhanced error handling to inspect and log the error object
  if (error) {
    console.error('Error details:', error);
    const errorMessage = error.message || 'An unknown error occurred';
    return <p>Error loading users: {errorMessage}</p>;
  }

  return (
    <div>
      <h1>Users</h1>
      <div>
        {users.length === 0 ?
          <span className="text-muted">No users found.</span>
          :
          users.map((user) =>
            <div key={user.id} className="border my-3 p-3">
              <p>{user.username}</p>
              <p>Status: {user.blocked ? "Blocked" : "Active"}</p>
              <button
                className={`btn ${user.blocked ? "btn-success" : "btn-danger"}`}
                onClick={() => handleBlockUnblock(user.id, !user.blocked)}
              >
                {user.blocked ? "Unblock" : "Block"}
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
}
