import { useEffect } from 'react';
function Popup(props) {
  // c помощью useEffect цепляем обработчик к нажатию клавиш

  useEffect(() => {
    if (props.isOpen) {
      document.addEventListener('keydown', props.onKeydown);
    }
    return () => document.removeEventListener('keydown', props.onKeydown);
  }, [props.isOpen]);

  return (
    <div
      id={`popup_${props.name}`}
      className={`popup ${props.isOpen ? 'popup_open' : ''}`} //пропс isOpen ставится каждому попапу в апп
    >
      <div
        className={`popup__container popup__container_type_${props.containerType}`}
      >
        <button
          type="button"
          onClick={props.onClose}
          className="popup__close-btn"
        ></button>

        {props.children}
      </div>
    </div>
  );
}

export default Popup;
