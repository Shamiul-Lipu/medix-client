import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`http://localhost:5000/api/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch session" },
        };
      }

      const session = await res.json();

      if (!session) {
        return {
          data: null,
          error: { message: "Session is missing" },
        };
      }

      return { data: session, error: null };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      return {
        data: null,
        error: { message },
      };
    }
  },
  getUser: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`http://localhost:5000/api/v1/auth/me`, {
        method: "GET",
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: {
          tags: ["user"],
        },
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Session is missing" },
        };
      }

      const data = await res.json();

      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      return {
        data: null,
        error: { message },
      };
    }
  },
};
