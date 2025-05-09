
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-investment-green mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">
          This page is currently under development
        </p>
        <p className="text-gray-500 mb-8">
          We're working on creating this investment feature. Please check back soon!
        </p>
        <Button asChild className="bg-investment-green hover:bg-green-600">
          <Link to="/">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
