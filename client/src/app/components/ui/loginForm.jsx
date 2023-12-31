import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError, login } from "../../store/users";

const LoginForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    stayOn: false
  });
  const loginError = useSelector(getAuthError());
  const [formError, setFormError] = useState({});
  const dispatch = useDispatch();

  const handleChangeForm = (target) => {
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorCongig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязательна для заполнения"
      }
    }
  };

  useEffect(() => {
    validate();
  }, [formData]);

  const validate = () => {
    const error = validator(formData, validatorCongig);
    setFormError(error);
    return Object.keys(error).length === 0;
  };

  const isValid = Object.keys(formError).length === 0;

  const handleSend = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/";
    dispatch(login({ payload: formData, redirect }));
  };

  return (
    <form onSubmit={handleSend}>
      <TextField
        label="Email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChangeForm}
        error={formError.email}
      />
      <TextField
        label="Пароль"
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChangeForm}
        error={formError.password}
      />
      <CheckBoxField
        value={formData.stayOn}
        name="stayOn"
        onChange={handleChangeForm}
      >
        Оставаться в системе
      </CheckBoxField>
      {loginError && <p className="text-danger">{loginError}</p>}
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Отправить
      </button>
    </form>
  );
};

export default LoginForm;
