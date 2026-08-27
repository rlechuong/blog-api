import { useState } from "react";
import { updateUserRole } from "../api/users.js";
import { ApiError } from "../api/client.js";
import type { AdminUser, Role } from "../types/user.js";
import styles from "./UserRow.module.css";
import { formatDateShort, formatDateTime } from "../lib/formatDate.js";
import ErrorMessage from "./ErrorMessage.js";

interface UserRowProps {
  user: AdminUser;
  isCurrentUser: boolean;
  onUserUpdated: (user: AdminUser) => void;
}

const UserRow = ({ user, isCurrentUser, onUserUpdated }: UserRowProps) => {
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const handleRoleChange = async (newRole: Role) => {
    if (isCurrentUser) return;
    if (!window.confirm(`Change ${user.name}'s role to ${newRole}?`)) return;

    setError(null);
    setUpdating(true);

    try {
      const result = await updateUserRole(user.id, newRole);
      onUserUpdated(result);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <tr>
        <td className={styles.userCell}>
          {user.name}
          {isCurrentUser && <span className={styles.youBadge}> (You)</span>}
        </td>
        <td className={styles.emailCell}>{user.email}</td>
        <td>
          <select
            value={user.role}
            onChange={(e) => handleRoleChange(e.target.value as Role)}
            disabled={isCurrentUser || updating}
            title={isCurrentUser ? "You cannot change your own role." : undefined}
            className={styles.roleSelect}
          >
            <option value="USER">User</option>
            <option value="AUTHOR">Author</option>
            <option value="ADMIN">Admin</option>
          </select>
        </td>
        <td>
          <time dateTime={user.createdAt} title={formatDateTime(user.createdAt)}>
            {formatDateShort(user.createdAt)}
          </time>
        </td>
      </tr>
      {error && (
        <tr>
          <td colSpan={4}>
            <ErrorMessage message={error} />
          </td>
        </tr>
      )}
    </>
  );
};

export default UserRow;
