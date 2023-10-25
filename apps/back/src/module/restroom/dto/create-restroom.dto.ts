export class CreateRestroomDto {
  location: string;
  locationImages: FileList[];
  restroomImages: FileList[];
  building: string;
  floor: number;
  gender: 'MALE' | 'FEMALE';
  tags: string[];
}
