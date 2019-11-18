import React from "react";
import chai, { expect } from "chai";
import enzyme, { shallow } from "enzyme";
import chaiEnzyme from "chai-enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";
import { isRequired, isAlphabet, isEmail } from "./Utils/validation";
import RegisterationFormContainer from "./Containers/registerationFormContainer";

enzyme.configure({ adapter: new Adapter() });

it("checks if required validation is working", () => {
  const testData = isRequired("test");
  expect(testData !== undefined);
});

it("checks if email validation is working", () => {
  const testData = isAlphabet("test");
  expect(testData === undefined);
});

it("checks if alphabet validation is working", () => {
  const testData = isEmail("123");
  expect(testData === undefined);
});
chai.use(chaiEnzyme());

describe("RigesterationFormContainer", () => {
  let subject = null;
  let submitting,
    touched,
    error,
    reset,
    handleSubmit,
    onSaveResponse,
    submit,
    submitSucceeded;
  beforeEach(() => {
    submitting = false;
    touched = false;
    error = null;
    reset = sinon.spy();
    onSaveResponse = Promise.resolve();
    handleSubmit = fn => fn;
  });
  const buildSubject = () => {
    submit = sinon.stub().returns(onSaveResponse);
    const props = {
      submitting: submitting,
      // The real redux form has many properties for each field,
      // including onChange and onBlur handlers. We only need to provide
      // the ones that will change the rendered output.
      fields: {
        firstName: {
          value: "Asaama",
          touched: touched,
          error: error
        },
        lastName: {
          value: "Afzal",
          touched: touched,
          error: error
        },
        email: {
          value: "abc@gmail.com",
          touched: touched,
          error: error
        },
        iban: {
          value: "DE89 3704 0044 0532 0130 00",
          touched: touched,
          error: error
        }
      },
      handleSubmit,
      reset,
      submitSucceeded
    };
    return shallow(<RegisterationFormContainer {...props} />);
  };

  // Here we show we can test asychronous actions triggered by our form.
  it("calls reset after onSubmit", () => {
    subject = buildSubject();
    subject.find("form").simulate("submit");
    expect(submit.callCount).to.equal(1);
    // AFTER all the form submit logic has run.
    return onSaveResponse.then(() => {
      expect(reset.callCount).to.equal(1);
    });
  });
});
