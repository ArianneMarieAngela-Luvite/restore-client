import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/services/axios";
import {  useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const BillingInformation = () => {
  const [loading, setLoading] = useState(false);
  const [isCustom, setIsCustom] = useState(false); 
  const [formData, setFormData] = useState({
    name: "",
    email: localStorage.getItem("email") || "", 
    phone: "",
    creditsToPurchase: "", 
  });
  const [modalVisible, setModalVisible] = useState(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleCreditSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === "custom") {
      setIsCustom(true);
      setFormData((prevFormData) => ({
        ...prevFormData,
        creditsToPurchase: "",
      }));
    } else {
      setIsCustom(false);
      setFormData((prevFormData) => ({
        ...prevFormData,
        creditsToPurchase: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); 
    setModalVisible(true); 

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
        
        
        window.open(checkout_url);
        
        
        await pollPaymentWebhook();
      }
    } catch (err: any) {
      console.error("Error during checkout:", err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false); 
    }
  };

  const pollPaymentWebhook = async () => {
    const sessionId = localStorage.getItem("sessionId");

    if (!sessionId) {
      console.error("Session ID is missing");
      return;
    }

    const formData = new FormData();
    formData.append("sessionId", sessionId);

    const interval = setInterval(async () => {
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
          clearInterval(interval); 
          localStorage.removeItem("sessionId");
          window.location.href = "/import"; 
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        
      }
    }, 2000); 

    
    setTimeout(() => clearInterval(interval), 60000); 
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="container mx-auto p-6 max-w-lg bg-white shadow-lg rounded-lg">
        <div className="flex flex-col gap-2 mb-3">
          <p className="text-lg font-bold">Billing Information</p>
          <p>
            You're about to pay for the <strong>Pay-per-use</strong> plan. The purchased credits can be used in our forecasting services. Please fill in the details below to complete your purchase.
          </p>
        </div>

        {loading ? (
          <ClipLoader />
        ) : (
          <form className="grid gap-4" onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">Name</label>
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

            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
              <div className="mt-2.5">
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">Phone Number</label>
              <div className="mt-2.5">
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold leading-6 text-gray-900">Select Credits to Purchase</label>
              <div className="mt-2.5">
                <div className="flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="credits"
                      value="10"
                      checked={formData.creditsToPurchase === "10"}
                      onChange={handleCreditSelection}
                      disabled={loading}
                    />
                    <span className="ml-2">10</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="credits"
                      value="15"
                      checked={formData.creditsToPurchase === "15"}
                      onChange={handleCreditSelection}
                      disabled={loading}
                    />
                    <span className="ml-2">15</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="credits"
                      value="25"
                      checked={formData.creditsToPurchase === "25"}
                      onChange={handleCreditSelection}
                      disabled={loading}
                    />
                    <span className="ml-2">25</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="credits"
                      value="custom"
                      checked={isCustom}
                      onChange={handleCreditSelection}
                      disabled={loading}
                    />
                    <span className="ml-2">Custom</span>
                  </label>
                </div>
              </div>
              {isCustom && (
                <div className="mt-4">
                  <input
                    id="creditsToPurchase"
                    type="number"
                    placeholder="Enter custom amount"
                    value={formData.creditsToPurchase}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              )}
            </div>

            <div className="flex gap-8 justify-center">
            <Link to="/import" className="flex w-1/2 bg-white rounded-md text-center justify-center items-center font-semibold text-sm  text-customTextColor hover:bg-gray-100 border">
                Cancel
            </Link>
            <Button
                type="submit"
                disabled={loading}
                className="w-1/2 flex justify-center rounded-md  "
              >
                Proceed to Checkout
              </Button>
              
            </div>
          </form>
        )}

        {/* Loading Modal */}
        {modalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <p className="text-lg font-bold">Processing Payment</p>
              <ClipLoader className="mt-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingInformation;
