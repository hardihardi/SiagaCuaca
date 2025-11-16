"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Cloud,
  Activity,
  AlertTriangle,
  Settings,
  Menu,
  Sun,
  Moon,
  Newspaper,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import { useAuth, useUser } from "@/firebase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/weather", label: "Cuaca", icon: Cloud },
  { href: "/earthquakes", label: "Gempa Bumi", icon: Activity },
  { href: "/alerts", label: "Peringatan Dini", icon: AlertTriangle },
  { href: "/news", label: "Berita", icon: Newspaper },
  { href: "/settings", label: "Pengaturan", icon: Settings },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const auth = useAuth();
  const { user } = useUser();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const NavContent = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          onClick={onLinkClick}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            pathname === href
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
              <Cloud className="h-6 w-6" />
              <span className="">IndoWeatherAlert</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <NavContent />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
                <div className="flex h-14 items-center border-b px-4">
                    <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
                        <Cloud className="h-6 w-6" />
                        <span className="">IndoWeatherAlert</span>
                    </Link>
                </div>
                <div className="mt-4 flex-1">
                    <NavContent />
                </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Search can go here later */}
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={user?.photoURL || undefined} alt="User avatar" />
                  <AvatarFallback>
                    {user?.isAnonymous ? <UserIcon size={20} /> : user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <p>Akun Saya</p>
                <p className="text-xs text-muted-foreground font-normal">
                  {user?.isAnonymous ? "Pengguna Anonim" : user?.email}
                </p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => auth.signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
