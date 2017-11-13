import chalk from 'chalk';

export class Errors {

  public static GAME_UPDATING = 'The game is being updated';
  public static NOT_FOUND = 'Endpoint not found';
  public static NO_RESPONSE = 'No response received from fpl';

  public static log(message, path, reject) {
    console.error(chalk.red(`fpl-api-node: ${message} (https://fantasy.premierleague.com/drf${path})`));
    reject(message);
  }

}
