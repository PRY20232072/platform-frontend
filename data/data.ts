import { ChipProps } from "@nextui-org/react";

const civilStatus = [
  { label: "SOLTERO", value: "SINGLE" },
  { label: "CASADO", value: "MARRIED" },
  { label: "DIVORCIADO", value: "DIVORCED" },
  { label: "VIUDO", value: "WIDOWED" },
  { label: "OTRO", value: "OTHER" },
];
const genders = [
  { label: "HOMBRE", value: "MALE" },
  { label: "MUJER", value: "FEMALE" },
  { label: "OTRO", value: "OTHER" },
];

const addressTypes = [
  { label: "POSTAL", value: "POSTAL" },
  { label: "FISICA", value: "PHYSICAL" },
  { label: "AMBOS", value: "BOTH" },
];

const allergyStatus = [
  { label: "ACTIVO", value: "ACTIVE" },
  { label: "INACTIVO", value: "INACTIVE" },
  { label: "RESUELTO", value: "RESOLVED" },
];

const allergyTypes = [
  { label: "LÁCTEOS", value: "DAIRY" },
  { label: "GLUTEN", value: "GLUTEN" },
  { label: "CAFEÍNA", value: "CAFFEINE" },
  { label: "SALICILATOS", value: "SALICYLATES" },
  { label: "AMINAS", value: "AMINES" },
  { label: "OTRO", value: "OTHER" },
];

const allergyCategories = [
  { label: "COMIDA", value: "FOOD" },
  { label: "MEDICAMENTO", value: "MEDICATION" },
  { label: "AMBIENTE", value: "ENVIRONMENT" },
  { label: "BIOLÓGICO", value: "BIOLOGIC" },
];

const familyRecordStatus = [
  { label: "PARCIAL", value: "PARTIAL" },
  { label: "COMPLETO", value: "COMPLETE" },
  { label: "SALUD DESCONOCIDA", value: "UNKNOWN" },
];

const attentionTableColumns = [
  { name: "ID", uid: "attention_id", sortable: true },
  { name: "FECHA DE REGISTRO", uid: "recorded_date", sortable: true },
  { name: "TIPO DE ATENCIÓN", uid: "typeOfAttention", sortable: true },
  {
    name: "NOMBRE DEL PROFESIONAL DE LA SALUD",
    uid: "practitioner_name",
    sortable: true,
  },
  { name: "ACCIÓN", uid: "actions" },
];

const typeOfService = [
  { label: "NUEVO", value: "NEW" },
  { label: "CONTINUADOR", value: "CONTINUATOR" },
  { label: "REINGRESO", value: "REENTRY" },
];

const typeOfFacility = [
  { label: "NUEVO", value: "NEW" },
  { label: "CONTINUADOR", value: "CONTINUATOR" },
  { label: "REINGRESO", value: "REENTRY" },
];

const typeOfAttention = [
  { label: "PRESENCIAL", value: "IN_PERSON" },
  { label: "TELEMEDICINA", value: "TELEMEDICINE" },
];

const typeOfConsultation = [
  { label: "PRIMERA VEZ", value: "FIRST_TIME" },
  { label: "CONTROL", value: "FOLLOW_UP" },
  { label: "OTRO", value: "OTHER" },
];

const timeOfDiseasePeriod = [
  { label: "DIAS", value: "DAYS" },
  { label: "SEMANAS", value: "WEEKS" },
  { label: "MESES", value: "MONTHS" },
  { label: "AÑOS", value: "YEARS" },
];

const typeOfDiagnosis = [
  { label: "HIPÓTESIS", value: "HYPOTHESIS" },
  { label: "CONFIRMADO", value: "CONFIRMED" },
];

const allergyTableColumns = [
  { name: "ID", uid: "allergy_id", sortable: true },
  { name: "DETALLE", uid: "allergy_notes", sortable: true },
  { name: "TIPO", uid: "type", sortable: true },
  { name: "CREADO POR", uid: "participant_id", sortable: true },
  { name: "FECHA DE CREACIÓN", uid: "recorded_date", sortable: true },
  { name: "ESTADO", uid: "clinical_status", sortable: true },
  { name: "ACCIÓN", uid: "actions" },
];

const accessTableColumns = [
  {
    name: "ID DEL PROFESIONAL DE LA SALUD",
    uid: "practitioner_id",
    sortable: true,
  },
  {
    name: "NOMBRE DEL PROFESIONAL DE LA SALUD",
    uid: "practitioner_name",
    sortable: true,
  },
  { name: "ACCIÓN", uid: "actions" },
];

const familyRecordTableColumns = [
  { name: "ID", uid: "familyHistory_id", sortable: true },
  { name: "DETALLE", uid: "notes", sortable: true },
  { name: "CREADO POR", uid: "participant_id", sortable: true },
  { name: "FECHA DE CREACIÓN", uid: "recorded_date", sortable: true },
  { name: "ESTADO", uid: "clinical_status", sortable: true },
  { name: "ACCIÓN", uid: "actions" },
];

const practitionersTableColumns = [
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "ID", uid: "id", sortable: true },
  { name: "EMAIL", uid: "email", sortable: true },
  { name: "NÚMERO DE TELÉFONO", uid: "phone_number" },
  { name: "ACCIÓN", uid: "actions" },
];

const patientsTableColumns = [
  { name: "NOMBRE", uid: "name_id", sortable: true },
  { name: "ID", uid: "patient_id", sortable: true },
  // { name: 'EMAIL', uid: 'email', sortable: true },
  { name: "NÚMERO DE TELÉFONO", uid: "telephone" },
  { name: "ACCESO", uid: "actions" },
];

const healthRecordsTableColumns = [
  { name: "DETALLE", uid: "detail", sortable: true },
  // { name: 'PACIENTE', uid: 'patient_name', sortable: true },
  // { name: 'CREADO POR', uid: 'created_by', sortable: true },
  { name: "ID DEL REGISTRO", uid: "id", sortable: true },
  { name: "FECHA DE CREACIÓN", uid: "recorded_date", sortable: true },
  { name: "TIPO DE REGISTRO", uid: "register_type", sortable: true },
  { name: "ACCIÓN", uid: "actions" },
];

const practitionerTableColumns = [
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "ID", uid: "practitioner_id", sortable: true },
  { name: "EMAIL", uid: "email", sortable: true },
  { name: "NÚMERO DE TELÉFONO", uid: "phone_number" },
];

const accessRequestTableColumns = [
  {
    name: "ID DEL PROFESIONAL DE LA SALUD",
    uid: "practitioner_id",
    sortable: true,
  },
  {
    name: "NOMBRE DEL PROFESIONAL DE LA SALUD",
    uid: "practitioner_name",
    sortable: true,
  },
  { name: "ACCIÓN", uid: "actions" },
];

const platformaPatientEventsTableColumns = [
  {
    name: "ID DE REGISTRO",
    uid: "register_id",
    sortable: true,
  },
  {
    name: "TIPO DE REGISTRO",
    uid: "register_type",
  },
  {
    name: "NOMBRE DEL PROFESIONAL DE LA SALUD",
    uid: "practitioner_name",
    sortable: true,
  },
  {
    name: "EVENTO",
    uid: "type",
  },
  {
    name: "FECHA",
    uid: "created_at",
    sortable: true,
  },
  {
    name: "ACCIÓN",
    uid: "actions",
  },
];

const platformaPractitionerEventsTableColumns = [
  {
    name: "NOMBRE DEL PACIENTE",
    uid: "patient_name",
    sortable: true,
  },
  {
    name: "MENSAJE",
    uid: "message",
  },
  {
    name: "FECHA",
    uid: "created_at",
    sortable: true,
  },
  {
    name: "ACCIÓN",
    uid: "actions",
  },
];

const selectedPatientAllergiesTableColumns = [
  { name: "ID", uid: "allergy_id", sortable: true },
  { name: "DETALLE", uid: "allergy_notes", sortable: true },
  { name: "TIPO", uid: "type", sortable: true },
  { name: "FECHA DE CREACIÓN", uid: "recorded_date", sortable: true },
  { name: "ESTADO", uid: "clinical_status", sortable: true },
  { name: "ACCIÓN", uid: "actions" },
];

const documentsTableColumns = [
  { name: "NOMBRE", uid: "file_name", sortable: true },
  { name: "FORMATO", uid: "file_type", sortable: true },
  { name: "CREADO POR", uid: "practitioner_name", sortable: true },
  { name: "FECHA DE CREACIÓN", uid: "created_date", sortable: true },
  { name: "ACCIÓN", uid: "actions" },
];

const emptyPatient = {
  patient_id: "",
  name_id: "",
  gender: "",
  birthDate: "",
  maritalStatus: "",
  telephone: "",
  address: {
    type_address: "",
    address_line: "",
    province: "",
    district: "",
    department: "",
    postal_code: "",
  },
};

const emptyPractitioner = {
  practitioner_id: "",
  name_id: "",
  gender: "",
  birthDate: "",
  maritalStatus: "",
  telephone: "",
  address: {
    type_address: "",
    address_line: "",
    province: "",
    district: "",
    department: "",
    postal_code: "",
  },
};

const practitionerFamilyRecordsTableColumns = [
  { name: "ID", uid: "familyHistory_id", sortable: true },
  { name: "DETALLE", uid: "notes", sortable: true },
  { name: "CREADO POR", uid: "participant_id", sortable: true },
  { name: "FECHA DE CREACIÓN", uid: "recorded_date", sortable: true },
  { name: "ESTADO", uid: "clinical_status", sortable: true },
  { name: "ACCIÓN", uid: "actions" },
];

const registerTypeMap: Record<string, string> = {
  ALLERGY: "ALERGIA",
  FAMILY_HISTORY: "FAMILIAR",
};

const eventTypeMap: Record<string, string> = {
  READ: "LECTURA",
  WRITE: "ESCRITURA",
};

const statusColorMap: Record<string, ChipProps["color"]> = {
  RESOLVED: "success",
  ACTIVE: "danger",
  INACTIVE: "warning",
};

const statusMap: Record<string, string> = {
  RESOLVED: "RESUELTO",
  ACTIVE: "ACTIVO",
  INACTIVE: "INACTIVO",
};

const familyStatusColorMap: Record<string, ChipProps["color"]> = {
  COMPLETE: "success",
  PARTIAL: "warning",
  UNKNOWN: "warning",
};

const allergyTypesMap: Record<string, string> = {
  DAIRY: "LÁCTEOS",
  GLUTEN: "GLUTEN",
  CAFFEINE: "CAFEÍNA",
  SALICYLATES: "SALICILATOS",
  AMINES: "AMINAS",
  OTHER: "OTRO",
};

const familyRecordStatusMap: Record<string, string> = {
  PARTIAL: "PARCIAL",
  COMPLETE: "COMPLETO",
  UNKNOWN: "SALUD DESCONOCIDA",
};

const typeOfAttentionMap: Record<string, string> = {
  IN_PERSON: "PRESENCIAL",
  TELEMEDICINE: "TELEMEDICINA",
};

export {
  civilStatus,
  allergyStatus,
  genders,
  addressTypes,
  allergyTypes,
  allergyCategories,
  attentionTableColumns,
  typeOfAttention,
  typeOfConsultation,
  typeOfService,
  typeOfFacility,
  allergyTableColumns,
  practitionersTableColumns,
  practitionerTableColumns,
  accessRequestTableColumns,
  accessTableColumns,
  patientsTableColumns,
  selectedPatientAllergiesTableColumns,
  platformaPatientEventsTableColumns,
  platformaPractitionerEventsTableColumns,
  emptyPatient,
  emptyPractitioner,
  documentsTableColumns,
  healthRecordsTableColumns,
  familyRecordTableColumns,
  familyRecordStatus,
  practitionerFamilyRecordsTableColumns,
  registerTypeMap,
  eventTypeMap,
  statusColorMap,
  statusMap,
  allergyTypesMap,
  familyRecordStatusMap,
  familyStatusColorMap,
  typeOfAttentionMap,
  timeOfDiseasePeriod,
  typeOfDiagnosis,
};
