export class singInModel {
  email: string;
  password: string;

  constructor(
    email: string,
    password: string
  ) {
    this.email = email;
    this.password = password;
  }

  getData(): {
    email: string;
    password: string;
  } {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
