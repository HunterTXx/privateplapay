
"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { NavLink, useLocation } from 'react-router-dom'
import { useMobile } from '@/hooks/use-mobile'
import { useAdmin } from '@/hooks/useAdmin'
import UserMenu from '@/components/UserMenu'
import { useAuth } from '@/hooks/useAuth'
import { 
  Home,
  CreditCard,
  Calculator,
  Recycle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield
} from 'lucide-react'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const { isMobile } = useMobile()
  const [collapsed, setCollapsed] = useState(isMobile)
  const location = useLocation()
  const { user } = useAuth()
  const { isAdmin } = useAdmin()

  useEffect(() => {
    setCollapsed(isMobile)
  }, [isMobile])

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div
      className={cn(
        'sidebar border-r border-border bg-card h-screen flex flex-col transition-all',
        collapsed ? 'sm:w-[4.5rem]' : 'w-72',
        className
      )}
    >
      <div className="flex items-center p-4 h-14">
        <NavLink to="/" className="flex items-center">
          {!collapsed && (
            <span className="ml-2 text-lg font-bold text-investment-green">PlasticPay</span>
          )}
          {collapsed && (
            <span className="text-lg font-bold text-investment-green">PP</span>
          )}
        </NavLink>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden sm:flex">
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-2">
        <nav className="grid gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                isActive ? 'bg-accent text-accent-foreground' : 'transparent',
                collapsed && 'justify-center py-2.5 px-0'
              )
            }
          >
            <Home className="h-5 w-5" />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/investments"
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                    isActive ? 'bg-accent text-accent-foreground' : 'transparent',
                    collapsed && 'justify-center py-2.5 px-0'
                  )
                }
              >
                <CreditCard className="h-5 w-5" />
                {!collapsed && <span>Investments</span>}
              </NavLink>

              <NavLink
                to="/cycles"
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                    isActive ? 'bg-accent text-accent-foreground' : 'transparent',
                    collapsed && 'justify-center py-2.5 px-0'
                  )
                }
              >
                <Recycle className="h-5 w-5" />
                {!collapsed && <span>Cycles</span>}
              </NavLink>

              <NavLink
                to="/calculator"
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                    isActive ? 'bg-accent text-accent-foreground' : 'transparent',
                    collapsed && 'justify-center py-2.5 px-0'
                  )
                }
              >
                <Calculator className="h-5 w-5" />
                {!collapsed && <span>Calculator</span>}
              </NavLink>

              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      isActive ? 'bg-accent text-accent-foreground' : 'transparent',
                      collapsed && 'justify-center py-2.5 px-0'
                    )
                  }
                >
                  <Shield className="h-5 w-5" />
                  {!collapsed && <span>Admin</span>}
                </NavLink>
              )}
            </>
          )}
        </nav>
      </div>

      <UserMenu />
    </div>
  )
}

export default Sidebar
