import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import Landing from "./views/Landing";
import ProductGraph from "./views/ProductGraph";
import { Pricing } from "./views/Pricing";
import Topbar from "./components/Topbar";
import { Import } from "./views/Import";
import SalesGraph from "./views/SalesGraph";
import { Toaster } from "@/components/ui/toaster";
import Insights from "./views/Insights";

function App() {
  return (
    <div className="h-fit">
      <BrowserRouter>
        <Toaster /> 

        <Routes>
          <Route path="/" element={<>
            <Header />
            <Landing />
          </>}
          />
          <Route path="/pricing" element={<>
            <Header />
            <Pricing />
          </>}
          />
          
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/sales-forecast" element={<> <Topbar/><SalesGraph/> </>} />
          <Route path="/products-forecast" element={<> <Topbar/> <ProductGraph /> </>} />
          <Route path="/insights" element={<> <Topbar/> <Insights/> </>} />
          <Route path="/import" element={<> <Topbar/> <Import/> </>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
