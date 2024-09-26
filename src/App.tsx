import { Button } from "./components/ui/button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import Landing from "./views/Landing";
import ProductGraph from "./views/ProductGraph";
import ForecastGraph from "./views/SalesGraph";
import Forecast from "./views/Sales";
import { Pricing } from "./views/Pricing";
import Topbar from "./components/Topbar";
import { Import } from "./views/Import";
import { ImportController } from "./controllers/ImportController";
import SalesGraph from "./views/SalesGraph";
import { Toaster } from "@/components/ui/toaster"; // Import the Toaster component

function App() {
  return (
    <div className="h-fit">
      <BrowserRouter>
        {/* Include Toaster at the root level */}
        <Toaster /> 

        <Routes>
          <Route path="/" element={<>
            <Header />
            <Landing />
            <Pricing />
          </>}
          />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/sales-forecast" element={<> <Topbar/><SalesGraph/> </>} />
          <Route path="/products-forecast" element={<> <Topbar/><ProductGraph /> </>} />
          <Route path="/forecast" element={<> <Topbar/> <Forecast/> </>} />
          <Route path="/import" element={<> <Topbar/> <Import/> </>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
