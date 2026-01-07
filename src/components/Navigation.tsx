import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu, Home, Sparkles, LogOut, House, Heart, Settings } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("authToken");

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const getInitials = () => "JD"; // You can replace with actual user initials

  return (
    <nav className="gradient-primary shadow-soft sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Left - Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 text-primary-foreground hover:opacity-90 transition-opacity group flex-shrink-0"
          >
            <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
              <Heart className="w-5 h-5" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-lg leading-tight">RoomieMatch</span>
              <span className="text-xs text-primary-foreground/70">AI-Powered Matching</span>
            </div>
          </Link>

          {/* Center - Desktop Navigation (Hidden on mobile) */}
          {isLoggedIn && (
            <div className="hidden lg:flex items-center gap-2">
              <Button
                variant={isActive("/recommendations") ? "hero" : "ghost"}
                className="text-primary-foreground hover:bg-white/10 gap-2"
                onClick={() => handleNavigation("/recommendations")}
              >
                <Sparkles className="w-4 h-4" />
                Recommendations
              </Button>
              
              <Button
                variant={isActive("/rooms") ? "hero" : "ghost"}
                className="text-primary-foreground hover:bg-white/10 gap-2"
                onClick={() => handleNavigation("/rooms")}
              >
                <House className="w-4 h-4" />
                Explore Rooms
              </Button>
            </div>
          )}

          {/* Right - User Menu & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Desktop User Profile (Hidden on mobile) */}
            {isLoggedIn && (
              <div className="hidden sm:flex items-center gap-3 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-secondary/80 flex items-center justify-center text-white text-xs font-bold">
                  {getInitials()}
                </div>
                <span className="text-sm text-primary-foreground font-medium hidden md:inline">Profile</span>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-white/10 lg:hidden"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-80 bg-card border-border">
                {/* Mobile Menu Header */}
                <div className="mt-6 mb-6">
                  <h2 className="text-xl font-bold text-foreground">RoomieMatch</h2>
                  <p className="text-sm text-muted-foreground">AI-Powered Matching</p>
                </div>

                <Separator className="mb-6" />

                {/* Main Navigation */}
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-3 px-2">Discover</p>
                    <div className="space-y-2">
                      <Button
                        variant={isActive("/recommendations") ? "default" : "ghost"}
                        className="w-full justify-start gap-3 h-12 text-base hover-elevate"
                        onClick={() => handleNavigation("/recommendations")}
                      >
                        <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-primary font-semibold">Smart Recommendations</span>
                        <span className="ml-auto bg-primary/20 text-primary px-2 py-1 rounded text-xs font-semibold">NEW</span>
                      </Button>

                      <Button
                        variant={isActive("/rooms") ? "default" : "ghost"}
                        className="w-full justify-start gap-3 h-12 text-base"
                        onClick={() => handleNavigation("/rooms")}
                      >
                        <House className="w-5 h-5 flex-shrink-0" />
                        Explore Rooms
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Account Section */}
                <div className="space-y-4 mb-8">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-3 px-2">Account</p>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-12 text-base"
                      onClick={() => handleNavigation("/profile")}
                    >
                      <Settings className="w-5 h-5 flex-shrink-0" />
                      Profile Settings
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 h-12 text-base"
                      onClick={() => handleNavigation("/")}
                    >
                      <Heart className="w-5 h-5 flex-shrink-0" />
                      Saved Favorites
                    </Button>
                  </div>
                </div>

                <Separator className="mb-6" />

                {/* Sign Out */}
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-12 text-base text-destructive border-destructive/30 hover:bg-destructive/10"
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    setIsOpen(false);
                    navigate("/login");
                  }}
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  Sign Out
                </Button>

                {/* Footer Info */}
                <div className="mt-8 pt-6 border-t border-muted text-center">
                  <p className="text-xs text-muted-foreground">
                    Version 1.0.0 • All women verified
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
