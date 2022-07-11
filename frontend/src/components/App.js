import '../App.css';
import { Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import ImagePopup from './ImagePopup';
import { Api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import { Switch } from 'react-router-dom';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { authorize, register, getMe, BASE_URL } from '../utils/auth';
import { useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

function App() {
  //переменные состояния видимости попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({}); // попап открытия полноразмерной картикии
  //создание стейта для currentUser
  const [currentUser, setCurrentUser] = useState({});
  //устанавливаем стейты для того, чтобы получить ответ от апи инфо о юзере и исходных карточках
  const [cards, setCards] = useState([]);
  //стейт логина
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  //попап открытия Tooltip
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  //статус успеха операции для Tooltip
  const [status, setStatus] = useState('');
  //установка емейла для зареганного юзера
  const [currentEmail, setCurrentEmail] = useState('');
  //устанавливаем токен
  const [token, setToken] = useState(localStorage.getItem('token'));
  //instance api клиента
  const [api, setApi] = useState(null);

  //создаем апи каждый раз с новым токеном
  function createApi(token) {
    setApi(
      new Api({
        baseUrl: BASE_URL,
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    );
  }
  //ПРОВЕРКА ТОКЕНА И установка емейла при заходе
  useEffect(() => {
    if (token) {
      getMe(token)
        .then((res) => {
          if (res) {
            createApi(token);
            setCurrentEmail(res.email);
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((userData) => {
          // просим сервер прислать информацию о юзере
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
      api
        .getInitialCards()
        .then((cardsFromServer) => {
          //забираем массив карточек чтобы вставить их в разметку, используя компонет Card (вставляет данные с карточек в разметку)
          cardsFromServer.reverse(); //меняем порядок карточек
          setCards(cardsFromServer);
        })
        .catch((err) => {
          console.log(err);
        });
      history.push('/');
    }
  }, [loggedIn]);

  //функции переключения попапов на окрытие
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function InfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }
  // обработч ик нажатия эскейп
  const onKeydown = ({ key }) => {
    if (key === 'Escape') {
      closeAllPopups();
    }
  };

  //обновляем информацию о юзере
  function handleUpdateUser({ name, about }) {
    return api
      .updateProfile(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    return api
      .updateAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //КАРТОЧКИ

  // Лайки и дизлайки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((like) => like === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((c) => c._id !== card._id);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Добавлениие новой карточкии
  function handleAddPlaceSubmit({ name, link }) {
    return api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //ЗАЛОГИНИМСЯ

  //авторизируемся зачем-то в апп а не в компоненте логин
  function handleAuthorize(email, password) {
    return authorize({ email, password })
      .then(({ token }) => {
        setToken(token);
        createApi(token);
        setCurrentEmail(email);
        setLoggedIn(true);

        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        setStatus('error');
        InfoTooltipOpen();
        throw err;
      });
  }

  //РЕГИСТРАЦИЯ  тоже зачем-то в апп
  function handleRegister(email, password) {
    return register({ email, password })
      .then((res) => {
        setStatus('succes');
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);

        setStatus('error');
      })
      .finally(() => InfoTooltipOpen());
  }
  //LOG OUT
  function handleLogout() {
    localStorage.removeItem('token');
    setApi(null);
    setToken('');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header onLogout={handleLogout} email={currentEmail} />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />

            <Route path="/sign-in">
              <Login onAuthorize={handleAuthorize} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
          </Switch>
          {loggedIn && <Footer />}

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onKeydown={onKeydown}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            onKeydown={onKeydown}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onKeydown={onKeydown}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onKeydown={onKeydown}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            status={status}
            onKeydown={onKeydown}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
