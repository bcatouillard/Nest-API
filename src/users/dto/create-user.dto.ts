export class CreateUserDto {
  username: string;

  set password(password: string) {
    this.password = password;
  }

  get password() {
    return this.password;
  }
}
