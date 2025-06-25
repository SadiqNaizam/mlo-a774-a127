import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Checkout Page from "./pages/Checkout Page";
import Homepage / Restaurant Listing from "./pages/Homepage / Restaurant Listing";
import Order Status / Tracking Page from "./pages/Order Status / Tracking Page";
import Restaurant Menu Page from "./pages/Restaurant Menu Page";
import User Profile / Authentication Page from "./pages/User Profile / Authentication Page";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Homepage / Restaurant Listing />} />
          <Route path="/checkout " element={<Checkout Page />} />
          <Route path="/order -status / -tracking " element={<Order Status / Tracking Page />} />
          <Route path="/restaurant -menu " element={<Restaurant Menu Page />} />
          <Route path="/user -profile / -authentication " element={<User Profile / Authentication Page />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
