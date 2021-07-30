# Что это?
 - Тестовое задание для E-soft - ToDo-list
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
