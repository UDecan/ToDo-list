function validate(login) {
  /*
    Пример ограничений входа в систему:
     1) длина от 4 до 32 ch.
     2) использовать англ. только буквы, цифры и '-' '_'
  */
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
  if (login.length < 4 || login.length > 32) {
    return false;
  }

  const arr = login
    .split("")
    .filter((ch) => alphabet.includes(ch) || !Number.isNaN(+ch)); // login в массив символов

  if (arr.length !== login.length) {
    // login содержит запрещенные символы
    return false;
  }

  return true;
}

module.exports.middleware = (req, res, next) => {
  const login = req.body && req.body.login;
  if (login) {
    if (validate(login)) {
      return next();
    } else {
      return res.status(400).json(new Error("Validation error: invalid login"));
    }
  } else {
    return res
      .status(500)
      .json(new Error("Validation error: no login provided"));
  }
};

module.exports.validate = validate;
