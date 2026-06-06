export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // AUTO LOGOUT
  if (response.status === 401) {
    localStorage.clear();

    window.location.href = "/login";

    throw new Error("Session expired");
  }

  return response;
};
