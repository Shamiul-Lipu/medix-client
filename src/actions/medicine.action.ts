"use server";

import { updateTag } from "next/cache";
import {
  GetMedicinesParams,
  Medicine,
  medicineService,
} from "@/service/medicine.service";

export const getMedicines = async (params: GetMedicinesParams = {}) => {
  const res = await medicineService.getMedicines(params);
  return res;
};

export const getMedicineById = async (id: string) => {
  const res = await medicineService.getMedicineById(id);
  return res;
};

export const createMedicine = async (payload: Partial<Medicine>) => {
  const res = await medicineService.createMedicine(payload);
  updateTag("medicines");

  return res;
};

export const updateMedicine = async (
  id: string,
  payload: Partial<Medicine>,
) => {
  const res = await medicineService.updateMedicine(id, payload);
  updateTag("medicines");

  return res;
};

export const deleteMedicine = async (id: string) => {
  const res = await medicineService.deleteMedicine(id);
  updateTag("medicines");

  return res;
};
