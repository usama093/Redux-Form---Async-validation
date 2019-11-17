import { SubmissionError } from "redux-form";
import axios from "axios";
import { baseUrl } from "./constants";

axios.interceptors.response.use(
  response => response,
  error => {
    const status = error.response ? error.response.status : null;
    if (status === 500) {
      return axios.request(error.config);
    }

    return Promise.reject(error);
  }
);

export const isRequired = value =>
  value || typeof value === "number" ? undefined : "is Required";

export const isAlphabet = value =>
  value && !/^[A-Za-z]+$/.test(value) ? "alphabets only" : undefined;

export const isEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "is Invalid"
    : undefined;

export const validateIban = async ({ iban }) => {
  try {
    const response = await axios.post(baseUrl, { iban });
    if (!(await response.data)) {
      throw { iban: " is Invalid" };
    } else {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const submit = values => {
  if (
    isRequired(values.firstName) !== undefined &&
    isAlphabet(values.firstName) !== undefined
  ) {
    throw new SubmissionError({
      error: "Invalid First Name!"
    });
  } else if (
    isRequired(values.lastName) !== undefined &&
    isAlphabet(values.lastName) !== undefined
  ) {
    throw new SubmissionError({
      error: "Invalid Last Name!"
    });
  } else if (
    isRequired(values.email) !== undefined &&
    isEmail(values.email) !== undefined
  ) {
    throw new SubmissionError({
      error: "Invalid  Email!"
    });
  } else if (!validateIban(values)) {
    throw new SubmissionError({
      error: "Invalid  IBAN"
    });
  }
  return Promise.resolve();
};
