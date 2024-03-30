export type PlatformEvent = {
  created_at: string;
  id: string;
  user_id: string;
  register_id: string;
  register_type: string;
  type: string;
  practitioner_id?: string;
  practitioner_name: string;
};