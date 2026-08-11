const API_URL = import.meta.env.VITE_API_URL;

class ApiError extends Error {
  status: number;
  errors?: { msg: string; path?: string }[];

  constructor(message: string, status: number, errors?: { msg: string; path?: string }[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

const apiFetch = async (path: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (response.status === 204) {
    return null;
  }

  let data;

  try {
    data = await response.json();
  } catch {
    throw new ApiError("Unable to parse server response.", response.status);
  }

  if (!response.ok) {
    if (Array.isArray(data.errors)) {
      throw new ApiError(data.errors[0]?.msg ?? "Validation failed.", response.status, data.errors);
    }
    throw new ApiError(data.error ?? "Something went wrong.", response.status);
  }

  return data;
};

export { ApiError, apiFetch };
