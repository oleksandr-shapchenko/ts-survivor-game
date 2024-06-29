import {prompt} from 'enquirer';
import {StrongAspect} from './types/strong-aspect';
import {LANGUAGE_CODES, STRONG_ASPECTS} from './resources/constants';
import {Command} from './types/command';
import {Character} from './character';
import {LanguageCode} from './types/language-code';

export class PromptService {
  translations: any;

  constructor(translations: any) {
    this.translations = translations;
  }

  static async getLanguageCode(): Promise<LanguageCode> {
    const response = await prompt<{languageCode: LanguageCode}>({
      type: 'select',
      name: 'languageCode',
      message: 'Select preferred language: / Оберіть потрібну мову: ',
      choices: LANGUAGE_CODES,
    });
    return response.languageCode;
  }

  async getName(): Promise<string> {
    let response;
    while (!response?.name) {
      response = await prompt<{name: string} | null>({
        type: 'input',
        name: 'name',
        message: this.translations.getName,
      });
    }
    return response.name;
  }

  async getAge(): Promise<string> {
    let response;
    while (!response?.age) {
      response = await prompt<{age: string} | null>({
        type: 'input',
        name: 'age',
        message: this.translations.getAge,
      });
    }
    return response.age;
  }

  async getStrongAspect(): Promise<StrongAspect> {
    const choices = STRONG_ASPECTS.map(sa => {
      return {
        name: this.translations[sa],
        value: sa,
      };
    });

    const response = await prompt<{strongAspect: StrongAspect}>({
      type: 'select',
      name: 'strongAspect',
      message: this.translations.getStrongAspect,
      choices,
      result: value => choices.find(choice => choice.name === value)!.value,
    });

    return response.strongAspect;
  }

  async getNextCommand(character: Character): Promise<Command> {
    const choices = character.location.availableCommands.map(command => {
      return {
        name: this.translations[command.i18nKey],
        value: command,
      };
    });

    const response = await prompt<{selectedCommand: Command}>({
      type: 'select',
      name: 'selectedCommand',
      message: this.translations['whatNext'],
      choices,
      // @ts-ignore
      result: value => choices.find(choice => choice.name === value).value,
    });

    return response.selectedCommand;
  }
}
