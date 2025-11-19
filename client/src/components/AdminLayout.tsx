import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Mail,
  LogOut,
} from "lucide-react";

type AdminLayoutProps = {
  children: ReactNode;
};

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/programs", label: "Programs", icon: BookOpen },
  { href: "/admin/blog", label: "Blog Posts", icon: BookOpen },
  { href: "/admin/contacts", label: "Contact Messages", icon: Mail },
  { href: "/", label: "Back to Site", icon: Home },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex bg-muted/10">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col border-r bg-background">
        <div className="px-6 py-4 border-b">
          <h1 className="font-heading font-bold text-xl">COMAGEND Admin</h1>
          <p className="text-xs text-muted-foreground">Internal dashboard</p>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <button
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-sans text-left transition 
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/80 hover:bg-muted"
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Button variant="outline" size="sm" className="w-full justify-center">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-14 border-b flex items-center justify-between px-4 md:px-6 bg-background">
          <h2 className="font-heading font-semibold text-lg">Admin Dashboard</h2>
          <Link href="/">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <Home className="h-4 w-4 mr-2" />
              View Website
            </Button>
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
