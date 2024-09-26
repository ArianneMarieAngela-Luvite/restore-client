import { Button } from "./components/ui/button"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import { Login } from "./views/Login"
import { Register } from "./views/Register"
import Landing from "./views/Landing"
import ProductGraph from "./views/ProductGraph"
import ForecastGraph from "./views/SalesGraph"
import Forecast from "./views/Sales"
import { Pricing } from "./views/Pricing"
import Topbar from "./components/Topbar"
import { Import } from "./views/Import"
import { ImportController } from "./controllers/ImportController"
import SalesGraph from "./views/SalesGraph"


function App() {
  return (
    <div className="h-fit">
        <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<>
          <Header />
          <Landing />
          <Pricing />
        </>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="register" element={<Register />}/>
        {/* <Route path="/home" element={<Landing />}/> */}
        <Route path="/sales-forecast" element={<> <Topbar/><SalesGraph/> </>} />
        <Route path="/products-forecast" element={<> <Topbar/><ProductGraph /> </>} />
        <Route path="/forecast" element={<> <Topbar/> <Forecast/> </>} />
        <Route path="/import" element={<> <Topbar/> <ImportController/> </>} />
        {/* <Route path="/pricing" element={<Pricing />} /> */}
      </Routes>
    </BrowserRouter>
    </div>
    
  )
}

export default App
