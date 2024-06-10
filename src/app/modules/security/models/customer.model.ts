export class CustomerModel {
  documentTypeId: string;
  document: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;

  constructor(
    documentTypeId: string,
    document: string,
    fullName: string,
    email: string,
    phone: string,
    password: string
  ) {
    this.documentTypeId = documentTypeId;
    this.document = document;
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }

  getData(): {
    documentTypeId: string;
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
  } {
    return {
      documentTypeId: this.documentTypeId,
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      document: this.document,
      password: this.password,
    };
  }
}
