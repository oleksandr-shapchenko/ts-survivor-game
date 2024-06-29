import {GameState} from './game-state';
import {LocationsEnum} from './types/locations-enum';
import {
  BringLampToBeachCommand,
  BringSkyrocketToBeachCommand,
  BringWoodToBeachCommand,
  ClimbTreeCommand,
  CreateTorchCommand,
  FireSkyrocketCommand,
  GoDeepIntoCave,
  IgniteSosSignalCommand,
  MakeSosSignalCommand,
  MoveToBeachCommand,
  MoveToCaveCommand,
  MoveToForestCommand,
  MoveToStashCommand,
  WalkAroundIslandCommand,
} from './commands';

export class LocationCommandFactory {
  static createLocationCommands(
    gameState: GameState,
    currentLocation: LocationsEnum
  ) {
    switch (currentLocation) {
      case LocationsEnum.Beach:
        return this.createBeachCommands(gameState);
      case LocationsEnum.Forest:
        return this.createForestCommands(gameState);
      case LocationsEnum.Cave:
        return this.createCaveCommands(gameState);
      case LocationsEnum.Stash:
        return this.createStashCommands(gameState);
      default:
        throw new Error('Invalid location');
    }
  }

  private static createBeachCommands(gameState: GameState) {
    const moveToForestCommand = new MoveToForestCommand();
    const beachCommands = [moveToForestCommand];

    if (!gameState.isWalkedAroundIsland) {
      const walkAroundIslandCommand = new WalkAroundIslandCommand();
      beachCommands.push(walkAroundIslandCommand);
    }

    if (gameState.isCaveUnlocked) {
      const moveToCaveCommand = new MoveToCaveCommand();
      beachCommands.push(moveToCaveCommand);
    }

    if (gameState.isWoodBroughtToBeach && !gameState.isSosSignalMade) {
      const makeSosSignalFromWoodCommand = new MakeSosSignalCommand();
      beachCommands.push(makeSosSignalFromWoodCommand);
    }

    if (gameState.isLampBroughtToBeach && gameState.isSosSignalMade) {
      const igniteSosSignalCommand = new IgniteSosSignalCommand();
      beachCommands.push(igniteSosSignalCommand);
    }

    if (gameState.isSkyrocketBroughtToBeach) {
      const fireSkyrocketCommand = new FireSkyrocketCommand();
      beachCommands.push(fireSkyrocketCommand);
    }

    if (
      gameState.isLampBroughtToBeach &&
      gameState.isWoodBroughtToBeach &&
      !gameState.isWoodBroughtToBeach &&
      gameState.isTorchCreated
    ) {
      const createTorchCommand = new CreateTorchCommand();
      beachCommands.push(createTorchCommand);
    }

    return beachCommands;
  }

  private static createForestCommands(gameState: GameState) {
    const moveToBeachCommand = new MoveToBeachCommand();
    const forestCommands = [moveToBeachCommand];

    if (!gameState.isWoodBroughtToBeach) {
      const bringWoodToBeachCommand = new BringWoodToBeachCommand();
      forestCommands.push(bringWoodToBeachCommand);
    }

    if (!gameState.isTreeClimbed) {
      const climbTreeCommand = new ClimbTreeCommand();
      forestCommands.push(climbTreeCommand);
    }

    if (gameState.isStashUnlocked) {
      const moveToStashCommand = new MoveToStashCommand();
      forestCommands.push(moveToStashCommand);
    }

    return forestCommands;
  }

  private static createCaveCommands(gameState: GameState) {
    const moveToBeachCommand = new MoveToBeachCommand();
    const goDeepIntoCaveCommand = new GoDeepIntoCave();
    const caveCommands = [moveToBeachCommand, goDeepIntoCaveCommand];

    if (!gameState.isLampBroughtToBeach) {
      const bringLampToBeachCommand = new BringLampToBeachCommand();
      caveCommands.push(bringLampToBeachCommand);
    }

    return caveCommands;
  }

  private static createStashCommands(gameState: GameState) {
    const moveToForestCommand = new MoveToForestCommand();
    const stashCommands = [moveToForestCommand];

    if (!gameState.isSkyrocketBroughtToBeach) {
      const bringSkyrocketToBeachCommand = new BringSkyrocketToBeachCommand();
      stashCommands.push(bringSkyrocketToBeachCommand);
    }

    return stashCommands;
  }
}
