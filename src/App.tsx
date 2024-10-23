import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import Landing from "./views/Landing";
import ProductGraph from "./views/ProductGraph";
import Topbar from "./components/Topbar";
import { Import } from "./views/Import";
import SalesGraph from "./views/SalesGraph";
import { Toaster } from "@/components/ui/toaster";
import Insights from "./views/Insights";
import Footer from "./views/Footer";
import ContactUs from "./views/ContactUs";
import AltPricing from "./views/AltPricing";
// import Try from "./views/Try";
// import PredictedDemand from "./views/PredictedDemandTable";
import Team from "./views/Team";
import BillingInformation from "./views/BillingInformation";
import { About } from "./views/About";
import EmailVerification from "./views/EmailVerification";
import ConfirmEmail from "./views/ConfirmEmail";
// import { InfiniteMovingCardsDemo } from "./views/About";

function App() {
  return (
    <div className="h-fit">
      <BrowserRouter>
        <Toaster /> 

        <Routes>
          <Route path="/" element={<>
            {/* <Header /> */}
            <Landing />
            <About/> 
            {/* <InfiniteMovingCardsDemo /> */}
             <Team />
            <AltPricing />
            <ContactUs />
            <Footer />  
            
          </>}
        />
          <Route path="/pricing" element={<>
            {/* <Header /> */}
            <AltPricing />
          </>}
          />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sales-forecast" element={<> <Topbar/><SalesGraph/> </>} />
          <Route path="/products-forecast" element={<> <Topbar/> <ProductGraph /> </>} />
          <Route path="/insights" element={<> <Topbar/> <Insights/> </>} />
          <Route path="/import" element={<> <Topbar/> <Import/> </>} />
          {/* <Route path="/team" element={<Team/>}/> */}
          <Route path="/pricing" element={<AltPricing/>} />
          {/* <Route path="/tb" element={<Try/>}/> */}
          <Route path="/contact-us" element={<ContactUs/>}/>
          {/* <Route path="/text" element={<PredictedDemand />} /> */}
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/billing-information" element={<BillingInformation/>} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/email-confirmation" element={<ConfirmEmail/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
