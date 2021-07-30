# Что это?
 - Тестовое задание для E-soft - ToDo-list
# Используемые технологии:
 - backend Node.js:<br>
  `pg - PostgreSQL база данных`<br>
	`argon2 - для шифрование паролей`<br>
	`express - фреймворк web-приложений для Node.js`<br>
	`jsonwebtoken - для сохранения авторизации`<br>
	`knex - для работы с БД`<br>
	`nodemon - для удобства при разработке`<br>
	`config - для хранения значений`<br>
	`concurrently - для удобного запуска`<br>
 - frontend React:<br>
	`material-ui - для быстрой работы с фронтендом`<br>
	`react-router-dom - для навигации по сайту`
# Как этим пользоваться?
 - Клонируем репозиторий:<br>
 	`git clone https://github.com/UDecan/ToDo-list.git`
 - Переходим в появившуюся папку:<br>
 	`cd ToDo-list`
 - Устанавливаем зависимости:<br>
 	`npm run deps`
 - Используем миграции и сиды:<br>
  `Eсли на компьютере установлен PostgreSQL и в нем есть база данных todoDB (нужно создать её)`<br>
 	`npm knex migrate:down`<br>
  `knex migrate:latest`<br>
  `knex seed:run --specific=user.js`<br>
  `knex seed:run --specific=task.js`
 - Запускаем:<br>
 	`npm run localstart`<br>
# Некоторые детали
 - Пользователи прописаны в ./seeds/user. Данные от некоторых пользователей:<br>
   	`логин`: Ivan<br>
   	`пароль`: Admin123<br>

    `логин`: Nikola<br>
   	`пароль`: User123<br>
