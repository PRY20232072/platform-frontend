import { z, ZodType } from "zod";

export type FamilyRecord = {
  name: string;
  patient_id: string;
  participant_id: string;
  reason: string;
  clinical_status: string;
  onset_date?: string;
  recorded_date: string;
  notes: string;
};

export const FamilyRecordSchema: ZodType<FamilyRecord> = z
  .object({
    name: z
      .string({
        message: "El nombre es requerido",
      })
      .min(1, {
        message: "El nombre es requerido",
      })
      .regex(/^[a-zA-Z\s]*$/, {
        message: "El nombre solo puede contener letras",
      }),
    reason: z
      .string({
        message: "La razón es requerida",
      })
      .min(1, {
        message: "La razón es requerida",
      }),
    clinical_status: z
      .string({
        message: "El estado clínico es requerido",
      })
      .min(1, {
        message: "El estado clínico es requerido",
      }),
    onset_date: z.string().optional(),
    recorded_date: z
      .string({
        message: "La fecha de registro es requerida",
      })
      .min(1, {
        message: "La fecha de registro es requerida",
      }),
    notes: z
      .string({
        message: "La nota es requerida",
      })
      .min(1, {
        message: "La nota es requerida",
      }),
    patient_id: z.string(),
    participant_id: z.string(),
  })
  .required();