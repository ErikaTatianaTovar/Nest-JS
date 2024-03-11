import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { error } from 'console';
import { UsersService } from 'src/users/users.service';

@ValidatorConstraint({ name: 'uniqueEmail', async: true })
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}
  async validate(email: string): Promise<boolean>  {
    try {
      const existEmail = await this.userService.findByEmail(email);
      if (!existEmail) {
        return false;
      }
      return true;
    } catch (err) {
      return false + err.message;
    }
  }

  defaultMessage(): string {
    return 'El correo ya existe';
  }
}
