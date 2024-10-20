// import { axiosInstance } from "@/services/axios";
// import { useState } from "react";

// const BillingInformation = () => {
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         phoneNumber: "",
//         quantity: "5"
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { id, value } = e.target;
//         setFormData((prevFormData) => ({
//           ...prevFormData,
//           [id]: value,
//         }));
//       };
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setLoading(true);
      
//         try {
//           const response = await axiosInstance.post("/api/payment/buy-credits", {
//             name: formData.name,
//             email: formData.email,
//             phoneNumber: formData.phoneNumber,
//             quantity: "5",
//           });
      
//           if (response.status === 200) {
//             localStorage.setItem("authToken", response.data.token);
//             console.log(response.data.token);
//             localStorage.setItem("username", response.data.username);
//           }
//         } catch (err: any) {
//           if(err.response) {
//             // const errMessage = err.response.data?.message || err.response.data.message || "Unknown error";
//             // // console.log(errMessage);
//           }
//           // console.log("Error: ", err.message);
//         //   setErrorMessage("Login failed. Please check your credentials.");
//         } finally {
//           setLoading(false);
//         }
//       };

//   return (
//     <div className="h-100vh ">
//       <div className="container">
//         <div className="">
//         <form className="grid gap-4" onSubmit={handleSubmit} >
//         <div className="grid gap-2">
//             <input
//                 id="name"
//                 type="name"
//                 placeholder="Name"
//                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 disabled={loading}
//             />
//             </div>
//             <div className="grid gap-2">
//             <input
//                 id="email"
//                 type="email"
//                 placeholder="Email"
//                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 disabled={loading}
//             />
//             </div>

//             <div className="grid gap-2">
//             <input
//                 id="phoneNumber"
//                 type="text"
//                 placeholder="PhoneNumber"
//                 className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
//                 required
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 disabled={loading}
//             />
//             </div>
            
//             </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BillingInformation



import { axiosInstance } from "@/services/axios";
import { useState } from "react";

const BillingInformation = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    quantity: "5", // default quantity
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
      const response = await axiosInstance.post("/api/payment/buy-credits", {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        quantity: formData.quantity, // use the value from formData
      });

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        console.log(response.data.token);
        localStorage.setItem("username", response.data.username);
      }
    } catch (err: any) {
      if (err.response) {
        // const errMessage = err.response.data?.message || err.response.data.message || "Unknown error";
        // console.error(errMessage);
      }
      // console.error("Error: ", err.message);
      // setErrorMessage("Purchase failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing Information</h2>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <input
              id="name"
              type="text"
              placeholder="Name"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
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
              id="phoneNumber"
              type="text"
              placeholder="Phone Number"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="hidden gap-2">
            <input
              id="quantity"
              type="number"
              placeholder="Quantity"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              required
              value={formData.quantity}
              onChange={handleChange}
              disabled={loading}
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
      </div>
    </div>
  );
};

export default BillingInformation;
