"use client"; // Mark this file as a client component
import { useState } from 'react';
import styles from './contactForm.module.css'; // Import the CSS module

const ContactForm = () => {
    // Step 1: Set up state for form data to store the form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);  // To handle loading state
  const [submitSuccess, setSubmitSuccess] = useState(false);  // To handle success message
  const [submitError, setSubmitError] = useState(false);  // To handle error message


    // Step 2: Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    // Step 3: Handle form submission
  //fetch with async functions
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      // Set loading state to true while submitting the form
      setIsSubmitting(true);
      setSubmitSuccess(false);
      setSubmitError(false);
      try {
        // Step 4: Make POST API callto a public API (e.g., jsonplaceholder)
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          setSubmitSuccess(true);
          console.log('Form Submitted Successfully:', formData);
        } else {
          setSubmitError(true);
          console.error('Form Submission Failed');
        }
      } catch (error) {
        setSubmitError(true);
        console.error('Error submitting form:', error);
      } finally {
        // Reset loading state and form data
        setIsSubmitting(false);
        if (submitSuccess) {
          setFormData({
            name: '',
            email: '',
            message: '',
          });
        }
      }
    };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div>
        <label className={styles.formLabel} htmlFor="name">Name</label>
        <input className={styles.formInput}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className={styles.formLabel} htmlFor="email">Email</label>
        <input className={styles.formInput}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className={styles.formLabel} htmlFor="message">Message</label>
        <textarea className={styles.formInput}
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <button className={styles.submitButton} type="submit">Submit</button>
      </div>
    </form>
  );
};

export default ContactForm;
