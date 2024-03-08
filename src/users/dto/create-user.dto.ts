import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: string;
  @IsNotEmpty()
  @MinLength(2, {message: "El nombre debe tener minimo 2 letras"})
  @IsString({message: "El nombre debe ser string"})
  readonly name: string;
  @IsNotEmpty()
  @IsEmail({}, {message: "Correo invalido"})
  readonly email: string;
  @IsNotEmpty()
  readonly lastname: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/, {message: "La contraseña debe tener minimo 8 caracteres, una letra mayuscula, un numero y un caracter especial"})
  readonly password: string;
}
