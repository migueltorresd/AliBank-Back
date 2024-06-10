export interface CustomerInterface {
  id: string;
  state: boolean;
  documentType: {
    id: string;
    name: string;
    state: boolean
  };
  document: number;
  fullName: string;
  email: string;
  phone: string;
  password: string;
}
