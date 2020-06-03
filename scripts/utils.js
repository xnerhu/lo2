const chalk = require('chalk');

const getColor = (type) => {
  switch (type) {
    case 'warning':
      return 'yellow';
    case 'error':
      return 'blue';
  }

  return 'greenBright';
};

const print = (name, message, type = 'info') => {
  const color = getColor(type);

  process.stdout.write(
    `${chalk.cyan.bold(`[${name}]`)} ${chalk[color](message)}\n`,
  );
};

const compilerPromise = (compiler) => {
  return new Promise((resolve, reject) => {
    const { name } = compiler;

    compiler.hooks.compile.tap(name, () => {
      print(name, 'Compiling');
    });

    compiler.hooks.done.tap(name, (stats) => {
      if (!stats.hasErrors()) {
        resolve();
      } else {
        print(name, 'Failed to compile!', 'error');
        reject();
      }
    });
  });
};

module.exports = {
  print,
  compilerPromise,
};
