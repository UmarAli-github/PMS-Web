import { GetAllBedsResponse } from '@/services/beds';

export interface UserSelection {
  bed: GetAllBedsResponse[number] | null;
  date: Date | null;
}
