export class GetRestroomListDto {
  region: string;
  province: string;
  city: string;
  building: string;
  sort: 'RATING' | 'NEW';
  floor: string;
  gender: 'MALE' | 'FEMALE';
  availability: string;
}
