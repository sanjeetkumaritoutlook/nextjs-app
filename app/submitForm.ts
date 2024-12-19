// pages/api/submitForm.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Validate form data (you can add your own validation here)
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Here, you can add code to send the form data to a database, email service, etc.
    console.log('Form Data:', { name, email, message });

    // Respond with a success message
    return res.status(200).json({ message: 'Form submitted successfully!' });
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
