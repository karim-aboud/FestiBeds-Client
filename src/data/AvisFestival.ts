import { Festival } from 'src/data/Festival';
import { Festivalier } from './Festivalier';
export interface AvisFestival {
  id: string,
  festivalier: Festivalier,
  festival: Festival,
  note: number,
  avis: string
}
