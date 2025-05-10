import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ContactUs from "@/pages/contact";
import AboutUs from "@/pages/about";
import Price from "@/pages/price";
import ScanHistory from "@/pages/scan-history";
import ScanDetails from "@/pages/scanDetails"; // ✅ Correct import
import Login from "@/components/login";
import Register from "@/components/register";
import ForgotPassword from "@/components/forget";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/history" component={ScanHistory} />
      <Route path="/scan/:id" component={ScanDetails} />
      <Route path="/contact" component={ContactUs} />
      <Route path="/about" component={AboutUs} />
      <Route path="/price" component={Price} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forget" component={ForgotPassword} />
      <Route component={NotFound} />
    </Switch>
  );
}


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
