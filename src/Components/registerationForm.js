import React, { useReducer } from "react";
import { Field, reduxForm } from "redux-form";
import {
  isEmail,
  isAlphabet,
  isRequired,
  submit,
  validateIban
} from "../Utils/validation";
import { initialState, successAlertDuration } from "../Utils/constants";
import renderField from "./renderField";

function RegisterationForm(props) {
  const { handleSubmit, submitting, onChange, submitSucceeded, reset } = props;
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState
  );
  const handleChange = event => {
    const name = event.target.name;
    const newValue = event.target.value;
    setUserInput({ [name]: newValue });
  };
  const handleSuccess = () => {
    //set success popup for 3 seconds then reset the form
    setTimeout(() => {
      setUserInput(initialState);
      reset();
    }, successAlertDuration);
  };

  submitSucceeded && handleSuccess();

  return (
    <>
      <div className="card rounded-0">
        <div className="card-header text-center">
          <h3 className="mb-0 ">Register Account</h3>
        </div>
        <div className="card-body">
          {submitSucceeded && (
            <div className="alert alert-success" role="alert">
              Form Submitted Successfully
            </div>
          )}
          <form className="form" id="formLogin" onSubmit={handleSubmit(submit)}>
            <div className="form-group">
              <Field
                name="firstName"
                type="text"
                component={renderField}
                label="First Name"
                validate={[isAlphabet, isRequired]}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <Field
                name="lastName"
                type="text"
                component={renderField}
                label="Last Name"
                validate={[isAlphabet, isRequired]}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <Field
                name="email"
                type="email"
                component={renderField}
                label="Email"
                validate={[isEmail, isRequired]}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <Field
                name="iban"
                type="text"
                component={renderField}
                label="IBAN"
                validate={[isRequired]}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning btn-lg float-right"
              id="btnLogin"
              disabled={submitting || submitSucceeded}
            >
              Submit!
            </button>
          </form>
        </div>
      </div>
      <div className="card rounded-0 p-4">
        <p>
          <b>First Name : </b>
          {userInput.firstName}
        </p>
        <p>
          <b>Last Name : </b>
          {userInput.lastName}
        </p>
        <p>
          <b>Email : </b>
          {userInput.email}
        </p>
        <p>
          <b>IBAN : </b>
          {userInput.iban}
        </p>
      </div>
    </>
  );
}
RegisterationForm = reduxForm({
  form: "fieldLevelValidation",
  asyncValidate: validateIban,
  asyncBlurFields: ["iban"]
})(RegisterationForm);
export default RegisterationForm;
