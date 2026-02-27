import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// 1. OmitType removes the 'password' field entirely
// 2. PartialType makes the remaining fields (email, etc.) optional
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const),
) {}