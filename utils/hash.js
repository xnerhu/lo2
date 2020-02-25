const { hash } = require('bcrypt');

(() => {
  const password = process.argv[2];
  let rounds = 12;

  if (!password) {
    return console.log('Please, enter a password as an argument');
  }

  if (process.argv[3]) {
    const _rounds = parseInt(process.argv[3]);

    if (!Number.isSafeInteger(_rounds)) {
      return console.log('Rounds must be a number!');
    }

    rounds = _rounds;
  }

  hash(password, rounds, (err, encrypted) => {
    if (err) throw err;
    console.log(encrypted);
  });
})();
