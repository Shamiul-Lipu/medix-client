import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // baseURL: "https://medix-server.vercel.app",
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  fetchOptions: {
    credentials: "include",
  },
});

// export const authClient = createAuthClient({
//   baseURL: typeof window !== "undefined" ? window.location.origin : "",
//   fetchOptions: {
//     credentials: "include",
//   },
// });
