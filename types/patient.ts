import { z, ZodType } from "zod";

export type Address = {
  type_address: string;
  address_line: string;
  province: string;
  district: string;
  department: string;
  postal_code: string;
};

export type Patient = {
  patient_id?: string;
  name_id: string;
  gender: string;
  birthDate: string;
  maritalStatus: string;
  telephone: string;
  address: Address;
};

export const PatientSchema: ZodType<Patient> = z
  .object({
    name_id: z
      .string({
        message: "El nombre es requerido",
      })
      .min(1, {
        message: "El nombre es requerido",
      })
      .regex(/^[a-zA-Z\s]*$/, {
        message: "El nombre solo puede contener letras",
      }),
    gender: z
      .string({
        message: "El género es requerido",
      })
      .min(1, {
        message: "El género es requerido",
      }),
    birthDate: z
      .string({
        message: "La fecha de nacimiento es requerida",
      })
      .min(1, {
        message: "La fecha de nacimiento es requerida",
      }),
    maritalStatus: z
      .string({
        message: "El estado civil es requerido",
      })
      .min(1, {
        message: "El estado civil es requerido",
      }),
    telephone: z
      .string({
        message: "El número de teléfono es requerido",
        invalid_type_error: "El número de teléfono debe ser un número",
      })
      .min(9, {
        message: "El número de teléfono debe tener 9 dígitos",
      })
      .max(9, {
        message: "El número de teléfono debe tener 9 dígitos",
      })
      .regex(/^9\d{8}$/, {
        message: "No debe incluir letras ni caracteres especiales.",
      }),
    address: z.object({
      type_address: z
        .string({
          message: "El tipo de dirección es requerido",
        })
        .min(1, {
          message: "El tipo de dirección es requerido",
        }),
      address_line: z
        .string({
          required_error: "La dirección es requerida",
        })
        .min(1, {
          message: "La dirección es requerida",
        }),
      province: z
        .string({
          message: "La provincia es requerida",
        })
        .min(1, {
          message: "La provincia es requerida",
        }),
      district: z
        .string({
          message: "El distrito es requerido",
        })
        .min(1, {
          message: "El distrito es requerido",
        }),
      department: z
        .string({
          message: "El departamento es requerido",
        })
        .min(1, {
          message: "El departamento es requerido",
        }),
      postal_code: z
        .string({
          message: "El código postal es requerido",
          invalid_type_error: "El código postal debe ser un número",
        })
        .min(5, {
          message: "El código postal debe tener mínimo 5 dígitos",
        })
        .max(5, {
          message: "El código postal debe tener máximo 5 dígitos",
        })
        .regex(/^\d{5}$/, {
          message: "No debe incluir letras ni caracteres especiales.",
        }),
    }),
  })
  .required();
