import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Joi from "joi";
import { iRegistrationForm } from "@/utils/Types";


const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Invalid email format.",
      "string.empty": "Email is required."
    }),
  name: Joi.string()
    .required()
    .messages({
      "string.empty": "Name is required."
    }),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be exactly 10 digits.",
      "string.empty": "Phone number is required."
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long.",
      "string.empty": "Password is required."
    }),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords must match.",
      "any.required": "Please confirm your password."
    }),
  accessCode: Joi.string()
    .required()
    .messages({
      "string.empty": "Access code is required."
    })
});

const SignUpForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const validate = (values: iRegistrationForm) => {
    const { error } = schema.validate(values, { abortEarly: false });
    if (!error) return {};

    const errors = {};
   
    for (const detail of error.details) {
      if (!errors[detail.path[0]]) {
        errors[detail.path[0]] = detail.message;
      }
    }
    return errors;
  };

  const initialValues: iRegistrationForm= {
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accessCode: ""
  };

  const handleSubmit = (values: iRegistrationForm) => {
    console.log("Form Data Submitted:", values);
   
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <div>
            <label htmlFor="email">Email Address:</label>
            <Field type="email" name="email" id="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <Field type="text" name="name" id="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <Field type="tel" name="phone" id="phone" />
            <ErrorMessage name="phone" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field type="password" name="password" id="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div>
            <label htmlFor="confirmPassword">Re-enter Password:</label>
            <Field type="password" name="confirmPassword" id="confirmPassword" />
            <ErrorMessage
              name="confirmPassword"
              component="div"
  
            />
          </div>
          <div>
            <label htmlFor="accessCode">Access Code:</label>
            <Field type="text" name="accessCode" id="accessCode" />
            <ErrorMessage name="accessCode" component="div" />
          </div>
          <button type="submit" disabled={submitting}>
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;