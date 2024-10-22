// 'use client'

// import { useState } from 'react'
// import { Field, Label, Switch } from '@headlessui/react'

// export default function ContactUs() {
//   const [agreed, setAgreed] = useState(false)

//   return (
//     <div id="contact-us" className="isolate mb-0  px-6   h-screen sm:py-32 lg:px-8">
      
//       <div className="mx-auto max-w-2xl text-center">
        
//         <h2 className="text-4xl font-bold font-rubik tracking-tight text-gray-900 sm:text-4xl">Get in touch</h2>
//         <p className="mt-2 text-lg leading-8 text-gray-600 font-rubik">
//         Have questions or want to learn more about how ReStore can support your business? We’re here to help. Reach out, and let’s start a conversation.


//         </p>
//       </div>
//       <form action="#" method="POST" className="mx-auto mt-5 max-w-xl sm:mt-20">
//         <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
//           <div>
//             <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
//               First name
//             </label>
//             <div className="mt-2.5">
//               <input
//                 id="first-name"
//                 name="first-name"
//                 type="text"
//                 autoComplete="given-name"
//                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
//               Last name
//             </label>
//             <div className="mt-2.5">
//               <input
//                 id="last-name"
//                 name="last-name"
//                 type="text"
//                 autoComplete="family-name"
//                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>
//           <div className="sm:col-span-2">
//             <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
//               Email
//             </label>
//             <div className="mt-2.5">
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
//               />
//             </div>
//           </div>
        
//           <div className="sm:col-span-2">
//             <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
//               Message
//             </label>
//             <div className="mt-2.5">
//               <textarea
//                 id="message"
//                 name="message"
//                 rows={4}
                // className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
//                 defaultValue={''}
//               />
//             </div>
//           </div>
//           <Field className="flex gap-x-4 sm:col-span-2">
//             <div className="flex h-6 items-center">
//               <Switch
//                 checked={agreed}
//                 onChange={setAgreed}
//                 className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[checked]:bg-primary"
//               >
//                 <span className="sr-only">Agree to policies</span>
//                 <span
//                   aria-hidden="true"
//                   className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
//                 />
//               </Switch>
//             </div>
//             <Label className="text-sm leading-6 text-gray-600">
//               By selecting this, you agree to our{' '}
//               <a href="#" className="font-semibold text-primary">
//                 privacy&nbsp;policy
//               </a>
//               .
//             </Label>
//           </Field>
//         </div>
//         <div className="mt-10">
//           <button
//             type="submit"
//             className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
//           >
//             Let's talk
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }


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
      }} id="contact-us" className="container mx-auto  py-10 lg:px-8">
        
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">Get in touch</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Have questions or want to learn more about how ReStore can support your business? We’re here to help.
          </p>
        </div>
        <form onSubmit={sendEmail} className="mx-auto mt-5 max-w-xl sm:mt-20">
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
