import { apiFetch } from "./client.js";

const deleteComment = async (id: number): Promise<null> => {
  return apiFetch(`/api/comments/${id}`, {
    method: "DELETE",
  });
};

export { deleteComment };
