function validate(password) {
  /*
    Пример ограничения пароля:
     1) длина от 4 до 32 ч.
     2) должен включать как нижний, так и верхний регистр
     3) должен включать буквы и цифры
     4) использовать англ. Только буквы
  */
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const extras = "!@#$%^&*()_+=-:;.,/'\\\" ?><`~№";
  if (password.length < 4 || password.length > 32) {
    return false;
  }

  const arr = password
    .split("")
    .filter(
      (ch) =>
        [...alphabet, ...ALPHABET, ...extras].includes(ch) || !Number.isNaN(+ch)
    ); // пароль к массиву символов

  if (arr.length !== password.length) {
    // пароль содержит запрещенные символы
    return false;
  }

  return Boolean(
    arr.find((ch) => alphabet.includes(ch)) &&
      arr.find((ch) => ALPHABET.includes(ch)) &&
      arr.find((ch) => !isNaN(+ch))
  );
}

module.exports.middleware = (req, res, next) => {
  const pwd = req.body && req.body.password;
  if (pwd) {
    if (validate(pwd)) {
      return next();
    } else {
      return res
        .status(500)
        .json(new Error("Validation error: invalid password"));
    }
  } else {
    return res
      .status(500)
      .json(new Error("Validation error: no password provided"));
  }
};

module.exports.validate = validate;
