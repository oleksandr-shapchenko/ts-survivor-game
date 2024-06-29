import {LanguageCode} from './types/language-code';

export class GameState {
  selectedLanguage: LanguageCode;
  isWalkedAroundIsland = false;
  isCaveUnlocked = false;
  isStashUnlocked = false;
  isWoodBroughtToBeach = false;
  isLampBroughtToBeach = false;
  isSkyrocketBroughtToBeach = false;
  isSosSignalMade = false;
  isTreeClimbed = false;
  isTorchCreated = false;
  isEndOfGame = false;

  constructor(languageCode: LanguageCode) {
    this.selectedLanguage = languageCode;
  }
}
