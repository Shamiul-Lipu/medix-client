import { GetMedicinesParams, ServiceOptions } from "@/constants/medicine";

export const medicineService = {
  getMedicines: async function (
    params?: GetMedicinesParams,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL("http://localhost:5000/api/v1/medicine");

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) config.cache = options.cache;
      if (options?.revalidate) config.next = { revalidate: options.revalidate };
      config.next = { ...config.next, tags: ["medicines"] };

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return { data, error: null };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      return {
        data: null,
        error: { message },
      };
    }
  },

  getMedicineById: async function (id: string) {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/medicine/${id}`);
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      return {
        data: null,
        error: { message },
      };
    }
  },
};
