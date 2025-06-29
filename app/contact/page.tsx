'use client';

import ContactForm from '../ContactForm'; // Import your form component
import { MyButton, MyCard } from 'react19-cra'


const ContactPage = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <ContactForm /> {/* Use the ContactForm here */}
        <div style={{ padding: 20 }}>
      <MyCard
        title="Hello Card"
        description="This card is from my custom library."
        image="https://picsum.photos/300/150"
        onClick={() => alert('Card clicked!')}
      >
        <MyButton
          label="Click Me"
          variant="primary"
          onClick={() => alert('Button clicked!')}
        />
      </MyCard>
    </div>
    </div>
  );
};

export default ContactPage;
