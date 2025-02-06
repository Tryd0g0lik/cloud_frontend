В работе.

[backend](https://github.com/Tryd0g0lik/cloud)
## Регистрация
При регистрации, на почту поступает ссылка. Кликая по ссылке, из сообщения, \
подтверждаете email.

После клика , срабатывает 301 код (на сервере) и пользователя пребрассывает на "Главная".\
URL дополнен паррамертрами:
- "`is_session_< user-id >`";
- "`user_session_< user-id >`";
- "`is_active`".

Данные [созраняются](src\components\NavbarTop\index.tsx) в [cookie](src\services\cookieServices.ts).\
**Note**: Изначально строка не имеет временной отметки.

### Login
На cookie ориентируемся для активаци ("`is_active`"). пользователя.\

Каждая загрузка страницы, ориентируясь на "`is_active`", запускает \
параллельно ("`Promise`") две задачи:
 - "`handlerLogin()`";
 - "`changeDOM(true)`" В "`DOM`" добавляет класс "`active`" & "`div#root.active`" или \
 удаляет "`div#root`" если  "`changeDOM(false)`";

**Note:** По умолчанию, входная точка из [changeDOM()](src\services\scripts.ts) имеет значение "`false`".

### handlerLogin()
Может запускаться по событию (уточнить !!!!!) \

#### handlerLogin() дочерная функция.
Делает запрос в cookie и получает значение ключа "`is_session`".\
Если значение есть `true` - пользователь на сайте активирован.

Значит, по шаблону "`/user_session_< user id >/`" получаем имя ключа. Из ключа получаем \
номер `id` (под которым он есть в БД (Базе Данных)).\
"`id`" шифруем и сохраняем с клю.чем "`session`" в "`localstorage`".

- [класс для шифрования](src\services\encrypts.ts).

# Forms
![medssage](/img/errorMessingForm.png)

# COOOKIE если чистый в браузере
Если вдруг, авторизуемся, а cookie чистый.\
Обычно из куки берем индекс жадее идем на серверс.\ 
сверяем. Но главное это "`index`". \
Обчно , синхронно отправляется 2 запроса для авторизации.
1. Получаем токен.
2. Отправляем данные для авторизации.

На случай если cookie пустой, отправляем синхронно 3 запроса.  
1. Получаем токен.
2. Берем email из формы. [Шифруем и отправляем на сервер](src\services\request\loginout.ts).\ Тут работаем `// ENCRYPT` с шифрованием данных для отправки на сервер, с целью востановить индекс. 

3. Отправляем данные для авторизации. Главное, у нас есть индекс.








