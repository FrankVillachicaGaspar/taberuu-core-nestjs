import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Roles } from '@shared/enums/roles.enum';

export class CreateUserHttpDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  profileImage?: string;

  @IsOptional()
  @IsNumberString()
  @MaxLength(15)
  phoneNumber?: string;

  @IsOptional()
  @IsNumberString()
  @MaxLength(10)
  phoneCode?: string;

  @IsEnum(Roles)
  @IsNotEmpty()
  role: Roles;
}
