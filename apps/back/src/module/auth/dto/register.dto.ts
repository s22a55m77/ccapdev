import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  username: string;

  @MinLength(6, {
    message: 'Password should have a minimum length of 6',
  })
  @IsString()
  password: string;
  @IsEmail()
  email: string;
}
