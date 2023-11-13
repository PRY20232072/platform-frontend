const civilStatus = [
  { label: 'Single', value: 'Single' },
  { label: 'Married', value: 'Married' },
  { label: 'Divorced', value: 'Divorced' },
  { label: 'Widowed', value: 'Widowed' },
  { label: 'Other', value: 'Other' },
];

const genders = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
];

const addressTypes = [
  { label: 'Postal', value: 'Postal' },
  { label: 'Physical', value: 'Physical' },
  { label: 'Both', value: 'Both' },
];

const allergyTableColumns = [
  { name: 'DETAIL', uid: 'detail', sortable: true },
  { name: 'TYPE', uid: 'type', sortable: true },
  { name: 'CREATED BY', uid: 'created_by', sortable: true },
  { name: 'CREATED DATE', uid: 'created_date', sortable: true },
  { name: 'STATUS', uid: 'status', sortable: true },
  { name: 'ACTION', uid: 'actions' },
];

const patientAllergies = [
  {
    id: 1,
    detail: 'Allergy reaction to peanuts',
    type: 'Food',
    created_by: 'Dr. Juan Perez',
    created_date: '2023-01-01',
    status: 'active',
  },
  {
    id: 2,
    detail: 'Allergy reaction to medicine',
    type: 'Medicine',
    created_by: 'Dr. Ricardo Montalban',
    created_date: '2023-01-01',
    status: 'active',
  },
  {
    id: 3,
    detail: 'Allergy reaction to cats',
    type: 'Animal',
    created_by: 'Dr. Ricardo Montalban',
    created_date: '2023-01-01',
    status: 'innactive',
  },
  {
    id: 4,
    detail: 'Allergy reaction to cats',
    type: 'Animal',
    created_by: 'Dr. Ricardo Montalban',
    created_date: '2023-01-01',
    status: 'resolve',
  },
];



export { civilStatus, genders, addressTypes, allergyTableColumns,patientAllergies };
