import {Location} from './types/location';
import {Beach, Cave, Forest, Stash} from './location';
import {LocationsEnum} from './types/locations-enum';
import {GameState} from './game-state';

export class LocationFactory {
  static createLocation(
    location: LocationsEnum,
    gameState: GameState
  ): Location {
    switch (location) {
      case LocationsEnum.Beach:
        return new Beach(gameState);
      case LocationsEnum.Forest:
        return new Forest(gameState);
      case LocationsEnum.Cave:
        return new Cave(gameState);
      case LocationsEnum.Stash:
        return new Stash(gameState);
      default:
        throw new Error('Invalid location');
    }
  }
}
