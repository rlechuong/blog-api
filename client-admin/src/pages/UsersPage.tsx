import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth.js";
import { getUsers } from "../api/users.js";
import LoadingMessage from "../components/LoadingMessage.js";
import ErrorMessage from "../components/ErrorMessage.js";
import EmptyMessage from "../components/EmptyMessage.js";
import UserRow from "../components/UserRow.js";
import { ApiError } from "../api/client.js";
import type { AdminUser } from "../types/user.js";
import tableStyles from "../styles/table.module.css";
import styles from "./UsersPage.module.css";

const UsersPage = () => {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserUpdated = (updatedUser: AdminUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
  };

  if (loading) return <LoadingMessage message="Loading Users..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!users.length) return <EmptyMessage message="No users available." />;

  return (
    <div>
      <h1 className={styles.pageTitle}>Users</h1>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Member Since</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              isCurrentUser={currentUser?.id === user.id}
              onUserUpdated={handleUserUpdated}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
