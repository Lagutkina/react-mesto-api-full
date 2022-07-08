import { useHistory, useRouteMatch } from 'react-router-dom';
import headerLogo from '../images/headerLogo.svg';
function Header(props) {
  const history = useHistory();
  const matchMain = useRouteMatch({ path: '/', exact: true });
  const matchSignin = useRouteMatch('/sign-in');
  const matchSignup = useRouteMatch('/sign-up');
  return (
    <header className="header">
      <div className="header__logo">
        <img alt="логотип" src={headerLogo} />
      </div>
      {matchMain && (
        <div className="header__mainplank">
          <div className="header__email">{props.email}</div>
          <div className="header__button" onClick={props.onLogout}>
            Выйти
          </div>
        </div>
      )}
      {matchSignin && (
        <div
          className="header__button"
          onClick={() => history.push('/sign-up')}
        >
          Регистрация
        </div>
      )}
      {matchSignup && (
        <div
          className="header__button"
          onClick={() => history.push('/sign-in')}
        >
          Войти
        </div>
      )}
    </header>
  );
}

export default Header;
