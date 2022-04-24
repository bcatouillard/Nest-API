import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  set password(password: string) {
    this.password = password;
  }

  get password() {
    return this.password;
  }
}
