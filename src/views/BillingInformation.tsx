// import { axiosInstance } from "@/services/axios";
// import { useEffect, useState } from "react";
// import { ClipLoader } from "react-spinners";


// const BillingInformation = () => {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     creditsToPurchase: "", // default quantity
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
  
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("name", formData.name);
//       formDataToSend.append("email", formData.email);
//       formDataToSend.append("phone", formData.phone);
//       formDataToSend.append("creditsToPurchase", formData.creditsToPurchase);
  
      
//       const response = await axiosInstance.post("/api/payment/buy-credits", formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data", 
//         },
//       });
  
      
//       if (response.status === 200) {
//         const { checkout_url } = response.data;
//         // console.log(message, checkout_url, id);
//         localStorage.setItem("sessionId", response.data.id);
//         // console.log(sesh, "sesh");
//         // console.log(response.data.id);

  
//         window.location.href = checkout_url;
//         // window.open(checkout_url, "_blank");
//       }
//     } catch (err: any) {
//       if (err.response) {
        
//         console.error("Server Error:", err.response.data.message);
//       } else {
//         console.error("Error:", err.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handlePaymentWebhook = async () => {
//     setLoading(true);
//     const sessionId = localStorage.getItem("sessionId");

//     if (!sessionId) {
//       console.error("Session ID is missing");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("sessionId", sessionId);

//     try {
//       const response = await axiosInstance.post(
//         "/api/payment/paymongo-webhook", 
//         formData, 
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", 
//           },
//         }
//       );

//       // Check the response status code
//       if (response.status === 200) {
//         window.location.href = "https://localhost:5173/import";
//         setLoading(false);
//       } else {
//         console.error('Unexpected response status:', response.status);
//       }
//     } catch (error) {
//       // console.error('Error fetching webhook:', error.response ? error.response.data : error.message); 
//     }
//   };

//   useEffect(() => {
//     // Call handlePaymentWebhook immediately when the component mounts
//     handlePaymentWebhook();

//     // Set up an interval to check the status every 3 seconds (3000 milliseconds)
//     const interval = setInterval(() => {
//       handlePaymentWebhook();
//     }, 3000);

//     // Clean up the interval when the component unmounts
//     return () => clearInterval(interval);
//   }, []);

  

//   return (
//     {loading ? (
//       <div className="h-screen flex items-center justify-center">
//       <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing Information</h2>
//         <form className="grid gap-4" onSubmit={handleSubmit}>
//           {/* <div className="grid gap-2">
//             <input
//               id="name"
//               type="text"
//               placeholder="Name"
//               className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
//               required
//               value={formData.name}
//               onChange={handleChange}
//               disabled={loading}
//             />
//           </div> */}
//           <div>
//             <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
//               Name
//             </label>
//             <div className="mt-2.5">
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//                 disabled={loading}
//                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid gap-2">
//             <input
//               id="email"
//               type="email"
//               placeholder="Email"
//               className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               disabled={loading}
//             />
//           </div>

//           <div className="grid gap-2">
//             <input
//               id="phone"
//               type="text"
//               placeholder="Phone Number"
//               className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
//               required
//               value={formData.phone}
//               onChange={handleChange}
//               disabled={loading}
//             />
//           </div>

//           <div className="gap-2">
//             <input
//               id="creditsToPurchase"
//               type="number"
//               placeholder="Enter number of credits you want to purchase"
//               className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
//               required
//               value={formData.creditsToPurchase}
//               onChange={handleChange}
              
//             />
//           </div>

//           <div className="grid gap-2">
//             <button
//               type="submit"
//               className={`block w-full rounded-md px-4 py-2 text-white bg-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 ${
//                 loading ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//               disabled={loading}
//             >
//               {loading ? "Processing..." : "Submit"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     ) : (
//       <ClipLoader />
//     )}
    
//   );
// };

// export default BillingInformation;


import { axiosInstance } from "@/services/axios";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const BillingInformation = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    creditsToPurchase: "", // default quantity
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("creditsToPurchase", formData.creditsToPurchase);

      const response = await axiosInstance.post("/api/payment/buy-credits", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const { checkout_url } = response.data;
        localStorage.setItem("sessionId", response.data.id);
        // window.location.href = checkout_url;
        setLoading(true);
        window.open(checkout_url);
      }
    } catch (err: any) {
      if (err.response) {
        console.error("Server Error:", err.response.data.message);
      } else {
        console.error("Error:", err.message);
      }
    } finally {
      
      setLoading(false);
    }
  };

  const handlePaymentWebhook = async () => {
    const sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      console.error("Session ID is missing");
      return;
    }

    const formData = new FormData();
    formData.append("sessionId", sessionId);

    try {
      const response = await axiosInstance.post(
        "/api/payment/paymongo-webhook",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        window.location.href = "restore-test.netlify.app/import"; 
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      // console.error('Error fetching webhook:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    handlePaymentWebhook();

    
    const interval = setInterval(() => {
      handlePaymentWebhook();
    }, 2000);

    
    return () => {
      clearInterval(interval);
      setLoading(false); 
    };
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing Information</h2>
        {loading ? (
            <ClipLoader />
           ) : (
            
             <form className="grid gap-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2.5">
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <input
                id="phone"
                type="text"
                placeholder="Phone Number"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                required
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="gap-2">
              <input
                id="creditsToPurchase"
                type="number"
                placeholder="Enter number of credits you want to purchase"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                required
                value={formData.creditsToPurchase}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <button
                type="submit"
                className={`block w-full rounded-md px-4 py-2 text-white bg-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </div>
          </form>

        )}
      </div>
    </div>
  );
};

export default BillingInformation;
