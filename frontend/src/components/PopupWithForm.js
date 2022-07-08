import Popup from './Popup';
function PopupWithForm(props) {
  return (
    <Popup {...props} containerType="form">
      <h2 className="popup__title">{props.title}</h2>
      <form name={props.name} className="popup__form" onSubmit={props.onSubmit}>
        {props.children}
        <input
          className="popup__submit-btn"
          type="submit"
          value={props.submitValue}
        />
      </form>
    </Popup>
  );
}

export default PopupWithForm;
