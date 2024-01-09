import { SetMetadata } from '@nestjs/common';
import { Roles } from '../enum/role.enum';

export const Role = (...roles: string[]) => SetMetadata(Roles, roles);