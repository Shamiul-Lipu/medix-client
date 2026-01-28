"use server";

import { userService } from "@/service/user.service";

export const getSession = async () => {
  return await userService.getSession();
};
