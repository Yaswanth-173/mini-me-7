// Import React library and the useState hook
import React, { useState } from "react";

// Import CSS styles for this component
import "./App.css";

/*
  initialForm:
  - This object represents the default/empty state of our form.
  - We use it to initialize state and to reset the form after submission.
*/
const initialForm = {
  FirstName: "",
  LastName: "",
  dob: "",
  email: "",
  password: "",
  confirmPassword: "",
  Phone: "",
  Country: "",
};

function App() {
  /*
    -------------------------------
    useState Hooks
    -------------------------------
    - formData: Holds the current values typed by the user in the form fields.
    - errors: Holds the validation error messages for each field.
    - touched: Tracks whether a field has been visited (blurred) at least once.
  */
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /*
    validateField(name, value, allValues):
    --------------------------------------
    - Validates a single field based on its name.
    - Called in 2 places:
        1) inside handleBlur → "field-level validation" (onBlur event)
        2) inside validateForm → "form-level validation" (onSubmit event)
  */
  const validateField = (name, value, allValues = formData) => {
    switch (name) {
      case "FirstName":
        if (!value.trim()) return "First Name is required";
        return "";
      case "LastName":
        if (!value.trim()) return "Last Name is required";
        return "";
      case "dob":
        if (!value) return "Date of Birth is required";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Email address is invalid";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        return "";
      case "confirmPassword":
        if (!value) return "Confirm Password is required";
        if (value !== allValues.password) return "Passwords do not match";
        return "";
      case "Phone":
        if (!value) return "Phone number is required";
        if (!/^\d{10}$/.test(value))
          return "Phone number must be 10 digits";
        return "";
      case "Country":
        if (!value.trim()) return "Country name is required";
        return "";
      default:
        return "";
    }
  };

  /*
    validateForm():
    ----------------
    - Validates ALL fields together.
    - Loops through formData and applies validateField for each.
  */
  const validateForm = () => {
    const nextErrors = {};
    Object.keys(formData).forEach((key) => {
      const msg = validateField(key, formData[key], formData);
      if (msg) nextErrors[key] = msg;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    if (touched[name]) {
      const msg = validateField(name, value, updated);
      setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
    }
  };

  // Field blur validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const msg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const touchedAll = {};
    Object.keys(formData).forEach((key) => {
      touchedAll[key] = true;
    });
    setTouched(touchedAll);

    if (validateForm()) {
      alert("Form Submitted Successfully ✅");
      // Reset form values and states
      setFormData(initialForm);
      setErrors({});
      setTouched({});
    }
  };

  return (
    <>
      <div className="page">
        <div className="card">
          <h2>Sign up </h2>

          <form onSubmit={handleSubmit} noValidate>
            {/* ---------------- First Name Field ---------------- */}
            <div className="form-group">
              <label htmlFor="FirstName">First Name</label>
              <input
                id="FirstName"
                name="FirstName"
                type="text"
                placeholder="Enter your First Name"
                value={formData.FirstName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.FirstName}
                aria-describedby="FirstName-error"
              />
              {errors.FirstName && (
                <span id="FirstName-error" className="error">
                  {errors.FirstName}
                </span>
              )}
            </div>

            {/* ---------------- Last Name Field ---------------- */}
            <div className="form-group">
              <label htmlFor="LastName">Last Name</label>
              <input
                id="LastName"
                name="LastName"
                type="text"
                placeholder="Enter your Last Name"
                value={formData.LastName}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.LastName}
                aria-describedby="LastName-error"
              />
              {errors.LastName && (
                <span id="LastName-error" className="error">
                  {errors.LastName}
                </span>
              )}
            </div>

            {/* ---------------- DOB Field ---------------- */}
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.dob}
                aria-describedby="dob-error"
              />
              {errors.dob && (
                <span id="dob-error" className="error">
                  {errors.dob}
                </span>
              )}
            </div>

            {/* ---------------- Country Field ---------------- */}
            <div className="form-group">
              <label htmlFor="Country">Country</label>
              <input
                id="Country"
                name="Country"
                type="text"
                placeholder="Enter your Country"
                value={formData.Country}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.Country}
                aria-describedby="Country-error"
              />
              {errors.Country && (
                <span id="Country-error" className="error">
                  {errors.Country}
                </span>
              )}
            </div>

            {/* ---------------- Email Field ---------------- */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
              />
              {errors.email && (
                <span id="email-error" className="error">
                  {errors.email}
                </span>
              )}
            </div>

            {/* ---------------- Phone Field ---------------- */}
            <div className="form-group">
              <label htmlFor="Phone">Phone</label>
              <input
                id="Phone"
                name="Phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.Phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.Phone}
                aria-describedby="phone-error"
              />
              {errors.Phone && (
                <span id="phone-error" className="error">
                  {errors.Phone}
                </span>
              )}
            </div>

            {/* ---------------- Password Field ---------------- */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.password}
                aria-describedby="password-error"
              />
              {errors.password && (
                <span id="password-error" className="error">
                  {errors.password}
                </span>
              )}
            </div>

            {/* ---------------- Confirm Password Field ---------------- */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby="confirmPassword-error"
              />
              {errors.confirmPassword && (
                <span id="confirmPassword-error" className="error">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            {/* Submit button */}
            <button type="submit">Submit</button>
          </form>

          <p className="tip">
            Move focus between fields to see <code>onBlur</code> validation. <br />
            Click Submit to trigger <code>onSubmit</code> validation. <br />
            Form clears after a successful submit.
          </p>
        </div>
      </div>
    </>
  );
}

// Export App component
export default App;