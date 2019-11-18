import { reduxForm } from "redux-form";
import { validateIban } from "../Utils/validation";
import RegisterationForm from "../Components/registerationForm";

const registerationFormContainer = reduxForm({
  form: "fieldLevelValidation",
  asyncValidate: validateIban,
  asyncBlurFields: ["iban"]
})(RegisterationForm);

export default registerationFormContainer;
