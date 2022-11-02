export default {
  translation: {
    pages: {
      chat: {
        channels: 'Каналы',
        messageInput: 'Введите сообщение...',
        messagesCount: {
          message_one: '{{count}} сообщение',
          message_few: '{{count}} сообщения',
          message_many: '{{count}} сообщений',
        },
        removeOption: 'Удалить',
        renameOption: 'Переименовать',
      },
      login: {
        title: 'Войти',
        nickname: 'Ваш ник',
        password: 'Пароль',
        loginBtn: 'Войти',
        noAccInquiry: 'Нет аккаунта?',
        signupLink: 'Регистрация',
      },
      signup: {
        title: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        signupBtn: 'Зарегистрироваться',
      },
      notFoundPage: {
        notFound: 'Страница не найдена',
        goToText: 'Но вы можете перейти',
        linkToChat: 'на главную страницу',
      },
    },
    modals: {
      addChannel: 'Добавить канал',
      renameChannel: 'Переименовать канал',
      removeChannel: 'Удалить канал',
      confirmRemoval: 'Уверены?',
      cancelBtn: 'Отменить',
      sendBtn: 'Отправить',
      removeBtn: 'Удалить',
    },
    topNavbar: {
      chatLink: 'Hexlet Chat',
      logoutBtn: 'Выйти',
    },
    errors: {
      wrongCredentials: 'Неверные имя пользователя или пароль',
      alreadyRegistered: 'Такой пользователь уже существует',
    },
    formWarnings: {
      requiredField: 'Обязательное поле',
      minPasswordLength: 'Не менее 6 символов',
      nameLength: 'От 3 до 20 символов',
      notMatched: 'Пароли должны совпадать',
      mustBeUnique: 'Должно быть уникальным',
    },
    hiddenTexts: {
      channelName: 'Имя канала',
      controlChannel: 'Управление каналом',
      send: 'Отправить',
      newMessage: 'Новое сообщение',
    },
    toasts: {
      added: 'Канал создан',
      renamed: 'Канал переименован',
      removed: 'Канал удалён',
      noConnection: 'Ошибка соединения',
      unknownError: 'Неизвестная ошибка',
    },
  },
};
