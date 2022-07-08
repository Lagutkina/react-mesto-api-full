import Popup from './Popup';
function ImagePopup(props) {
  const { name, link } = props.card;

  return (
    <Popup {...props} isOpen={!!link} containerType="image">
      <img className="popup__image" src={link} alt={name} />
      <h2 className="popup__image-name">{name}</h2>
    </Popup>
  );
}
export default ImagePopup;
