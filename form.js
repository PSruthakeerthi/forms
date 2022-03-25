import React, { useState, useEffect } from "react";

function validation(values) {
  const errors = {};
  const regex = /(^$|^.*@.*\..*$)/;
  if (!values.username) {
    errors.username = "User Name is required";
  }
  if (!values.email) {
    errors.email = "E-mail is required";
  } else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password should not be less than 4 characters";
  } else if (values.password.length > 10) {
    errors.password = "Password cannot exceed 10 characters";
  }
  console.log(values.consent);
  if (!values.consent) {
    errors.consent = "Accept terms and conditions";
  } else {
    errors.consent = "";
  }

  return errors;
}

function Form() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    consent: false
  };
  const [formValues, setFormValues] = useState(initialValues);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validation(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);
  return (
    <>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <div>
          <label>User Name</label>
          <input
            id="name"
            name="username"
            type="text"
            placeholder="Name"
            value={formValues.username}
            onChange={handleChange}
          />
        </div>
        <p style={{ color: "red" }}>{formErrors.username}</p>

        <div>
          <label>E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
        <p style={{ color: "red" }}>{formErrors.email}</p>

        <div>
          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
          />
        </div>
        <p style={{ color: "red" }}>{formErrors.password}</p>

        <div>
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={formValues.consent}
            onChange={handleChange}
          />
          <label>I agree</label>
        </div>
        <p>{formErrors.consent}</p>
        <button>Sign Up</button>
      </form>
    </>
  );
}

export default Form;
