'use client'

import { useState } from 'react';
import emailjs from '@emailjs/browser'; 
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function ContactUs() {
  // const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .send(
        'service_7hus157', // Replace with your EmailJS Service ID
        'template_cligw9e', // Replace with your EmailJS Template ID
        {
          from_name: formData.firstName + ' ' + formData.lastName,
          user_email: formData.email,
          message: formData.message,
          reply_to: formData.email
        },
        'YxaLz6q1U1RTnT7eo' // Replace with your EmailJS User ID
      )
      .then(
        (result: any) => {
          console.log('Email successfully sent!', result.text);
          // alert('Email sent successfully!');
          toast({
            description: "Sent successfully!",
          });

          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            message: ''
          });
        },
        (error: any) => {
          console.error('There was an error sending the email:', error);
          // alert('Failed to send email.');
          toast({
            description: "Failed sending message.",
          });
        }
      );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='h-100vh bg-background'>
      <motion.div
        animate={{x:0}}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          ease: "linear",
          duration: 2,
          x: { duration: 1 }
      }} id="contact-us" className="container  mx-auto  px-5 py-10 lg:px-8">
        
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">Get in touch</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Have questions or want to learn more about how ReStore can support your business? We're here to help.
          </p>
        </div>
        <form onSubmit={sendEmail} className="mx-auto mt-5 max-w-xl sm:mt-10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2.5">
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
            >
              Let's talk
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
