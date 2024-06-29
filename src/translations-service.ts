import {LanguageCode} from './types/language-code';
// eslint-disable-next-line n/no-unsupported-features/node-builtins
import * as fs from 'fs/promises';

export class TranslationService {
  private static instance: TranslationService;
  private translations: any;
  private currentLanguageCode?: LanguageCode;

  private constructor() {}

  static getInstance(): TranslationService {
    if (!this.instance) {
      this.instance = new TranslationService();
    }

    return this.instance;
  }

  async getTranslations(languageCode: LanguageCode) {
    if (!this.translations) {
      this.translations = await this.fetchTranslations(languageCode);
    } else if (this.currentLanguageCode !== languageCode) {
      this.currentLanguageCode = languageCode;
      this.translations = await this.fetchTranslations(languageCode);
    }

    return this.translations;
  }

  private async fetchTranslations(languageCode: LanguageCode) {
    try {
      const data = await fs.readFile(
        `./src/resources/i18n/${languageCode}.json`,
        'utf8'
      );
      return JSON.parse(data);
    } catch (err) {
      console.error(`Error reading file from disk: ${err}`);
    }
  }
}
