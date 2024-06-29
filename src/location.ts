import {Location} from './types/location';
import {LocationsEnum} from './types/locations-enum';
import {GameState} from './game-state';
import {LocationCommandFactory} from './location-commands-factory';
import {Command} from './types/command';

export class Beach implements Location {
  availableCommands: Command[];

  constructor(gameState: GameState) {
    this.availableCommands = LocationCommandFactory.createLocationCommands(
      gameState,
      LocationsEnum.Beach
    );
  }
}

export class Forest implements Location {
  availableCommands: Command[];

  constructor(gameState: GameState) {
    this.availableCommands = LocationCommandFactory.createLocationCommands(
      gameState,
      LocationsEnum.Forest
    );
  }
}

export class Cave implements Location {
  availableCommands: Command[];

  constructor(gameState: GameState) {
    this.availableCommands = LocationCommandFactory.createLocationCommands(
      gameState,
      LocationsEnum.Cave
    );
  }
}

export class Stash implements Location {
  availableCommands: Command[];

  constructor(gameState: GameState) {
    this.availableCommands = LocationCommandFactory.createLocationCommands(
      gameState,
      LocationsEnum.Stash
    );
  }
}
