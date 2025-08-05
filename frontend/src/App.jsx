import React, { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  })

  const [errors, setErrors] = useState({
  name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
});
const [successMessage, setSuccessMessage] = useState('');


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateForm = () => {
  const newErrors = {};
  let isValid = true;

  if (!formData.name.trim()) {
    newErrors.name = "Name is required";
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email) {
    newErrors.email = "Email is required";
    isValid = false;
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = "Enter a valid email";
    isValid = false;
  }

  if (!formData.password || formData.password.length < 6) {
  newErrors.password = "Password must be at least 6 characters";
  isValid = false;
}

  const phoneRegex = /^[0-9]{11}$/;
  if (!formData.phone) {
    newErrors.phone = "Phone is required";
    isValid = false;
  } else if (!phoneRegex.test(formData.phone)) {
    newErrors.phone = "Phone must be 11 digits";
    isValid = false;
  }

  if (!formData.address.trim()) {
    newErrors.address = "Address is required";
    isValid = false;
  }

  setErrors(newErrors);
  return isValid;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    const response = await fetch("http://localhost:8080/api/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const result = await response.text();

    if (response.ok && result === "User registered successfully!") {
      setSuccessMessage("Registration submitted successfully!");
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: ''
      });
      setErrors({});
    } else if (result === "Email already registered") {
      setSuccessMessage('');
      setErrors(prev => ({ ...prev, email: "This email is already registered." }));
    } else {
      setSuccessMessage('');
      alert("Failed to submit registration.");
    }
  } catch (error) {
    console.error("Error submitting registration:", error);
    setSuccessMessage('');
    alert("Error connecting to server.");
  }
};



 return (
<div style={{
  backgroundColor: '#e6f0ff',
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  boxSizing: 'border-box',
  overflowY: 'auto'
}}>

 <div style={{
  width: 'auto',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  padding: '3rem',
  borderRadius: '10px',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)'
}}>

      <h1 style={{ textAlign: 'center', color: '#0055cc', marginBottom: '1rem' }}>TutorBirds</h1>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Register</h2>
      {successMessage && (
  <div style={{ 
    backgroundColor: '#d1e7dd', 
    color: '#0f5132', 
    padding: '1rem', 
    borderRadius: '8px', 
    marginBottom: '1.5rem', 
    border: '1px solid #badbcc' 
  }}>
    {successMessage}
  </div>
)}


      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '5px' }}
          />
          {errors.name && (
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#842029',
              padding: '0.75rem',
              borderRadius: '6px',
              marginTop: '4px',
              marginBottom: '12px',
              border: '1px solid #f5c2c7'
            }}>
                {errors.name}
              </div>
            )}

        </label>
        <br />

        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '5px' }}
          />
         {errors.email && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#842029',
            padding: '0.75rem',
            borderRadius: '6px',
            marginTop: '4px',
            marginBottom: '12px',
            border: '1px solid #f5c2c7'
          }}>
            {errors.email}
          </div>
        )}
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '5px' }}
          />
          {errors.password && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#842029',
            padding: '0.75rem',
            borderRadius: '6px',
            marginTop: '4px',
            marginBottom: '12px',
            border: '1px solid #f5c2c7'
          }}>
            {errors.password}
          </div>
        )}
        </label>
        <br />


        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '5px' }}
          />
          {errors.phone && (
    <div style={{
      backgroundColor: '#f8d7da',
      color: '#842029',
      padding: '0.75rem',
      borderRadius: '6px',
      marginBottom: '1rem',
      border: '1px solid #f5c2c7'
    }}>
      {errors.phone}
    </div>
  )}
        </label>
        <br />

        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '5px' }}
          />
          {errors.address && (
           <div style={{
            backgroundColor: '#f8d7da',
            color: '#842029',
            padding: '0.75rem',
            borderRadius: '6px',
            marginBottom: '1rem',
            border: '1px solid #f5c2c7'
          }}>
      {errors.address}
    </div>
  )}
        </label>
        <br />

        <button type="submit" style={{ backgroundColor: '#0055cc', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  </div>
);

}

export default App
