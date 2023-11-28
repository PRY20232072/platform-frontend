const civilStatus = [
  { label: 'SINGLE', value: 'SINGLE' },
  { label: 'MARRIED', value: 'MARRIED' },
  { label: 'DIVORCED', value: 'DIVORCED' },
  { label: 'WIDOWED', value: 'WIDOWED' },
  { label: 'OTHER', value: 'OTHER' },
];

const genders = [
  { label: 'MALE', value: 'MALE' },
  { label: 'FEMALE', value: 'FEMALE' },
  { label: 'OTHER', value: 'OTHER' },
];

const addressTypes = [
  { label: 'POSTAL', value: 'POSTAL' },
  { label: 'PHYSICAL', value: 'PHYSICAL' },
  { label: 'BOTH', value: 'BOTH' },
];

const allergyStatus = [
  { label: 'ACTIVE', value: 'ACTIVE' },
  { label: 'INNACTIVE', value: 'INNACTIVE' },
  { label: 'RESOLVE', value: 'RESOLVE' },
];

const allergyTypes = [
  { label: 'DAIRY', value: 'DAIRY' },
  { label: 'GLUTEN', value: 'GLUTEN' },
  { label: 'CAFFEINE', value: 'CAFFEINE' },
  { label: 'SALICYLATES', value: 'SALICYLATES' },
  { label: 'AMINES', value: 'AMINES' },
  { label: 'OTHER', value: 'OTHER' },
];

const allergyCategories = [
  { label: 'FOOD', value: 'FOOD' },
  { label: 'MEDICATION', value: 'MEDICATION' },
  { label: 'ENVIRONMENT', value: 'ENVIRONMENT' },
  { label: 'BIOLOGIC', value: 'BIOLOGIC' },
];

const allergyTableColumns = [
  { name: 'DETAIL', uid: 'allergy_notes', sortable: true },
  { name: 'TYPE', uid: 'type', sortable: true },
  { name: 'CREATED BY', uid: 'participant_id', sortable: true },
  { name: 'CREATED DATE', uid: 'recorded_date', sortable: true },
  { name: 'STATUS', uid: 'clinical_status', sortable: true },
  { name: 'ACTION', uid: 'actions' },
];

const allergyDocTableColumns = [
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'FORMAT', uid: 'format_doc', sortable: true },
  { name: 'CREATED BY', uid: 'created_by', sortable: true },
  { name: 'CREATED DATE', uid: 'created_date', sortable: true },
  { name: 'ACTION', uid: 'actions' },
];

const allergyAccessTableColumns = [
  { name: 'PRACTITIONER NAME', uid: 'practitioner_name', sortable: true },
  // { name: 'ASSIGNED DATE', uid: 'assigned_date', sortable: true },
  // { name: 'EXPIRED DATE', uid: 'expired_date', sortable: true },
  { name: 'ACTION', uid: 'actions' },
];

const practitionersTableColumns = [
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'ID', uid: 'id', sortable: true },
  { name: 'EMAIL', uid: 'email', sortable: true },
  { name: 'PHONE NUMBER', uid: 'phone_number' },
  { name: 'ACTION', uid: 'actions' },
];

const patientsTableColumns = [
  { name: 'NAME', uid: 'name_id', sortable: true },
  { name: 'ID', uid: 'patient_id', sortable: true },
  // { name: 'EMAIL', uid: 'email', sortable: true },
  { name: 'PHONE NUMBER', uid: 'telephone' },
  { name: 'ACTION', uid: 'actions' },
];

const healthRecordsTableColumns = [
  { name: 'DETAIL', uid: 'allergy_notes', sortable: true },
  // { name: 'PATIENT', uid: 'patient_name', sortable: true },
  // { name: 'CREATED BY', uid: 'created_by', sortable: true },
  { name: "PATIENT ID", uid: "patient_id", sortable: true },
  { name: 'CREATED DATE', uid: 'recorded_date', sortable: true },
  { name: 'STATUS', uid: 'clinical_status', sortable: true },
  { name: 'CATEGORY', uid: 'category', sortable: true },
  { name: 'ACTION', uid: 'actions' },
];

const practitionerTableColumns = [
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'ID', uid: 'practitioner_id', sortable: true },
  { name: 'EMAIL', uid: 'email', sortable: true },
  { name: 'PHONE NUMBER', uid: 'phone_number' },
];

const accessRequestTableColumns = [
  { name: 'PRACTITIONER NAME', uid: 'practitioner_name', sortable: true },
  // { name: 'REQUEST DATE', uid: 'request_date', sortable: true },
  { name: 'ACTION', uid: 'actions' },
];

const eventsTableColumns = [
  { name: 'EVENT DESCRIPTION', uid: 'event_description', sortable: true },
  { name: 'USER NAME', uid: 'user_name', sortable: true },
  { name: 'ROLE', uid: 'role', sortable: true },
  { name: 'EVENT', uid: 'event', sortable: true },
  { name: 'ACTION', uid: 'actions' },
];

const selectedPatientAllergiesTableColumns = [
  { name: 'DETAIL', uid: 'allergy_notes', sortable: true },
  { name: 'TYPE', uid: 'type', sortable: true },
  // { name: 'CREATED BY', uid: 'created_by', sortable: true },
  { name: 'CREATED DATE', uid: 'recorded_date', sortable: true },
  { name: 'STATUS', uid: 'clinical_status', sortable: true },
  { name: 'ACCESS', uid: 'has_access', sortable: true },
  { name: 'ACTION', uid: 'actions' },
];

const selectedPatientAllergiesDocsTableColumns = [
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'FORMAT', uid: 'format_doc', sortable: true },
  { name: 'CREATED BY', uid: 'created_by', sortable: true },
  { name: 'CREATED DATE', uid: 'created_date', sortable: true },
  { name: 'ACCESS', uid: 'has_access', sortable: true },
  { name: 'ACTION', uid: 'actions' },
];

const practitioners = [
  {
    id: 1,
    name: 'Dr. Juan Perez',
    practitioner_id: '81726354',
    email: 'juanperez@gmail.com',
    phone_number: '987654321',
  },
  {
    id: 2,
    name: 'Dra. Maria Perez',
    practitioner_id: '81726354',
    email: 'mariaperez@gmail.com',
    phone_number: '987654321',
  },
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
    city: "",
    district: "",
    country: "",
    postal_code: "",
  }
};

const emptyPractitioner = {
  patient_id: "",
  name_id: "",
  gender: "",
  birthDate: "",
  maritalStatus: "",
  telephone: "",
  address: {
    type_address: "",
    address_line: "",
    city: "",
    district: "",
    country: "",
    postal_code: "",
  }
};

const patients = [
  {
    id: 1,
    name: 'Elon Musk',
    patient_id: '81726354',
    email: 'elonmusk@plataforma.com',
    phone_number: '987654321',
  },
  {
    id: 2,
    name: 'Elon Musk',
    patient_id: '81726354',
    email: 'elonmusk@plataforma.com',
    phone_number: '987654321',
  },
];

const patientAllergies = [
  {
    id: 1,
    detail: 'Allergy reaction to peanuts',
    type: 'Food',
    created_by: 'Dr. Juan Perez',
    created_date: '2023/11/01',
    status: 'active',
  },
  {
    id: 2,
    detail: 'Allergy reaction to medicine',
    type: 'Medicine',
    created_by: 'Dr. Ricardo Montalban',
    created_date: '2023/11/01',
    status: 'active',
  },
  {
    id: 3,
    detail: 'Allergy reaction to cats',
    type: 'Animal',
    created_by: 'Dr. Ricardo Montalban',
    created_date: '2023/11/01',
    status: 'innactive',
  },
  {
    id: 4,
    detail: 'Allergy reaction to cats',
    type: 'Animal',
    created_by: 'Dr. Ricardo Montalban',
    created_date: '2023/11/01',
    status: 'resolve',
  },
];

const patientAllergiesDocs = [
  {
    id: 1,
    name: 'Allergy examination report',
    format_doc: 'PDF',
    created_by: 'Dr. Juan Perez',
    created_date: '2023/11/01',
  },
  {
    id: 2,
    name: 'Allergy examination report',
    format_doc: 'PDF',
    created_by: 'Dr. Ricardo Montalban',
    created_date: '2023/11/01',
  },
];

const selectedPatientAllergiesDocs = [
  {
    id: 1,
    name: 'Allergy examination report',
    format_doc: 'PDF',
    created_by: 'Dr. Juan Perez',
    created_date: '2023/11/01',
    has_access: 'Yes',
  },
  {
    id: 2,
    name: 'Allergy examination report',
    format_doc: 'PDF',
    created_by: 'Dr. Ricardo Montalban',
    created_date: '2023/11/01',
    has_access: 'No',
  },
  {
    id: 3,
    name: 'Allergy examination report',
    format_doc: 'PDF',
    created_by: 'Dr. Ricardo Montalban',
    created_date: '2023/11/01',
    has_access: 'Pending',
  },
];

const patientAllergiesAccess = [
  {
    id: 1,
    practitioner_name: 'Dr. Juan Perez',
    assigned_date: '2023/11/01',
    expired_date: '2023/11/01',
  },
  {
    id: 2,
    practitioner_name: 'Dr. Ricardo Montalban',
    assigned_date: '2023/11/01',
    expired_date: '2023/11/01',
  },
];

const practitionersAccessRequests = [
  {
    id: 1,
    practitioner_name: 'Dr. Juan Perez',
    request_date: '2023/11/01',
  },
  {
    id: 2,
    practitioner_name: 'Dr. Ricardo Montalban',
    request_date: '2023/11/01',
  },
];

const events = [
  {
    id: 1,
    event_description: 'Patient created',
    user_name: 'Dr. Juan Perez',
    role: 'Doctor',
    event: 'Create Record',
  },
  {
    id: 2,
    event_description: 'New allergy added',
    user_name: 'Dr. Juan Perez',
    role: 'Doctor',
    event: 'Create Record',
  },
];

const selectedPatientAllergies = [
  {
    id: 1,
    detail: 'Allergy reaction',
    type: 'Hives',
    created_by: 'Dr. Juan Perez',
    created_date: '2023/11/01',
    status: 'active',
    has_access: 'Yes',
  },
  {
    id: 2,
    detail: 'Allergy reaction',
    type: 'Hives',
    created_by: 'Dr. Juan Perez',
    created_date: '2023/11/01',
    status: 'active',
    has_access: 'No',
  },
  {
    id: 3,
    detail: 'Allergy reaction',
    type: 'Hives',
    created_by: 'Dr. Juan Perez',
    created_date: '2023/11/01',
    status: 'active',
    has_access: 'Pending',
  },
];

const healthRecords = [
  {
    id: 1,
    detail: 'Medical consultation',
    patient_name: 'Jhon Doe',
    created_by: 'Dr. Juan Perez',
    created_date: '2023/11/01',
    status: 'Partial',
    category: 'Family History',
  },
  {
    id: 2,
    detail: 'Allergy reaction',
    patient_name: 'Jhon Doe',
    created_by: 'Dr. Juan Perez',
    created_date: '2023/11/01',
    status: 'Active',
    category: 'Allergy',
  },
];

export {
  civilStatus,
  allergyStatus,
  genders,
  addressTypes,
  allergyTypes,
  allergyCategories,
  allergyTableColumns,
  allergyDocTableColumns,
  allergyAccessTableColumns,
  practitionersTableColumns,
  practitionerTableColumns,
  accessRequestTableColumns,
  eventsTableColumns,
  patientsTableColumns,
  selectedPatientAllergiesTableColumns,
  patientAllergies,
  patientAllergiesDocs,
  patientAllergiesAccess,
  practitionersAccessRequests,
  practitioners,
  events,
  emptyPatient,
  emptyPractitioner,
  patients,
  selectedPatientAllergies,
  selectedPatientAllergiesDocs,
  selectedPatientAllergiesDocsTableColumns,
  healthRecordsTableColumns,
  healthRecords,
};
