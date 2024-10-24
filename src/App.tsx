import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
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
import Team from "./views/Team";
import BillingInformation from "./views/BillingInformation";
import { About } from "./views/About";
import EmailVerification from "./views/EmailVerification";
import ConfirmEmail from "./views/ConfirmEmail";
import  AuthProvider  from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />

        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Landing />
                <About />
                <Team />
                <AltPricing />
                <ContactUs />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pricing" element={<AltPricing />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/billing-information" element={<BillingInformation />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/email-confirmation" element={<ConfirmEmail />} />

          {/* Private Routes (require authentication) */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/sales-forecast" element={<><Topbar /><SalesGraph /></>} />
            <Route path="/products-forecast" element={<><Topbar /><ProductGraph /></>} />
            <Route path="/insights" element={<><Topbar /><Insights /></>} />
            <Route path="/import" element={<><Topbar /><Import /></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
