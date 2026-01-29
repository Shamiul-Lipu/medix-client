export const UserRoles = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  SELLER: "SELLER",
};

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export type SessionData = {
  session: {
    id: string;
    userId: string;
    expiresAt: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    image: string | null;
  };
};
