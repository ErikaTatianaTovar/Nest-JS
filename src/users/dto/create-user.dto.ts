import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';
import { UniqueEmailValidator } from './validations/unique-email.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: string;
  @IsNotEmpty()
  @MinLength(2, { message: 'El nombre debe tener minimo 2 letras' })
  @IsString({ message: 'El nombre debe ser string' })
  readonly name: string;
  @IsNotEmpty()
  @IsEmail({}, { message: 'Correo invalido' })
  @Validate(UniqueEmailValidator, { message: 'El correo ya fue registrado' })
  readonly email: string;
  @IsNotEmpty()
  readonly lastname: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, {
    message:
      'La contraseña debe tener minimo 8 caracteres, una letra mayuscula, un numero y un caracter especial',
  })
  readonly password: string;
}
