import {Character} from './character';
import {StrongAspect} from './types/strong-aspect';
import {Location} from './types/location';

export class CharacterBuilder {
  character: Character;

  constructor(character: Character) {
    this.character = character;
  }

  setName(name: string): CharacterBuilder {
    this.character.name = name;
    return this;
  }

  setAge(age: string): CharacterBuilder {
    this.character.age = age;
    return this;
  }

  setStrongAspect(strongAspect: StrongAspect): CharacterBuilder {
    this.character.strongAspect = strongAspect;
    return this;
  }

  setLocation(location: Location): CharacterBuilder {
    this.character.location = location;
    return this;
  }

  build() {
    return this.character;
  }
}
