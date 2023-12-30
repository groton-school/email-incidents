import cli from '@battis/qui-cli';
import path from 'path';

const args = cli.init({
  args: {
    options: {
      target: {
        short: 't',
        description: 'Target directory for asset files',
        default: 'assets'
      }
    }
  }
});

args.positionals.forEach((fileName) => {
  cli.shell.cp('-R', path.resolve(fileName), path.resolve(args.values.target));
});
