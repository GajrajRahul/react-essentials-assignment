import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "email") {
      if (value && !validateEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email",
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.email;
          return newErrors;
        });
      }
    }

    if (name === "password") {
      if (value && !validatePassword(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            "Password must contain atleast 1 lowercase, 1 uppercase, 1 number, 1 special character and must be greater than 6 characters",
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.password;
          return newErrors;
        });
      }
    }

    if (name === "confirmPassword") {
      if (value && value !== formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Confirm Password must be same as Password",
        }));
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.confirmPassword;
          return newErrors;
        });
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-+]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/;

    return passwordRegex.test(password);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setFormData((prevState) => ({ ...prevState, [name]: checked }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Please enter a password";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must contain atleast 1 lowercase, 1 uppercase, 1 number, 1 special character and must be greater than 6 characters.";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please enter the confirm password";
    } else if (formData.confirmPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password must be same as Password";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to terms and conditions";
    }

    return newErrors;
  };

  const checkValidation = () => {
    const errors = validateForm();
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      gender: "",
      agreeToTerms: false,
    });

    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // const formErrors = validateForm();

    // if (Object.keys(formErrors).length > 0) {
    //   setErrors(formErrors);
    //   return;
    // }

    const isValid = checkValidation();
    if (!isValid) {
      const firstError = document.querySelector(".error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    console.log("form submitted successfully! ", formData);
    alert("form submitted successfully! check console for form data!");
    resetForm();
  };

  return (
    <div className="app">
      <h1>User Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleFieldChange}
            className={errors.name ? "error" : ""}
            onBlur={checkValidation}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleFieldChange}
            className={errors.email ? "error" : ""}
            onBlur={checkValidation}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleFieldChange}
            className={errors.phone ? "error" : ""}
            placeholder="(+91) 123-45678"
            onBlur={checkValidation}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleFieldChange}
            className={errors.password ? "error" : ""}
            onBlur={checkValidation}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleFieldChange}
            className={errors.confirmPassword ? "error" : ""}
            onBlur={checkValidation}
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleFieldChange}
            className={errors.gender ? "error" : ""}
            onBlur={checkValidation}
          >
            <option value="">Select a gender...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="no">Don't want to tell</option>
          </select>
          {errors.gender && (
            <span className="error-message">{errors.gender}</span>
          )}
        </div>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleCheckboxChange}
              className={errors.agreeToTerms ? "error" : ""}
              onBlur={checkValidation}
            />
            I agree to the terms and conditions
          </label>
          {errors.agreeToTerms && (
            <span className="error-message">{errors.agreeToTerms}</span>
          )}
        </div>
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
