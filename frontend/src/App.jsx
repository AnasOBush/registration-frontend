import React, { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  const [errors, setErrors] = useState({
  name: '',
  email: '',
  phone: '',
  address: '',
});


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

  const phoneRegex = /^[0-9]{10}$/;
  if (!formData.phone) {
    newErrors.phone = "Phone is required";
    isValid = false;
  } else if (!phoneRegex.test(formData.phone)) {
    newErrors.phone = "Phone must be 10 digits";
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

    if (response.ok) {
      alert("Registration submitted successfully!");

      // Reset the form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
      });
    } else {
      alert("Failed to submit registration.");
    }
  } catch (error) {
    console.error("Error submitting registration:", error);
    alert("Error connecting to server.");
  }
};



  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </label>
        <br /><br />
        
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </label>
        <br /><br />
        
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        {errors.phone && <div style={{ color: "red" }}>{errors.phone}</div>}
        <br /><br />
        
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <div style={{ color: "red" }}>{errors.address}</div>}
        </label>
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
