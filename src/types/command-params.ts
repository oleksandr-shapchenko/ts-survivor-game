import {GameState} from '../game-state';
import {Character} from '../character';

export interface CommandParams {
  gameState: GameState;
  character: Character;
}
