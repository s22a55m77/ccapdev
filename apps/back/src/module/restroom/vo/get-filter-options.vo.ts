export type FilterDataType = {
  label: string;
  value: string;
  children?: FilterDataType[];
};

export class GetFilterOptionsVo {
  location: FilterDataType[];
  gender: FilterDataType[];
  availability: FilterDataType[];
}
