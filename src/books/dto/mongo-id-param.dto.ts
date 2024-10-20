import { IsMongoId } from 'class-validator';

export class IsMongoIdParam {
  @IsMongoId()
  id: string;
}
