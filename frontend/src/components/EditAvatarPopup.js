import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputRef = useRef();

  //открытие пустого попапа
  useEffect(() => {
    if (props.isOpen) {
      inputRef.current.value = '';
    }
  }, [props.isOpen]);
  //функция сабмита
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      submitValue="Сохранить"
      onKeydown={props.onKeydown}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          id="link-input"
          className="popup__input"
          placeholder="Ссылка на картинку"
          type="url"
          ref={inputRef}
          name="link"
          required
        />
        <span className="popup__input-error link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
