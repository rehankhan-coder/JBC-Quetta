
import { BrickType, BrickInfo } from './types';

export const WHATSAPP_NUMBER = '923018240653';
export const EMAIL_ADDRESS = 'rehan5426nasar@gmail.com';
export const COMPANY_ADDRESS = 'Near DHA Quetta, Kuchlak';

export const BRICK_PRICES: Record<BrickType, BrickInfo> = {
  [BrickType.FIRST_CLASS]: {
    name: BrickType.FIRST_CLASS,
    price: 10,
  },
  [BrickType.SECOND_CLASS]: {
    name: BrickType.SECOND_CLASS,
    price: 7,
  },
};
