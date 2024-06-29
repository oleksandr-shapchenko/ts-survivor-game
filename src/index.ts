import {CharacterBuilder} from './character-builder';
import {Character} from './character';
import {TranslationService} from './translations-service';
import {GameState} from './game-state';
import {LocationFactory} from './location-factory';
import {LocationsEnum} from './types/locations-enum';
import {PromptService} from './prompt-service';

async function main() {
  const gameState = new GameState(await PromptService.getLanguageCode());
  const translationService = TranslationService.getInstance();
  const translations = await translationService.getTranslations(
    gameState.selectedLanguage
  );
  const promptService = new PromptService(translations);

  console.log(translations.intro);

  const character = new CharacterBuilder(new Character())
    .setName(await promptService.getName())
    .setAge(await promptService.getAge())
    .setStrongAspect(await promptService.getStrongAspect())
    .setLocation(LocationFactory.createLocation(LocationsEnum.Beach, gameState))
    .build();

  while (!gameState.isEndOfGame) {
    const nextCommand = await promptService.getNextCommand(character);

    nextCommand.execute({gameState, character});
    console.log(translations[nextCommand.resultI18nKey]);
  }
}

main();
