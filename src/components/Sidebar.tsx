import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  BarChart3,
  ArrowDownToLine,
  Calculator,
  Menu,
  X,
  User,
  Recycle,
  LogOut
} from "lucide-react";
import { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from '@/hooks/useAuth';
import { checkIsAdmin } from '@/utils/adminUtils';

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Manage Funds", href: "/manage-funds", icon: BarChart3 },
  { name: "Investments", href: "/investments", icon: BarChart3 },
  { name: "Cycles", href: "/cycles", icon: ArrowDownToLine },
  { name: "Calculator", href: "/user-calculator", icon: Calculator },
  { name: "Profile", href: "/profile", icon: User },
];

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchAdmin() {
      if (user?.id) {
        const admin = await checkIsAdmin(user.id);
        setIsAdmin(admin);
      } else {
        setIsAdmin(false);
      }
    }
    fetchAdmin();
  }, [user]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {isMobile && (
        <button
          className="absolute top-4 left-4 z-50"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      )}

      <div
        className={cn(
          "bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 fixed md:relative z-40",
          sidebarOpen
            ? "w-64 opacity-100 translate-x-0"
            : isMobile
            ? "w-0 opacity-0 -translate-x-full"
            : "w-20 opacity-100 translate-x-0"
        )}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <Link to="/" className="flex items-center justify-center">
            <Recycle className={`h-7 w-7 text-investment-green mr-2${!sidebarOpen ? ' mx-auto' : ''}`} />
            {sidebarOpen ? (
              <span className="text-xl font-bold text-investment-green">PlasticPay</span>
            ) : (
              !isMobile && <span className="text-xl font-bold text-investment-green">PP</span>
            )}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
                      isActive
                        ? "bg-investment-green/10 text-investment-green"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        isActive
                          ? "text-investment-green"
                          : "text-gray-400 group-hover:text-gray-500"
                      )}
                    />
                    {sidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
            {/* Admin Dashboard link */}
            {isAdmin && (
              <li key="Admin Dashboard">
                <Link
                  to="/admin"
                  className={cn(
                    "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
                    location.pathname === "/admin"
                      ? "bg-investment-green/10 text-investment-green"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <BarChart3
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      location.pathname === "/admin"
                        ? "text-investment-green"
                        : "text-gray-400 group-hover:text-gray-500"
                    )}
                  />
                  {sidebarOpen && <span>Admin Dashboard</span>}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {!isMobile && (
          <Button
            variant="ghost"
            size="sm"
            className="mx-auto mb-4"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5 text-gray-400" />
            ) : (
              <Menu className="h-5 w-5 text-gray-400" />
            )}
          </Button>
        )}

        {/* Logout button */}
        {sidebarOpen ? (
          <div className="px-4 mb-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        ) : (
          !isMobile && (
            <div className="flex justify-center mb-4">
              <Button 
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                onClick={signOut}
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          )
        )}

        {sidebarOpen && <UserMenu />}
      </div>

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
