import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  username: string;

  @MinLength(6, {
    message: 'Password should have a minimum length of 6',
  })
  @IsString()
  password: string;
  @IsEmail()
  email: string;
}
