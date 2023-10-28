export class CreateRestroomDto {
  location: string;
  region: string;
  province: string;
  city: string;
  building: string;
  floor: number;
  gender: 'MALE' | 'FEMALE';
  tags: string[];
}
