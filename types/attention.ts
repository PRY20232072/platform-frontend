export type VitalSigns = {
  temperature: number;
  heartRate: number;
  respiratoryRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  oxygenSaturation: number;
  weight: number;
  size: number;
  imc: number;
};

export type Diagnosis = {
  code: string;
  description: string;
  date: string;
  type: string;
};

export type timeOfDisease = {
  units: number;
  period: string;
};

export type physicalExam = {
  head: string;
  eyes: string;
  nose: string;
  ears: string;
  throat: string;
  neck: string;
  chestAndLungs: string;
  cardiovascular: string;
  abdominal: string;
  gereatricouniary: string;
  neurological: string;
  extremities: string;
};

export type Attention = {
  attention_id: string;
  patient_id: string;
  participant_id: string;
  recorded_date: string;
  typeOfAttention: string;
  typeOfService: string;
  typeOfFacility: string;
  nameOfConsultation: string;
  reasonForConsultation: string;
  observations: string;
  timeOfDisease: timeOfDisease;
  diagnoses: Diagnosis[];
  physicalExam: physicalExam;
  vitalSigns: VitalSigns;
};
