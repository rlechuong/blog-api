import CommentItem from "./CommentItem.js";
import EmptyMessage from "./EmptyMessage.js";
import type { Comment } from "../types/comment.js";
import type { Role } from "../types/user.js";
import styles from "./CommentList.module.css";

interface CommentListProps {
  comments: Comment[];
  currentUserId?: number;
  currentUserRole?: Role;
  postAuthorId: number | null;
  onCommentUpdated: (comment: Comment) => void;
  onCommentDeleted: (id: number) => void;
}

const CommentList = ({
  comments,
  currentUserId,
  currentUserRole,
  postAuthorId,
  onCommentUpdated,
  onCommentDeleted,
}: CommentListProps) => {
  if (comments.length === 0) {
    return <EmptyMessage message="No comments yet." />;
  }

  return (
    <ul className={styles.list}>
      {comments.map((comment) => {
        const canEdit = currentUserId === comment.userId;
        const canDelete = canEdit || currentUserId === postAuthorId || currentUserRole === "ADMIN";
        return (
          <CommentItem
            key={comment.id}
            comment={comment}
            canEdit={canEdit}
            canDelete={canDelete}
            onCommentUpdated={onCommentUpdated}
            onCommentDeleted={onCommentDeleted}
          />
        );
      })}
    </ul>
  );
};

export default CommentList;
