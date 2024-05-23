import { z, ZodType } from "zod";

export type AllergyRecord = {
  name: string;
  reason: string;
  category: string;
  type: string;
  clinical_status: string;
  recorded_date: string;
  allergy_notes: string;
  patient_id: string;
  participant_id: string;
  allergy_id: string;
};

export const AllergyRecordSchema: ZodType<AllergyRecord> = z
  .object({
    name: z
      .string({
        message: "El nombre es requerido",
      })
      .min(1, {
        message: "El nombre es requerido",
      }),
    reason: z
      .string({
        message: "La razón es requerida",
      })
      .min(1, {
        message: "La razón es requerida",
      }),
    category: z
      .string({
        message: "La categoría es requerida",
      })
      .min(1, {
        message: "La categoría es requerida",
      }),
    type: z
      .string({
        message: "El tipo es requerido",
      })
      .min(1, {
        message: "El tipo es requerido",
      }),
    clinical_status: z
      .string({
        message: "El estado clínico es requerido",
      })
      .min(1, {
        message: "El estado clínico es requerido",
      }),
    recorded_date: z
      .string({
        message: "La fecha de registro es requerida",
      })
      .min(1, {
        message: "La fecha de registro es requerida",
      }),
    allergy_notes: z
      .string({
        message: "La nota es requerida",
      })
      .min(1, {
        message: "La nota es requerida",
      }),
    patient_id: z.string(),
    participant_id: z.string(),
    allergy_id: z.string(),
  })
  .required();