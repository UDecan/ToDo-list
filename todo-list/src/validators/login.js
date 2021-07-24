const validateLogin = (login) => {
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

export { validateLogin as default };