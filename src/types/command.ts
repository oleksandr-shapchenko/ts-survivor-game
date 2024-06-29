import {CommandParams} from './command-params';

export interface Command {
  i18nKey: string;
  resultI18nKey: string;
  execute(commandParams: CommandParams): void;
}
