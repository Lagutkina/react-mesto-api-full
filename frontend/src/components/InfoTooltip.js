import succes from '../images/succes.svg';
import error from '../images/error.svg';
import Popup from './Popup';
function InfoTooltip(props) {
  return (
    <Popup {...props} containerType="tip">
      <img
        className="popup__status-pic"
        alt="успех"
        src={props.status === 'succes' ? succes : error}
      ></img>
      <div className="popup__status-message">
        {props.status === 'succes'
          ? 'Вы успешно зарегистрировались!'
          : 'Что-то пошло не так! Попробуйте ещё раз.'}
      </div>
    </Popup>
  );
}
export default InfoTooltip;
