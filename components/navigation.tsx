"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, Pill, Home, Package, Users, Phone, Mail, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Ensure component is mounted before rendering interactive elements
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll effect for navigation background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/team", label: "Our Team", icon: Users },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleMenuToggle = () => {
    console.log("Menu toggle clicked, current state:", isOpen);
    setIsOpen(!isOpen);
  };

  // Don't render interactive elements until mounted (prevents hydration issues)
  if (!isMounted) {
    return (
      <>
        <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50 transition-all duration-300">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Pill className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-bold text-gray-900 sm:block text-wrap w-[200px]">
                  CAPITAL PHARMACEUTICAL & MEDICAL SUPPLIES
                </span>
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/contact">Get Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </nav>
        {/* Mobile Bottom Navigation - Static version */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 pb-safe">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="flex flex-col items-center p-2 opacity-50"
              >
                <item.icon className="h-6 w-6 text-gray-400" />
                <span className="text-xs mt-1 text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <span
                className={`text-xs font-bold hidden sm:block text-wrap w-[200px] transition-colors duration-300 ${"text-gray-900"}`}
              >
                CAPITAL PHARMACEUTICAL & MEDICAL SUPPLIES
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium transition-colors duration-300 ${
                    pathname === item.href
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {/* <Button
                asChild
                className={`transition-all duration-300 ${
                  isScrolled
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
                }`}
              >
                <Link href="/contact">Get Quote</Link>
              </Button> */}
            </div>

            {/* Mobile menu button (hidden as we're using bottom nav) */}
            <div className="md:hidden">
              <div className="w-10"></div> {/* Spacer for balance */}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 pb-safe">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center p-2 min-w-0 flex-1 transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`h-6 w-6 ${
                      isActive ? "text-blue-600" : "text-gray-600"
                    }`}
                  />
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <span
                  className={`text-xs mt-1 truncate ${
                    isActive ? "text-blue-600 font-medium" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Add bottom padding to main content to account for fixed bottom nav */}
      <style jsx>{`
        body {
          padding-bottom: env(safe-area-inset-bottom);
        }
        @media (max-width: 768px) {
          body {
            padding-bottom: calc(70px + env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </>
  );
}
