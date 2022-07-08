import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Card(props) {
  // подписываем на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  //получаем нужные данные, чтобы вставить в рахметку
  const { name, link, likes } = props.card;
  function handleClick() {
    props.onCardClick(props.card);
  }
  //делаем кнопку удаления на собственных карточках (сравниваем айди)
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `${
    isOwn ? 'elements__delete' : 'elements__delete_hidden'
  }`;
  //функция удаления карточки (пришла из мэйн)
  function handleCardDelete() {
    props.onCardDelete(props.card);
  }
  //лайки крутятся
  //сверяем айди
  const isLiked = props.card.likes.some((like) => like._id === currentUser._id);
  //делаем смену класса для иконки
  const cardLikeButtonClassName = `elements__like-icon ${
    isLiked ? 'elements__like-icon_liked' : ''
  }`;
  //функция нажатия на лайк (пришла из main пропсом)
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <div className="elements__element">
      <button
        type="button"
        onClick={handleCardDelete}
        className={cardDeleteButtonClassName}
      ></button>
      <img
        className="elements__photo"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <div className="elements__caption">
        <h2 className="elements__name">{name}</h2>
        <div className="elements__like-container">
          <button
            type="button"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
          ></button>
          <div className="elements__like-counter">{likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
