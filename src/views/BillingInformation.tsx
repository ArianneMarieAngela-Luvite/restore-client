import { axiosInstance } from "@/services/axios";
import { useState } from "react";

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
        const { message, checkout_url, id } = response.data;
        console.log(message, checkout_url, id);
        localStorage.setItem("sessionId", response.data.id);
        // console.log(sesh, "sesh");
        console.log(response.data.id);
  
        window.location.href = checkout_url;
        // window.open(checkout_url, "_blank");
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

  // const handlePaymentWebhook = async () => {
  //   const sessionId = localStorage.getItem("sessionId");
  //   console.log(sessionId, "intro");
  
  //   if (!sessionId) {
  //     console.error("Session ID is missing");
  //     return;
  //   }
  
  //   try {
  //     // Create FormData and append the sessionId
  //     const formData = new FormData();
  //     formData.append("sessionId", sessionId);
  
  //     const response = await axiosInstance.post(
  //       "/api/payment/paymongo-webhook",
  //       formData, 
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data", 
  //         },
  //       }
  //     );
  //     // cs_nYQMNvEn8vV8EycFBkb2jW8q
  //     const { message } = response.data; 
  //     console.log("Webhook message:", message);
  //     // localStorage.removeItem("sessionId");
  
  //   } catch (error) {
  //     // console.error("Error fetching webhook:", error.response ? error.response.data : error.message);
  //   }
  // };
  

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing Information</h2>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          {/* <div className="grid gap-2">
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
          </div> */}
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                name="name"
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
      </div>
    </div>
  );
};

export default BillingInformation;
