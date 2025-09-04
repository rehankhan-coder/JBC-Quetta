
export enum BrickType {
  FIRST_CLASS = '1st Class Bricks',
  SECOND_CLASS = '2nd Class Bricks',
}

export interface BrickInfo {
  name: BrickType;
  price: number;
}
