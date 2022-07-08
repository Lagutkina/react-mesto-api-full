import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  //подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  //задаем стейты имени и описания и вешаем обработчикии изменения стейта
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function nameChange(evt) {
    setName(evt.target.value);
  }
  function descriptionChange(evt) {
    setDescription(evt.target.value);
  }
  //связываем контекст юзера и управляемые компоненты
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  //обновление данных формы
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="profile_edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitValue="Сохранить"
      onKeydown={props.onKeydown}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          id="name-input"
          className="popup__input"
          type="text"
          value={name || ''}
          onChange={nameChange}
          name="name"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          required
        />
        <span className="popup__input-error name-input-error"></span>
      </div>
      <div className="popup__field">
        <input
          id="about-input"
          className="popup__input"
          type="text"
          value={description || ''}
          onChange={descriptionChange}
          name="about"
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          required
        />
        <span className="popup__input-error about-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
