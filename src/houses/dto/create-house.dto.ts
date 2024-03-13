import { IsBoolean, IsNotEmpty, IsNumber, IsString, Matches, Validate } from "class-validator";
import { StateValidator } from "./validations/state.validator";
import { CityValidator } from "./validations/city.validator";

export class CreateHouseDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z]{4}\d{4}$/, {message: "El codigo debe tener cuatro letras y cuatro numeros"})
  readonly code: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^(casa|apartamento|finca|edificio|oficina)$/, {message: "no es un tipo de vivienda válido!"})
  readonly type: string;
  @IsNotEmpty()
  @IsString()
  @Validate(StateValidator, {message: "no es un departamento de Colombia!"})
  readonly state: string;
  @IsNotEmpty()
  @IsString()
  @Validate(CityValidator, {message: "no es una ciudad de Colombia!"})
  readonly city: string;
  @IsNotEmpty()
  @IsString()
  readonly address: string;
  @IsNotEmpty()
  @IsNumber()
  readonly zip_code: number;
  @IsNotEmpty()
  @IsNumber()
  @Matches(/^(?!0*(?:[.,]0*)?$)(?:\d+|[1-9]\d{0,2}(?:([.,]\d{3})*|\d*))([.,]\d+)?$|^1000000([.,]0+)?$/, {message: "no es un precio válido!"})
  readonly price: number;
  @IsNotEmpty()
  @IsNumber()
  @Matches(/^(10000|[1-9]\d|\d)$/, {message: "no es un tamaño válido!"})
  readonly size: number;
  @IsNotEmpty()
  @IsNumber()
  @Matches(/^(100|[1-9]\d|\d)$/, {message: "no es un numero de habitaciones válido!"})
  readonly rooms: number;
  @IsNotEmpty()
  @IsNumber()
  @Matches(/^(100|[1-9]\d|\d)$/, {message: "no es un numero de baños válido!"})
  readonly bathrooms: number;
  @IsNotEmpty()
  @IsBoolean()
  readonly parking: boolean;
}