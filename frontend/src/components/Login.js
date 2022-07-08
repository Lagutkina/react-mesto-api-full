import { useState } from 'react';
function Login(props) {
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

    props
      .onAuthorize(values.email, values.password)
      .then(() => {
        setValues({ email: '', password: '' });
      })
      .catch((err) => console.log(err)); // запускается, если пользователь не найден
  }

  return (
    <div className="entry">
      <h2 className="entry__title">Вход</h2>
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
        <input className="entry__submit-btn" type="submit" value="Войти" />
      </form>
    </div>
  );
}

export default Login;
