import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { FileText, Home, Inbox, LogOut, Megaphone, Newspaper } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "~/lib/utils";
import { logout } from "~/server/auth";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "News", href: "/admin/news", icon: Newspaper },
  { label: "Minutes", href: "/admin/minutes", icon: FileText },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Submissions", href: "/admin/submissions", icon: Inbox },
] as const;

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  async function handleLogout() {
    await logout();
    navigate({ to: "/admin/login" });
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-white">
        <div className="flex h-16 items-center px-6 border-b border-gray-200">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-brand-navy">
              <span className="font-display text-xs font-bold text-brand-brass">SC</span>
            </div>
            <span className="font-display text-sm font-bold text-brand-navy">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {ADMIN_NAV.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-navy/5 text-brand-navy"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-gray-200 px-3 py-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <LogOut className="size-4" />
            Sign Out
          </button>
          <Link
            to="/"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors mt-0.5"
          >
            &larr; Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="lg:hidden flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
          <Link to="/admin" className="font-display text-sm font-bold text-brand-navy">
            SC Admin
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Sign Out
          </button>
        </header>

        {/* Mobile nav */}
        <nav className="lg:hidden flex gap-1 overflow-x-auto border-b border-gray-200 bg-white px-4 py-2">
          {ADMIN_NAV.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium",
                  isActive ? "bg-brand-navy text-white" : "text-gray-600 hover:bg-gray-100",
                )}
              >
                <item.icon className="size-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main id="main-content" tabIndex={-1} className="flex-1 p-6 lg:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}
