"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Menu, Pill, Home, Package, Users, Phone, Mail, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  // Ensure component is mounted before rendering interactive elements
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/team", label: "Our Team", icon: Users },
    { href: "/contact", label: "Contact", icon: Phone },
  ]

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const handleMenuToggle = () => {
    console.log("Menu toggle clicked, current state:", isOpen)
    setIsOpen(!isOpen)
  }

  // Don't render interactive elements until mounted (prevents hydration issues)
  if (!isMounted) {
    return (
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-900 hidden sm:block w-[50px]">
                CAPITAL PHARMACEUTICAL & MEDICAL SUPPLIES
              </span>
              <span className="text-sm w-[200px] font-bold text-gray-900 sm:hidden">CAPITAL PHARMACEUTICAL & MEDICAL SUPPLIES</span>
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
            <div className="md:hidden">
              <Button variant="ghost" size="icon" disabled>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Pill className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm w-[200px] font-bold text-gray-900 hidden sm:block">
              CAPITAL PHARMACEUTICAL & MEDICAL SUPPLIES
            </span>
            <span className="text-xs w-[200] font-bold text-gray-900 sm:hidden">CAPITAL PHARMACEUTICAL & MEDICAL SUPPLIES</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors ${
                  pathname === item.href ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMenuToggle}
                  aria-label="Open navigation menu"
                  className="relative z-50"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0 z-50" onInteractOutside={() => setIsOpen(false)}>
                <div className="flex flex-col h-full">
                  {/* Sidebar Header */}
                  <SheetHeader className="p-6 border-b bg-blue-50">
                    <div className="flex items-center justify-between">
                      <Link href="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Pill className="h-5 w-5 text-white" />
                        </div>
                        <SheetTitle className="text-xs font-bold text-gray-900">CAPITAL PHARMACEUTICAL & MEDICAL SUPPLIES</SheetTitle>
                      </Link>
                  
                    </div>
                  </SheetHeader>

                  {/* Sidebar Navigation */}
                  <div className="flex-1 py-6 overflow-y-auto">
                    <nav className="space-y-2 px-4">
                      {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                              isActive
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                            onClick={handleLinkClick}
                          >
                            <Icon className="mr-3 h-5 w-5" />
                            {item.label}
                          </Link>
                        )
                      })}
                    </nav>

                    {/* Additional Menu Items */}
                    <div className="mt-8 px-4">
                      <div className="border-t pt-6">
                        <h3 className="px-4 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                          Quick Actions
                        </h3>
                        <Link
                          href="/products"
                          className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
                          onClick={handleLinkClick}
                        >
                          <Package className="mr-3 h-5 w-5" />
                          Browse Products
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Footer */}
                  <div className="p-4 border-t bg-gray-50">
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 mb-4">
                      <Link href="/contact" onClick={handleLinkClick}>
                        Get Quote
                      </Link>
                    </Button>

                    {/* Contact Info */}
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Us</div>
                      <a
                        href="tel:+975-17598338"
                        className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        <span>+975-17598338</span>
                      </a>
                      <a
                        href="mailto:capitalpms@gmail.com"
                        className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        <span>capitalpms@gmail.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
