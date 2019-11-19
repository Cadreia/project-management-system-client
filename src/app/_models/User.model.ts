export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string,
    public idNum: number,
    public password: string,
    public token: string,
  ) { }
}
