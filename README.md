В работе.
[backend](https://github.com/Tryd0g0lik/cloud)

## Обзор
Аналогом '`.env`'файла можно назвать файл '`src\interfaces.ts`'.\
В коде он представлен как '`import { .... } from "@Interfaces"`'.\
Один из примеров - API маршруты представленные во многих сценариях.
```ts
export enum UserAPI {
  BASIS = "/api/v1/users/",
  CHOICE = "/api/v1/users/choice/",
  CHOICE_PK = "/api/v1/users/choice/:userId/",
  PATCH = "/api/v1/users/patch/",
  PATCH_PK = "/api/v1/users/patch/:userId/",
  GETofAPI = "/api/v1/users/get/",
  FILES = "/api/v1/files/",
  FILES_PK = "/api/v1/files/:userId/", // :userId - replace to the id: string of the string
  FILESREMOVE_PK = "/api/v1/files/:userId/remove/", // :userId - replace to the id: string of the string
  FILESCOMMENT_PK = "/api/v1/files/:userId/update_comment/", // :userId - replace to the id: string of the string
  REFERRAL_LINKS = "/api/v1/files/:userId/referral_links/", // :userId - replace to the id: string of the string
  FILESRENAME_PK = "/api/v1/files/:userId/rename/",
  ADMIN_GET_ALLREVIEW = "/api/v1/admins/choice/",
}
```
Если в '`.env`' возможно что-то изменить то на содержимое в '`@Interfaces`' ориентируется и с ним сверяются многие сценарии. \
Изменение чего либо грозит поломкой интерфейса.

## Регистрация
![error form registration](./img/formRegistration.png)\
Форма возвращает ошибки если данные введены не верно.

Если пользователь иметтся с таким email, то под формой видим сообщие.

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


#### handlerLogin() дочерная функция.
Делает запрос в cookie и получает значение ключа "`is_session`".\
Если значение есть `true` - пользователь на сайте активирован.

Значит, по шаблону "`/user_session_< user id >/`" получаем имя ключа. Из ключа получаем \
номер `id` (под которым он есть в БД (Базе Данных)).\
"`id`" шифруем и сохраняем с клю.чем "`session`" в "`localstorage`".

- [класс для шифрования](src\services\encrypts.ts).

# Активация
![medssage](/img/errorMessingForm.png) \
Два варианта авторизации. 
При авторизации на сервер, синхронно отправляется 2 запроса. Это вариант кодгда из \
прошлых посещений cookie сохранил данные пользователя. У нас есть индекс. \
На сервере по индексу получаем хеш-ключ. Сравниваем его с тем, что поступил их браузера.
1. Получаем токен.
2. Отправляем данные для авторизации.
**Note**: Если это повторная авторизация , то пользователя (*и ключ*) берем из cookie

## COOOKIE если чистый в браузере

На случай если cookie пустой (*браузер почистили*), отправляем синхронно 3 запроса.  
1. Получаем токен.
2. Берем email из формы.  [Шифруем и отправляем на сервер](src\services\request\loginout.ts) (*`AES.encrypt` `ENCRYPT`*).  
3. Отправляем данные для авторизации. Главное, у нас есть индекс. \
Там перебираем базу пользователей в поике данных по email.\
Сравниваем хеш паролей.

**Note**: 
1. База данных имеет два вида кеша. Для паролей. Для ключа польхователя.
1. Кеш каждого вида/типа/категории (*не пользователя*) имеет свой шаблон маски.
1. Для определения пользователя (*если cookie пустой*), данные берем из формы и на сервере сверяем пароли кешированные.

**Note**:
1. Для ключа пользователя, на сервере есть отдельный поток для обновления (*с интервалом в 30 минут*).
1. Отбор пользователй для обработки проходит только тех кто имеет статус - активный и от последнего времени логирования прошло 1 и более 1-ого дня.
1. Совершаея переход между страницами сревиса, cookie браузера обновляется. Вместе с ним обновляется и ключ пользователя.
1. Для активации (при совершении событий CRUD) берем ключ и сравниваем его с тем, что хранится на сервере.
1. Пользователь сам выйдет из профиля (*`logout`*) или не будет совершать ни каких событий в течение суток - в базе данных обновляется статус (*`is_Active`= `False`*) при заагрузки страницы.
1. Загружаясь (*спустя сутки*), браузер запрашивает из cookie статуc пользователя и получая `False`, попадаем на главную.

## Счётчик
 В сервис [заложен счетчик](src\services\counter.ts), чтоб отслеживать колличество ОТКРЫТЫХ/ЗАКРЫТЫХ вкладок. Только счетчик! Идея такова , чтоб при закрытии последней вкладыки с облаком, на сервер отправляется запрос и в базе данных пользователь де-активируется.\
В данный момент, пользователя держим в активированном состоянии, в не зависимости от  интервала между посещение сервиса. Деактивируем, когда пользователь сам нажмет на `logout`.

# Priofile
CRUD - выполнен частично.

После успешной авторизации:
- cookie браузера получает данные;
- пользователь редиректом попадет на страницу профиля. 

## Редактируем 

Два поля:
- `username`;
- `firstname` которые пользователь может редактировать. 

- `email` и `password` просто заложены в логику, но не отработаны.

![crud of profile](./img/profileCrud.png)

# Files

- '`Num`' номер строки в которой опубликован файл;
- '`Name-file`' Имя файла;
- '`Comments`' комментарий к файлу;
- '`Date-loaded`' загрузка файла пользователем;
- '`Date-downloaded`' дата когдафайл был был скача в последний раз;
- '`Pablic-ref`' ссылка чтоб поделиться.

![Loader files](./img/loaderFiles.png)\

Загружая файлы на сервер:
- любой формат;
- по одлному;
- создаваю копию файла и лишь переименовав файл, на сервере остаётся первично загруженный файл. Дубликат удаляется. \
Хагрузить дубликат возможно при условии когда в нем будут изменения. Файлы проходят проверку через старый hash md5;
- при удачной и не удачной загрузки , в странице облака видим сообщение.

![Loader files](./img/loaderFilesNoOk.png)\

## Note:
Будьте остарожные с сервером. На сервере  редактирование пароля и email не закладывалось в логику.\
В модели базы данных свойство - уникальные поля и на них "основывается мир". \
В ТЗ нет задания (для пароля и email).
 
## Облако Файлов

![cloud files](./img/files.png) 

Верхнее меню только для авторизованных публикует меню выподающих ссылок "Облако".\
В раскрытом режиме видим "Мои файлы". Кликая по меню  - открывается таблица файлов пользователя. 

## Удалить файл

![delete file](./img/deleteFiles.png)\

Пользователь может выбрать любое количество файлов или все разом. Нажимая на \
кнопку "Delete" удаляется. \
- выбираете один или все разом, на сервер отправляется в формате списка. \
- не зависимо от количества или размера файла, под каждый файл создается \
отдельная задача и после запускаются в отдельном потоке для удаления. Поэтому\
ответ от сервера ждать не приходится и возвращается уже обновленный.

## Коментарии к файлу

![file comment](./img/filesComment.png)\

Загрузив  файл возможно добавитьсвой комментарий или оставить ячейку пустой.\
При желании комментарии возможно изменить. Кликаем по комментарию и в ячейке получаем поле для внесения нового  комментария. \
При нажатии на клавишу 'Enter' новый комментарий отправляется на сервер и \
в ячейка видим обновленный комментарий.

## Закгрузка файла
Дата загрузи подставляется по умолчанию на момент загрузки. \
Не редактируется.

## Поделиться ссылкой

Пользователь может поделиться ссылкой изпользуя кнопку "Поделться ссфлкой". 

![Button](./img/referral_link.png)

Клик по "Поделться ссфлкой" сформирует "referral link".

![referral link](./img/referral_link_anchor.png)

Клик по "referral link" скопирует ссылку в буфер.
Дополнительно фидим сообщение - скопирована ссылка или нет.

![referral alter](./img/referral_link_alter.png)

Через 5 секунда сообщение пропадет.

После того как воспользовались ссылкой, для скачивания, видим дату скачивания.

## Переименовать файл

![file's name rename](./img/filesRenamet.png)


Файл возможно переименовать.\
Кликаем по имени файла и в ячейке получаем поле для внесения нового  имени. \
При нажатии на клавишу 'Enter' новое имя отправляется на сервер и \
в ячейка видим обновленное имя файла.

- Если в базе файл с таким именем существует, всплывает сообщение об ошибке. 
- расширение файла возможно переименовать.
- файл с одинаковым именем, но с разным расшиирением всплывает сообщение - всё ОК.  

## Администратор
Пользователь который имеет разрешения администратора, на главной видит общий обзор данных по облаку.

![general review](./img/reviewGeneralData.png);

Первая сводная строка:
 -'`Files`' количество файлов на сервере;
 - '`Users`' количество пользователей на сервере;
 - '`Downloaded`' количество файлов скаченных. Данное количество не указывает - сколько раз скачивался файл.

 ![review](./img/reviews.png)

Сводная таблица:
 - '`User ID`' - название говорит само за себя;
 - '`User Name`' - название говорит само за себя;
 - '`Quantity files of user`' - количество файло у пользователя:

![reviw table](./img/reviews-table.png)

 
### Интерфейс администратора в профиле пользователя
В сводной таблице кликаем по Имени пользователя - получаем профиль пользователя.
 - редактирование имени.

### Интерфейс администратора c файлами
В сводной таблице кликаем по количеству файлов пользователя - получаем файлы пользователя .
 - [базовый интерфейс для личного профиля](#интерфейс-пользователя-c-файлами);
 - получение сводных данных по сервису в виде таблиц:
 - [x] количество файлов на сервере (сводная строка);
 - [x] количество пользователей на сервере (сводная строка);
 - [x] количество файлов скаченных. Данное количество не указывает - сколько раз скачивался файл (сводная строка);
 - [x] '`User ID`'  (сводная таблица);
 - [x] '`User Name`' - ссылка для переходя в профиль пользователя (сводная таблица);
 - [x] '`Quantity files of user`' - ссылка для переходя к файлам пользователя (сводная таблица).
 - [базовый интерфейс для файлов](#интерфейс-пользователя-c-файлами) из профиля пользователя;

### Note
- Получить профиль и файлы пользователя только с главной страницы.
- фильтр, для свойдной страницы не обсуждался.
 
## Интерфейс пользователя c файлами
- загрузка файла
- список файлов
- удалить файл
- переименовать файл
- обновить комментарий к файлу
- генерация специальной ссылки
- скачать файл по специальной ссылке.



### Note
Списки файлов, администратор получает по маршруту '`/admins/to/profile/files/< usder id >/`':
- к базовым локальным маршрутам добавляем '`/admins/to/....`';
- '`< usder id >`' - id пользователя данные которого хотим получить.

Если администратор, по локации с маршрутом '`/admins/to/....< usder id >/`'  воспользуется формой загрузки файлов - файл загрузиться в коллекцию администратора.\
Без согласия пользователя (с номером id '`< usder id >`' ) загрузка файлов на имя пользователя не возможна.



 
