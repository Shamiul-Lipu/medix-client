export type SidebarCategory = {
  id: string;
  name: string;
};

export const categoryService = {
  getCategories: async function () {
    try {
      const res = await fetch("http://localhost:5000/api/v1/category", {
        next: { tags: ["categories"] },
      });

      const data = await res.json();

      const categories: SidebarCategory[] = data.data.map(
        (c: SidebarCategory) => ({
          id: c.id,
          name: c.name,
        }),
      );

      return {
        data: [{ id: "All", name: "All Categories" }, ...categories],
        error: null,
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      return {
        data: null,
        error: { message },
      };
    }
  },
};
