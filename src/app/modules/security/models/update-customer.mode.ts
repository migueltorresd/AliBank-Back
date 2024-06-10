export class UpdateCustomer {
  document: string;
  fullName: string;
  phone: string;
  password: string;

  constructor(
    document: string,
    fullName: string,
    phone: string,
    password: string
  ) {
    this.document = document;
    this.fullName = fullName;
    this.phone = phone;
    this.password = password;
  }
}
