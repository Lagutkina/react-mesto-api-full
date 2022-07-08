import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
function AddPlacePopup(props) {
  const [photoName, setPhotoName] = useState('');
  const [photoLink, setPhotoLink] = useState('');

  function photoNameChange(evt) {
    setPhotoName(evt.target.value);
  }
  function photoLinkChange(evt) {
    setPhotoLink(evt.target.value);
  }
  //открытие пустого попапа
  useEffect(() => {
    if (props.isOpen) {
      setPhotoName('');
      setPhotoLink('');
    }
  }, [props.isOpen]);
  //обработчик - оптправляем данные
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: photoName,
      link: photoLink,
    });
  }

  return (
    <PopupWithForm
      name="element_add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitValue="Создать"
      onKeydown={props.onKeydown}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          id="photo-name-input"
          className="popup__input"
          placeholder="Название"
          type="text"
          value={photoName || ''}
          onChange={photoNameChange}
          name="photo-name"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__input-error photo-name-input-error"></span>
      </div>
      <div className="popup__field">
        <input
          id="photo-link-input"
          className="popup__input"
          placeholder="Ссылка на картинку"
          type="url"
          value={photoLink || ''}
          onChange={photoLinkChange}
          name="photo-link"
          required
        />
        <span className="popup__input-error photo-link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
