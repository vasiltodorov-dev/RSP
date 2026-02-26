import { PartialType } from '@nestjs/mapped-types';
import { CreateDietaryPreferenceDto } from './create-dietary_preference.dto';

export class UpdateDietaryPreferenceDto extends PartialType(CreateDietaryPreferenceDto) {}
