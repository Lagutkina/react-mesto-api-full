import { useState } from 'react';

function Register(props) {
  //задаем переменные формы - пароль и емейл и вешаем обработчикии изменения стейта
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(values.email, values.password);
  }

  return (
    <div className="entry">
      <h2 className="entry__title">Регистрация</h2>
      <form className="entry__form" onSubmit={handleSubmit}>
        <input
          className="entry__input"
          value={values.email}
          onChange={handleChange}
          id="email-input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="entry__input"
          value={values.password}
          onChange={handleChange}
          id="password-input"
          type="password"
          name="password"
          placeholder="Пароль"
          required
        />
        <input
          className="entry__submit-btn"
          type="submit"
          value="Зарегистрироваться"
        />
      </form>
      <a className="entry__login-link" href="/sign-in">
        Уже зарегистрированы? Войти
      </a>
    </div>
  );
}
export default Register;
