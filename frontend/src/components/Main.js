import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card';

function Main(props) {
  // подписываем на контекст CurrentUserContext
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__photo-container">
          <img
            className="profile__photo"
            alt="фото профиля"
            src={currentUser.avatar}
          />
          <div
            onClick={props.onEditAvatar}
            className="profile__photo-change"
          ></div>
        </div>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__about">{currentUser.about}</p>
          </div>
          <button
            onClick={props.onEditProfile}
            type="button"
            className="profile__edit-btn"
          ></button>
        </div>
        <button
          onClick={props.onAddPlace}
          type="button"
          className="profile__add-btn"
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            key={card._id}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
