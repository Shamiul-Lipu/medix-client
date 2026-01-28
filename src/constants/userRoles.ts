export const UserRoles = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  SELLER: "SELLER",
};

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];
