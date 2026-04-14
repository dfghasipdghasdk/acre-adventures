import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index.tsx";
import ProjectPage from "./pages/ProjectPage.tsx";
import Projects from "./pages/Projects.tsx";
import Directors from "./pages/Directors.tsx";
import SandalwoodBenefits from "./pages/SandalwoodBenefits.tsx";
import NotFound from "./pages/NotFound.tsx";

const App = () => (
  <>
    <Toaster />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="/directors" element={<Directors />} />
        <Route path="/sandalwood-benefits" element={<SandalwoodBenefits />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
