import {StrongAspect} from './types/strong-aspect';
import {Location} from './types/location';

export class Character {
  name!: string;
  age!: string;
  strongAspect!: StrongAspect;
  location!: Location;
}
