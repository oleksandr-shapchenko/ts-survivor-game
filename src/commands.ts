import {LocationFactory} from './location-factory';
import {LocationsEnum} from './types/locations-enum';
import {Command} from './types/command';
import {CommandParams} from './types/command-params';
import {LocationCommandFactory} from './location-commands-factory';

// Common commands
export class MoveToForestCommand implements Command {
  i18nKey = 'moveToForest';
  resultI18nKey = 'moveToForestResult';

  execute({gameState, character}: CommandParams) {
    character.location = LocationFactory.createLocation(
      LocationsEnum.Forest,
      gameState
    );
  }
}

export class MoveToBeachCommand implements Command {
  i18nKey = 'moveToBeach';
  resultI18nKey = 'moveToBeachResult';

  execute({gameState, character}: CommandParams) {
    character.location = LocationFactory.createLocation(
      LocationsEnum.Beach,
      gameState
    );
  }
}

export class MoveToCaveCommand implements Command {
  i18nKey = 'moveToCave';
  resultI18nKey = 'moveToCaveResult';

  execute({gameState, character}: CommandParams) {
    character.location = LocationFactory.createLocation(
      LocationsEnum.Cave,
      gameState
    );
  }
}

// Beach commands
export class WalkAroundIslandCommand implements Command {
  i18nKey = 'walkAroundIsland';
  resultI18nKey = 'walkAroundIslandResult';

  execute({gameState, character}: CommandParams) {
    gameState.isWalkedAroundIsland = true;
    gameState.isCaveUnlocked = true;

    character.location.availableCommands =
      LocationCommandFactory.createLocationCommands(
        gameState,
        LocationsEnum.Beach
      );
  }
}

export class MakeSosSignalCommand implements Command {
  i18nKey = 'makeSosSignal';
  resultI18nKey = 'makeSosSignalResult';

  execute({gameState, character}: CommandParams) {
    gameState.isSosSignalMade = true;

    character.location.availableCommands =
      LocationCommandFactory.createLocationCommands(
        gameState,
        LocationsEnum.Beach
      );
  }
}

export class IgniteSosSignalCommand implements Command {
  i18nKey = 'igniteSosSignal';
  resultI18nKey = 'igniteSosSignalResult';

  execute({gameState}: CommandParams) {
    gameState.isEndOfGame = true;
  }
}

export class FireSkyrocketCommand implements Command {
  i18nKey = 'fireSkyrocket';
  resultI18nKey = 'fireSkyrocketResult';

  execute({gameState}: CommandParams) {
    gameState.isEndOfGame = true;
  }
}

export class CreateTorchCommand implements Command {
  i18nKey = 'createTorch';
  resultI18nKey = 'createTorchResult';

  execute({gameState}: CommandParams) {
    gameState.isTorchCreated = true;
  }
}

// Forest Commands
export class MoveToStashCommand implements Command {
  i18nKey = 'moveToStash';
  resultI18nKey = 'moveToStashResult';

  execute({gameState, character}: CommandParams) {
    character.location = LocationFactory.createLocation(
      LocationsEnum.Stash,
      gameState
    );
  }
}

export class BringWoodToBeachCommand implements Command {
  i18nKey = 'bringWoodToBeach';
  resultI18nKey = 'moveToBeachResult';

  execute({gameState, character}: CommandParams) {
    gameState.isWoodBroughtToBeach = true;

    character.location = LocationFactory.createLocation(
      LocationsEnum.Beach,
      gameState
    );
  }
}

export class ClimbTreeCommand implements Command {
  i18nKey = 'climbTree';
  resultI18nKey = 'climbTreeSuccessResult';

  execute({gameState, character}: CommandParams) {
    if (character.strongAspect === 'PHYSICAL') {
      gameState.isTreeClimbed = true;
      gameState.isStashUnlocked = true;

      character.location.availableCommands =
        LocationCommandFactory.createLocationCommands(
          gameState,
          LocationsEnum.Forest
        );
    } else {
      this.resultI18nKey = 'climbTreeFailResult';
      gameState.isEndOfGame = true;
    }
  }
}

// Cave commands
export class BringLampToBeachCommand implements Command {
  i18nKey = 'bringLampToBeach';
  resultI18nKey = 'moveToBeachResult';

  execute({gameState, character}: CommandParams) {
    gameState.isLampBroughtToBeach = true;

    character.location = LocationFactory.createLocation(
      LocationsEnum.Beach,
      gameState
    );
  }
}

export class GoDeepIntoCave implements Command {
  i18nKey = 'goDeepIntoCave';
  resultI18nKey = 'goDeepIntoCaveSuccessResult';

  execute({gameState, character}: CommandParams) {
    if (
      character.strongAspect !== 'INTELLIGENCE' ||
      !gameState.isTorchCreated
    ) {
      this.resultI18nKey = 'goDeepIntoCaveFailResult';
    }

    gameState.isEndOfGame = true;
  }
}

// Stash commands
export class BringSkyrocketToBeachCommand implements Command {
  i18nKey = 'bringSkyrocketToBeach';
  resultI18nKey = 'moveToBeachResult';

  execute({gameState, character}: CommandParams) {
    gameState.isSkyrocketBroughtToBeach = true;

    character.location = LocationFactory.createLocation(
      LocationsEnum.Beach,
      gameState
    );
  }
}
