"use client"

import { useState, useEffect } from "react"
import {
  Home,
  Phone,
  UtensilsCrossed,
  Droplets,
  Ruler,
  Package,
  Users,
  MapPin,
  MessageSquare,
  Wrench,
  CheckCircle,
  ExternalLink,
  ZoomIn,
  Star,
  ChevronDown,
  Menu,
  X,
  ChefHat,
  Lamp,
  Bath,
  Refrigerator,
  ChevronRight,
  FileText,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Mail,
  AlertTriangle,
  Clock,
  Check,
  AlertCircle,
  CalendarCheck,
  HelpCircle,
  Lightbulb,
  Zap,
  Layers,
  Sun,
  Coffee,
  Map,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

type PageView =
  | "home"
  | "about"
  | "services"
  | "cabinets"
  | "appliances"
  | "sinks"
  | "lighting"
  | "partners"
  | "portfolio"
  | "quote"
  | "faq"
  | "catalog-cabinetcraft"
  | "catalog-appliancepro"
  | "catalog-sinkworks"
  | "catalog-lightsource"
  | "catalog-stoneworks"
  | "catalog-fixtureplus"
  | "checkout"
  | "locations"
  | "location-phoenix"
  | "location-scottsdale"
  | "location-tucson"
  | "location-las-vegas"
  | "location-albuquerque"

interface CartItem {
  id: string
  name: string
  sku: string
  price: number
  qty: number
  category: string
  source: "product" | "catalog"
}

export default function HRSWebsite() {
  const [currentPage, setCurrentPage] = useState<PageView>("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [preselectedLocation, setPreselectedLocation] = useState<string | null>(null)

  const navigateTo = (page: PageView) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const addToCart = (item: Omit<CartItem, "qty">) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { ...item, qty: 1 }]
    })
    setCartOpen(true)
  }

  const updateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    )
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)

  const navigateToQuoteWithLocation = (locationId: string) => {
    setPreselectedLocation(locationId)
    navigateTo("quote")
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Header
        currentPage={currentPage}
        navigateTo={navigateTo}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        cartCount={cartCount}
        setCartOpen={setCartOpen}
      />
      <main>
        {currentPage === "home" && <HomePage navigateTo={navigateTo} />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "services" && <ServicesPage />}
        {currentPage === "cabinets" && (
          <ProductsPage category="cabinets" navigateTo={navigateTo} addToCart={addToCart} />
        )}
        {currentPage === "appliances" && (
          <ProductsPage category="appliances" navigateTo={navigateTo} addToCart={addToCart} />
        )}
        {currentPage === "sinks" && (
          <ProductsPage category="sinks" navigateTo={navigateTo} addToCart={addToCart} />
        )}
        {currentPage === "lighting" && (
          <ProductsPage category="lighting" navigateTo={navigateTo} addToCart={addToCart} />
        )}
        {currentPage === "partners" && <PartnersPage navigateTo={navigateTo} />}
        {currentPage === "portfolio" && <PortfolioPage />}
        {currentPage === "quote" && (
          <ConsultationScheduler
            navigateTo={navigateTo}
            preselectedLocation={preselectedLocation}
            clearPreselectedLocation={() => setPreselectedLocation(null)}
          />
        )}
        {currentPage === "faq" && <FAQPage navigateTo={navigateTo} />}
        {currentPage === "catalog-cabinetcraft" && (
          <CatalogPage partner="cabinetcraft" navigateTo={navigateTo} addToCart={addToCart} />
        )}
        {currentPage === "catalog-appliancepro" && (
          <CatalogPage partner="appliancepro" navigateTo={navigateTo} addToCart={addToCart} />
        )}
        {currentPage === "catalog-sinkworks" && (
          <CatalogPage partner="sinkworks" navigateTo={navigateTo} addToCart={addToCart} />
        )}
        {currentPage === "catalog-lightsource" && (
          <CatalogPage partner="lightsource" navigateTo={navigateTo} addToCart={addToCart} />
        )}
        {currentPage === "catalog-stoneworks" && (
          <CatalogPage partner="stoneworks" navigateTo={navigateTo} addToCart={addToCart} />
        )}
        {currentPage === "catalog-fixtureplus" && (
          <CatalogPage partner="fixtureplus" navigateTo={navigateTo} addToCart={addToCart} />
        )}
        {currentPage === "checkout" && (
          <CheckoutPage
            cartItems={cartItems}
            cartTotal={cartTotal}
            updateQty={updateQty}
            clearCart={clearCart}
            navigateTo={navigateTo}
            setCartOpen={setCartOpen}
          />
        )}
        {currentPage === "locations" && <LocationsHub navigateTo={navigateTo} />}
        {currentPage === "location-phoenix" && (
          <LocationPage
            city="phoenix"
            navigateTo={navigateTo}
            navigateToQuoteWithLocation={navigateToQuoteWithLocation}
          />
        )}
        {currentPage === "location-scottsdale" && (
          <LocationPage
            city="scottsdale"
            navigateTo={navigateTo}
            navigateToQuoteWithLocation={navigateToQuoteWithLocation}
          />
        )}
        {currentPage === "location-tucson" && (
          <LocationPage
            city="tucson"
            navigateTo={navigateTo}
            navigateToQuoteWithLocation={navigateToQuoteWithLocation}
          />
        )}
        {currentPage === "location-las-vegas" && (
          <LocationPage
            city="las-vegas"
            navigateTo={navigateTo}
            navigateToQuoteWithLocation={navigateToQuoteWithLocation}
          />
        )}
        {currentPage === "location-albuquerque" && (
          <LocationPage
            city="albuquerque"
            navigateTo={navigateTo}
            navigateToQuoteWithLocation={navigateToQuoteWithLocation}
          />
        )}
      </main>
      <Footer navigateTo={navigateTo} />

      {/* Cart Drawer */}
      <CartDrawer
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItems={cartItems}
        updateQty={updateQty}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
        navigateTo={navigateTo}
      />
    </div>
  )
}

// ============ HEADER ============
function Header({
  currentPage,
  navigateTo,
  mobileMenuOpen,
  setMobileMenuOpen,
  cartCount,
  setCartOpen,
}: {
  currentPage: PageView
  navigateTo: (page: PageView) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  cartCount: number
  setCartOpen: (open: boolean) => void
}) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems: { label: string; page: PageView }[] = [
    { label: "Home", page: "home" },
    { label: "About Us", page: "about" },
    { label: "Services", page: "services" },
    { label: "Manufacturer Partners", page: "partners" },
    { label: "Portfolio / Gallery", page: "portfolio" },
    { label: "Locations", page: "locations" },
    { label: "FAQ", page: "faq" },
  ]

  const productItems: { label: string; page: PageView }[] = [
    { label: "Cabinets", page: "cabinets" },
    { label: "Appliances", page: "appliances" },
    { label: "Sinks & Faucets", page: "sinks" },
    { label: "Lighting", page: "lighting" },
  ]

  const isProductPage = ["cabinets", "appliances", "sinks", "lighting"].includes(currentPage)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-[#DDD0C0] bg-[#FAF7F2]/95 backdrop-blur-sm transition-shadow",
        scrolled && "shadow-md"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => navigateTo("home")}
          className="flex items-center gap-2 text-[#5C3D20] hover:text-[#7C5C3E] transition-colors"
        >
          <Home className="h-6 w-6" />
          <span className="text-xl font-serif font-bold">HRS</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.slice(0, 3).map((item) => (
            <button
              key={item.page}
              onClick={() => navigateTo(item.page)}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                currentPage === item.page
                  ? "text-[#C9973A] border-b-2 border-[#C9973A]"
                  : "text-[#2C1A0E] hover:text-[#7C5C3E] hover:bg-[#F0EAE0]"
              )}
            >
              {item.label}
            </button>
          ))}

          {/* Products Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                  isProductPage
                    ? "text-[#C9973A] border-b-2 border-[#C9973A]"
                    : "text-[#2C1A0E] hover:text-[#7C5C3E] hover:bg-[#F0EAE0]"
                )}
              >
                Products
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#FAF7F2] border-[#7C5C3E] shadow-lg">
              {productItems.map((item) => (
                <DropdownMenuItem
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className={cn(
                    "cursor-pointer flex items-center justify-between",
                    currentPage === item.page && "text-[#C9973A] bg-[#F0EAE0]"
                  )}
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-[#8A7060]" />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navItems.slice(3).map((item) => (
            <button
              key={item.page}
              onClick={() => navigateTo(item.page)}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors rounded-lg",
                currentPage === item.page
                  ? "text-[#C9973A] border-b-2 border-[#C9973A]"
                  : "text-[#2C1A0E] hover:text-[#7C5C3E] hover:bg-[#F0EAE0]"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-[#2C1A0E] hover:text-[#7C5C3E] transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#7C5C3E] text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href="tel:602-KITCHEN"
            className="hidden md:flex items-center gap-1 text-sm text-[#8A7060]"
          >
            <Phone className="h-4 w-4" />
            602-KITCHEN
          </a>
          <Button
            onClick={() => navigateTo("quote")}
            className="hidden sm:flex bg-[#C9973A] hover:bg-[#b8862f] text-white"
          >
            Request a Quote
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#2C1A0E]"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#DDD0C0] bg-[#FAF7F2] p-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={cn(
                  "px-3 py-2 text-left text-sm font-medium transition-colors rounded-lg",
                  currentPage === item.page
                    ? "text-[#C9973A] bg-[#F0EAE0]"
                    : "text-[#2C1A0E] hover:bg-[#F0EAE0]"
                )}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-[#DDD0C0] pt-2 mt-2">
              <p className="px-3 py-1 text-xs text-[#8A7060] uppercase tracking-wider">Products</p>
              {productItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className={cn(
                    "px-3 py-2 text-left text-sm font-medium transition-colors rounded-lg w-full",
                    currentPage === item.page
                      ? "text-[#C9973A] bg-[#F0EAE0]"
                      : "text-[#2C1A0E] hover:bg-[#F0EAE0]"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Button
              onClick={() => navigateTo("quote")}
              className="mt-4 bg-[#C9973A] hover:bg-[#b8862f] text-white w-full"
            >
              Request a Quote
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

// ============ CART DRAWER ============
function CartDrawer({
  cartOpen,
  setCartOpen,
  cartItems,
  updateQty,
  removeFromCart,
  cartTotal,
  navigateTo,
}: {
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  cartItems: CartItem[]
  updateQty: (id: string, delta: number) => void
  removeFromCart: (id: string) => void
  cartTotal: number
  navigateTo: (page: PageView) => void
}) {
  if (!cartOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={() => setCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-[420px] bg-[#FAF7F2] shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2C1A0E]">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#2C1A0E]">Your Cart</h2>
            <p className="text-sm text-[#8A7060]">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 text-[#2C1A0E] hover:text-[#7C5C3E]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="h-16 w-16 text-[#DDD0C0] mb-4" />
              <p className="text-lg font-medium text-[#2C1A0E] mb-2">Your cart is empty</p>
              <p className="text-sm text-[#8A7060] mb-6">
                Browse our products to find what you need.
              </p>
              <Button
                onClick={() => {
                  navigateTo("cabinets")
                  setCartOpen(false)
                }}
                variant="outline"
                className="border-[#7C5C3E] text-[#7C5C3E] hover:bg-[#7C5C3E] hover:text-white"
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-[#DDD0C0]"
                >
                  <div className="flex-1">
                    <p className="font-medium text-[#2C1A0E] line-clamp-2">{item.name}</p>
                    <p className="text-xs text-[#8A7060] font-mono mt-1">SKU: {item.sku}</p>
                    <Badge className="mt-2 bg-[#C9973A]/20 text-[#7C5C3E] border-none text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-bold text-[#7C5C3E]">
                      ${(item.price * item.qty).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        disabled={item.qty <= 1}
                        className="p-1 border border-[#7C5C3E] rounded text-[#7C5C3E] hover:bg-[#7C5C3E] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="p-1 border border-[#7C5C3E] rounded text-[#7C5C3E] hover:bg-[#7C5C3E] hover:text-white"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-[#8A7060] hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-[#DDD0C0] bg-[#F0EAE0]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#2C1A0E]">Subtotal</span>
              <span className="text-xl font-bold text-[#7C5C3E]">
                ${cartTotal.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-[#8A7060] mb-4">
              Delivery and installation quoted separately
            </p>
            <Button
              onClick={() => {
                navigateTo("checkout")
                setCartOpen(false)
              }}
              className="w-full bg-[#7C5C3E] hover:bg-[#5C3D20] text-white mb-2"
            >
              Proceed to Checkout
            </Button>
            <Button
              onClick={() => setCartOpen(false)}
              variant="outline"
              className="w-full border-[#7C5C3E] text-[#7C5C3E] hover:bg-[#7C5C3E]/10"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

// ============ FOOTER ============
function Footer({ navigateTo }: { navigateTo: (page: PageView) => void }) {
  return (
    <footer className="bg-[#2C1A0E] text-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Column 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Home className="h-6 w-6 text-[#C9973A]" />
              <span className="text-xl font-serif font-bold">HRS</span>
            </div>
            <p className="text-[#DDD0C0] text-sm mb-2">
              Expert Kitchen & Bath Renovations Since 2007
            </p>
            <p className="text-[#8A7060] text-sm">
              101 Sedalia Drive, Phoenix, AZ 85001
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Our Locations</h3>
            <ul className="space-y-2 text-sm text-[#DDD0C0]">
              <li>
                <button onClick={() => navigateTo("location-phoenix")} className="hover:text-[#C9973A]">
                  Phoenix (HQ)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("location-scottsdale")} className="hover:text-[#C9973A]">
                  Scottsdale
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("location-tucson")} className="hover:text-[#C9973A]">
                  Tucson
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("location-las-vegas")} className="hover:text-[#C9973A]">
                  Las Vegas
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo("location-albuquerque")} className="hover:text-[#C9973A]">
                  Albuquerque
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", page: "home" as PageView },
                { label: "About", page: "about" as PageView },
                { label: "Services", page: "services" as PageView },
                { label: "Request a Quote", page: "quote" as PageView },
                { label: "FAQ", page: "faq" as PageView },
              ].map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => navigateTo(item.page)}
                    className="text-[#DDD0C0] hover:text-[#C9973A] transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#5C3D20] pt-8 text-center text-sm text-[#8A7060]">
          © 2026 Home Renovation Solutions LLC. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

// ============ HOME PAGE ============
function HomePage({ navigateTo }: { navigateTo: (page: PageView) => void }) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F0EAE0] to-[#FAF7F2] py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-[#7C5C3E]" />
          <div className="absolute bottom-10 right-20 h-48 w-48 rounded-full bg-[#C9973A]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#7C5C3E]/10">
              <ChefHat className="h-12 w-12 text-[#7C5C3E] opacity-0" />
            </div>
            <h1 className="text-balance font-serif text-4xl font-bold text-[#2C1A0E] md:text-5xl lg:text-6xl">
              Transforming Houses Into Dream Homes Across the Southwest
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[#8A7060]">
              Expert kitchen and bathroom renovations in Phoenix, Scottsdale, Tucson, Las Vegas,
              and Albuquerque — since 2007.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigateTo("quote")}
                size="lg"
                className="bg-[#C9973A] hover:bg-[#b8862f] text-white"
              >
                Request a Consultation
              </Button>
              <Button
                onClick={() => navigateTo("portfolio")}
                size="lg"
                variant="outline"
                className="border-[#7C5C3E] text-[#7C5C3E] hover:bg-[#7C5C3E] hover:text-white"
              >
                See Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why HRS - Feature Cards */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-serif text-3xl font-bold text-[#2C1A0E] mb-12">
            Why Choose HRS?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: UtensilsCrossed,
                title: "Kitchen Remodels",
                description:
                  "Transform your kitchen with custom cabinets, premium countertops, and modern appliances tailored to your lifestyle.",
              },
              {
                icon: Droplets,
                title: "Bathroom Renovations",
                description:
                  "Create a spa-like retreat with elegant fixtures, custom tile work, and thoughtful storage solutions.",
              },
              {
                icon: Ruler,
                title: "Custom Designs",
                description:
                  "Our expert designers work with you to create spaces that reflect your unique style and meet your specific needs.",
              },
            ].map((feature) => (
              <Card
                key={feature.title}
                className="bg-[#F0EAE0] border-[#DDD0C0] hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#7C5C3E]/10">
                    <feature.icon className="h-8 w-8 text-[#7C5C3E]" />
                  </div>
                  <CardTitle className="font-serif text-xl text-[#2C1A0E]">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-[#8A7060]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#7C5C3E] py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "39", label: "Employees" },
              { value: "5", label: "Locations" },
              { value: "15+", label: "Years Experience" },
              { value: "$14.5M+", label: "in Revenue" },
            ].map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <div className="text-4xl font-bold font-serif">{stat.value}</div>
                <div className="mt-1 text-[#DDD0C0]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Marquee Teaser - Now with 6 brands including FixturePlus */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#2C1A0E]">
              Trusted Manufacturer Partners
            </h2>
            <p className="mt-4 text-[#8A7060] max-w-2xl mx-auto">
              We represent industry-leading brands so you can browse current models and tech specs
              directly — no phone call required.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: "CabinetCo", view: "catalog-cabinetcraft" as PageView },
              { label: "AppliancePro", view: "catalog-appliancepro" as PageView },
              { label: "SinkWorks", view: "catalog-sinkworks" as PageView },
              { label: "LightSource", view: "catalog-lightsource" as PageView },
              { label: "StoneWorks", view: "catalog-stoneworks" as PageView },
              { label: "FixturePlus", view: "catalog-fixtureplus" as PageView },
            ].map((brand) => (
              <button
                key={brand.label}
                onClick={() => navigateTo(brand.view)}
                className="cursor-pointer"
              >
                <Card className="bg-[#F0EAE0] border-[#DDD0C0] hover:shadow-lg hover:-translate-y-1 transition-all">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7C5C3E]/10">
                      <Package className="h-8 w-8 text-[#7C5C3E]" />
                    </div>
                    <p className="mt-4 font-medium text-xl text-[#2C1A0E]">{brand.label}</p>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              onClick={() => navigateTo("partners")}
              className="bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
            >
              View All Partners
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#F0EAE0]">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-center font-serif text-3xl font-bold text-[#2C1A0E] mb-12">
            What Our Clients Say
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "HRS transformed our outdated kitchen into a modern masterpiece. The attention to detail was incredible!",
                name: "Sarah T.",
                location: "Scottsdale",
              },
              {
                quote:
                  "Professional from start to finish. Our bathroom renovation exceeded all expectations.",
                name: "Michael R.",
                location: "Phoenix",
              },
              {
                quote:
                  "The team at HRS made our dream kitchen a reality. Highly recommend their services!",
                name: "Jennifer L.",
                location: "Las Vegas",
              },
            ].map((testimonial) => (
              <Card key={testimonial.name} className="bg-[#FAF7F2] border-[#DDD0C0]">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#C9973A] text-[#C9973A]" />
                    ))}
                  </div>
                  <p className="text-[#2C1A0E] italic">&quot;{testimonial.quote}&quot;</p>
                  <p className="mt-4 font-medium text-[#7C5C3E]">
                    {testimonial.name} — {testimonial.location}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ============ ABOUT PAGE ============
function AboutPage() {
  const teamMembers = [
    { name: "Joe Herold", role: "Founder, Owner, and President" },
    { name: "Emily Herold", role: "Founder, Owner, and VP" },
    { name: "Doug Plemmons", role: "Part Time IT Support Staff" },
  ]

  const locations = [
    { city: "Phoenix (HQ)", address: "101 Sedalia Drive, Phoenix, AZ 85001" },
    { city: "Scottsdale", address: "4500 N Scottsdale Rd, Scottsdale, AZ 85251" },
    { city: "Tucson", address: "2200 E Broadway Blvd, Tucson, AZ 85719" },
    { city: "Las Vegas", address: "3800 S Maryland Pkwy, Las Vegas, NV 89119" },
    { city: "Albuquerque", address: "6600 Menaul Blvd NE, Albuquerque, NM 87110" },
  ]

  return (
    <div className="py-16 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl font-bold text-[#2C1A0E]">
            About Home Renovation Solutions
          </h1>
          <div className="mt-4 mx-auto w-24 h-1 bg-[#C9973A]" />
        </div>

        {/* Founders Story */}
        <div className="grid gap-12 lg:grid-cols-2 mb-20">
          <div className="flex items-center justify-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kTWWgMCVrI4ZwANK25HUSR0DqtppDo.png"
              alt="Joe and Emily Herold, founders of Home Renovation Solutions"
              className="h-80 w-full max-w-md rounded-2xl object-cover object-center shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-6">Our Story</h2>
            <p className="text-[#8A7060] mb-4">
              Home Renovation Solutions (HRS) is a home improvement LLC founded in May 2007 by Joe
              and Emily Herold, headquartered at 101 Sedalia Drive, Phoenix, AZ 85001.
            </p>
            <p className="text-[#8A7060] mb-4">
              Specializing in kitchen and bathroom renovations, HRS has grown to five locations
              across the Southwest with 39 employees and over $14.5 million in gross revenue.
            </p>
            <p className="text-[#8A7060]">
              Operating at a 30% gross margin with approximately $1.775 million in salaries and
              benefits, we continue to deliver exceptional quality and service to homeowners
              throughout the region.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {[
            { value: "39", label: "Employees" },
            { value: "5", label: "Locations" },
            { value: "15+", label: "Years" },
            { value: "$14.5M+", label: "Revenue" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-[#FAF7F2] border-2 border-[#7C5C3E]">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold font-serif text-[#7C5C3E]">{stat.value}</div>
                <div className="mt-1 text-[#8A7060]">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="font-serif text-3xl font-bold text-[#2C1A0E] text-center mb-4">
            Our Team
          </h2>
          <p className="text-center text-[#8A7060] max-w-2xl mx-auto mb-12">
            Led by Joe and Emily Herold, our team has grown to 39 dedicated professionals across five Southwest locations, including specialized designers, master installers, and logistics experts.
          </p>

          {/* Three-column layout: Design Team | Leadership | Renovation Crew */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left — Design and Sales Team */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-1 flex-1 bg-[#C9973A]/40 rounded" />
                <h3 className="font-serif text-lg font-semibold text-[#7C5C3E] whitespace-nowrap">Design &amp; Sales Team</h3>
                <div className="h-1 flex-1 bg-[#C9973A]/40 rounded" />
              </div>
              <div className="space-y-3">
                {[
                  { name: "Sarah Mitchell", role: "Lead Kitchen Designer" },
                  { name: "Carlos Ruiz", role: "Bath & Tile Specialist" },
                  { name: "Priya Nair", role: "Interior Design Consultant" },
                  { name: "James Thornton", role: "Sales & Estimating Lead" },
                ].map((member) => (
                  <Card key={member.name} className="bg-[#F0EAE0] border-[#DDD0C0]">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7C5C3E]/10">
                        <Users className="h-5 w-5 text-[#7C5C3E]" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#2C1A0E]">{member.name}</p>
                        <p className="text-xs text-[#8A7060]">{member.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Center — Leadership (Joe, Emily, Doug) */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-1 flex-1 bg-[#C9973A]/60 rounded" />
                <h3 className="font-serif text-lg font-semibold text-[#7C5C3E] whitespace-nowrap">Leadership</h3>
                <div className="h-1 flex-1 bg-[#C9973A]/60 rounded" />
              </div>
              <div className="space-y-4">
                {teamMembers.map((member, idx) => (
                  <Card
                    key={member.name}
                    className={idx < 2 ? "bg-[#7C5C3E] border-[#5C3D20]" : "bg-[#F0EAE0] border-[#DDD0C0]"}
                  >
                    <CardContent className="p-5 text-center">
                      <div className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full ${idx < 2 ? "bg-white/15" : "bg-[#7C5C3E]/10"}`}>
                        <Users className={`h-8 w-8 ${idx < 2 ? "text-white" : "text-[#7C5C3E]"}`} />
                      </div>
                      <h3 className={`font-semibold text-base ${idx < 2 ? "text-white" : "text-[#2C1A0E]"}`}>{member.name}</h3>
                      <p className={`text-sm mt-1 ${idx < 2 ? "text-[#EDD9A3]" : "text-[#8A7060]"}`}>{member.role}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right — Renovation Crew */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-5">
                <div className="h-1 flex-1 bg-[#C9973A]/40 rounded" />
                <h3 className="font-serif text-lg font-semibold text-[#7C5C3E] whitespace-nowrap">Renovation Crew</h3>
                <div className="h-1 flex-1 bg-[#C9973A]/40 rounded" />
              </div>
              <div className="space-y-3">
                {[
                  { name: "Derek Walsh", role: "Master Installer" },
                  { name: "Tomas Guerrero", role: "Cabinetry & Millwork Lead" },
                  { name: "Linda Park", role: "Tile & Flooring Specialist" },
                  { name: "Marcus Webb", role: "Logistics & Site Coordinator" },
                ].map((member) => (
                  <Card key={member.name} className="bg-[#F0EAE0] border-[#DDD0C0]">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7C5C3E]/10">
                        <Users className="h-5 w-5 text-[#7C5C3E]" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#2C1A0E]">{member.name}</p>
                        <p className="text-xs text-[#8A7060]">{member.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Locations */}
        <div>
          <h2 className="font-serif text-3xl font-bold text-[#2C1A0E] text-center mb-12">
            Our Locations
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Card key={location.city} className="bg-[#F0EAE0] border-[#DDD0C0]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-[#C9973A] shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[#2C1A0E]">{location.city}</h3>
                      <p className="text-sm text-[#8A7060]">{location.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============ SERVICES PAGE ============
function ServicesPage() {
  const kitchenServices = [
    { icon: Package, title: "Custom Cabinet Installation", description: "Premium cabinetry tailored to your space and style preferences." },
    { icon: Ruler, title: "Countertop Fabrication & Installation", description: "Granite, quartz, and marble countertops expertly measured and installed." },
    { icon: Refrigerator, title: "Appliance Selection & Installation", description: "Choose from our partner brands and have them professionally installed." },
    { icon: Lamp, title: "Lighting Design & Installation", description: "Task, ambient, and accent lighting to enhance your kitchen." },
    { icon: UtensilsCrossed, title: "Flooring & Backsplash", description: "Complete your kitchen with beautiful flooring and tile work." },
  ]

  const bathroomServices = [
    { icon: Bath, title: "Full Bathroom Remodels", description: "Complete transformations from concept to completion." },
    { icon: Droplets, title: "Sink & Faucet Installation", description: "Modern fixtures from our trusted manufacturer partners." },
    { icon: Ruler, title: "Custom Tile Work", description: "Expert tile installation for floors, walls, and showers." },
    { icon: Package, title: "Vanity & Storage Solutions", description: "Maximize space with custom vanities and built-in storage." },
    { icon: Wrench, title: "Fixture Upgrades", description: "Replace outdated fixtures with modern, efficient options." },
  ]

  const processSteps = [
    { icon: MessageSquare, step: "1", title: "Consultation", description: "We learn your vision, budget, and timeline." },
    { icon: Ruler, step: "2", title: "Design", description: "Our designers create detailed plans and material selections." },
    { icon: Wrench, step: "3", title: "Installation", description: "Certified crews execute the build with precision." },
    { icon: CheckCircle, step: "4", title: "Walkthrough", description: "We walk through every detail until you're 100% satisfied." },
  ]

  return (
    <div className="py-16 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl font-bold text-[#2C1A0E]">Our Renovation Services</h1>
          <div className="mt-4 mx-auto w-24 h-1 bg-[#C9973A]" />
          <p className="mt-6 text-[#8A7060] max-w-2xl mx-auto">
            We specialize in kitchen and bathroom renovations, delivering exceptional craftsmanship
            and personalized designs for homeowners across the Southwest.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-12 lg:grid-cols-2 mb-20">
          {/* Kitchen Services */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-6 flex items-center gap-2">
              <UtensilsCrossed className="h-6 w-6 text-[#C9973A]" />
              Kitchen Renovation Services
            </h2>
            <div className="space-y-4">
              {kitchenServices.map((service) => (
                <Card key={service.title} className="bg-[#F0EAE0] border-[#DDD0C0]">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#7C5C3E]/10">
                      <service.icon className="h-6 w-6 text-[#7C5C3E]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2C1A0E]">{service.title}</h3>
                      <p className="text-sm text-[#8A7060]">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Bathroom Services */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-6 flex items-center gap-2">
              <Droplets className="h-6 w-6 text-[#C9973A]" />
              Bathroom Renovation Services
            </h2>
            <div className="space-y-4">
              {bathroomServices.map((service) => (
                <Card key={service.title} className="bg-[#F0EAE0] border-[#DDD0C0]">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#7C5C3E]/10">
                      <service.icon className="h-6 w-6 text-[#7C5C3E]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2C1A0E]">{service.title}</h3>
                      <p className="text-sm text-[#8A7060]">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Our Process */}
        <div className="bg-[#F0EAE0] rounded-2xl p-8 lg:p-12">
          <h2 className="font-serif text-3xl font-bold text-[#2C1A0E] text-center mb-12">
            Our Process
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#7C5C3E] text-white">
                  <span className="text-2xl font-bold">{step.step}</span>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-[31px] left-[calc(50%+2rem+33px)] w-[calc(100%-4rem-66px)] h-[3px] bg-[#DDD0C0] -translate-y-px" />
                )}
                <step.icon className="mx-auto h-8 w-8 text-[#C9973A] mb-3" />
                <h3 className="font-semibold text-[#2C1A0E]">{step.title}</h3>
                <p className="text-sm text-[#8A7060] mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============ PRODUCTS PAGE ============
function ProductsPage({
  category,
  navigateTo,
  addToCart,
}: {
  category: "cabinets" | "appliances" | "sinks" | "lighting"
  navigateTo: (page: PageView) => void
  addToCart: (item: Omit<CartItem, "qty">) => void
}) {
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())

  const categories = [
    { id: "cabinets", label: "Cabinets" },
    { id: "appliances", label: "Appliances" },
    { id: "sinks", label: "Sinks & Faucets" },
    { id: "lighting", label: "Lighting" },
  ] as const

  const categoryCalloutMappings: Record<string, { name: string; catalogView: PageView }[]> = {
    cabinets: [
      { name: "CabinetCraft Co.", catalogView: "catalog-cabinetcraft" },
      { name: "StoneWorks", catalogView: "catalog-stoneworks" },
      { name: "FixturePlus", catalogView: "catalog-fixtureplus" },
    ],
    appliances: [
      { name: "AppliancePro", catalogView: "catalog-appliancepro" },
      { name: "CabinetCraft Co.", catalogView: "catalog-cabinetcraft" },
      { name: "SinkWorks", catalogView: "catalog-sinkworks" },
    ],
    sinks: [
      { name: "SinkWorks", catalogView: "catalog-sinkworks" },
      { name: "FixturePlus", catalogView: "catalog-fixtureplus" },
      { name: "StoneWorks", catalogView: "catalog-stoneworks" },
    ],
    lighting: [
      { name: "LightSource", catalogView: "catalog-lightsource" },
      { name: "AppliancePro", catalogView: "catalog-appliancepro" },
      { name: "FixturePlus", catalogView: "catalog-fixtureplus" },
    ],
  }

  const products = {
    cabinets: [
      { id: "cab-1", name: "42-inch Shaker Cabinet Set – White", price: 1299, sku: "CC-4200-W", stock: "In Stock", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-oBjtmZmlwblIwgOm7HCeVBTBM4lcsT.png" },
      { id: "cab-2", name: "Deluxe Oak Cabinet Kit", price: 4500, sku: "CC-OAK-10", stock: "In Stock", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7ZaeKYZfeTMWiWkLJuqWlpsNwN5P6v.png" },
      { id: "cab-3", name: "Farmhouse Base Cabinet – Walnut", price: 2100, sku: "CC-FARM-W", stock: "Low Stock", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BgclTP87kqrPzQVe98nRfijKVkeVD2.png" },
    ],
    appliances: [
      { id: "app-1", name: "Stainless Steel Range – 36 inch", price: 2800, sku: "AP-RNG-36", stock: "In Stock", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YNYnPwhuPtt8tzXTLwKN36CzJhxcwg.png" },
      { id: "app-2", name: "Built-in Dishwasher – Premium Series", price: 1100, sku: "AP-DW-PRE", stock: "In Stock", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TqJUuDpLoSbsqmmaoq2hLiB27SdRYy.png" },
      { id: "app-3", name: "French Door Refrigerator", price: 2200, sku: "AP-FDR-27", stock: "Low Stock", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cNa6eKWSNrsen0PLnkilzf0HPcmiqD.png" },
    ],
    sinks: [
      { id: "sink-1", name: "Stainless Steel Farmhouse Sink (Large)", price: 549, sku: "SW-FARM-L", stock: "In Stock", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-T2RNgj9HqoTuDgUeUpn06mrCWHSylG.png" },
      { id: "sink-2", name: "Granite Double Sink – Undermount", price: 850, sku: "SW-GRAN-DU", stock: "In Stock", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-QW0ltw0zaOM9pLmhX1eAGhizPMvK34.jpeg" },
      { id: "sink-3", name: "Chrome Pull-Down Kitchen Faucet", price: 320, sku: "SW-KFC-PD", stock: "In Stock", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-A2DwkI2p0bS1mMVNSJBSFlKgIuIFw5.png" },
    ],
    lighting: [
      { id: "light-1", name: "Under-Cabinet LED Strip Kit", price: 180, sku: "LS-LED-12", stock: "In Stock", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ieCJgfQo7YaSsMR1n73LpzgBS14ntF.png" },
      { id: "light-2", name: "Pendant Light Set – Brushed Bronze (3-pack)", price: 440, sku: "LS-PND-BB3", stock: "In Stock", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fkPHEax47KAwjOskZbY4nYg2G0yD3X.png" },
      { id: "light-3", name: "Recessed Lighting Kit – 6 pack", price: 290, sku: "LS-REC-6", stock: "In Stock", image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GI566smeTSQ6TsVaa8CGFOO0XFCWxv.png" },
    ],
  }

  const categoryTitle = {
    cabinets: "Cabinets",
    appliances: "Appliances",
    sinks: "Sinks & Faucets",
    lighting: "Lighting",
  }

  const handleAddToCart = (product: (typeof products)[typeof category][number]) => {
    addToCart({
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price,
      category: categoryTitle[category],
      source: "product",
    })
    setAddedItems((prev) => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev)
        next.delete(product.id)
        return next
      })
    }, 1500)
  }

  return (
    <div className="py-16 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-[#8A7060]">
          <span>Products</span>
          <span className="mx-2">&gt;</span>
          <span className="text-[#2C1A0E] font-medium">{categoryTitle[category]}</span>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              onClick={() => navigateTo(cat.id)}
              variant={category === cat.id ? "default" : "outline"}
              className={cn(
                category === cat.id
                  ? "bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
                  : "border-[#DDD0C0] text-[#2C1A0E] hover:bg-[#F0EAE0]"
              )}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {products[category].map((product) => (
            <Card key={product.id} className="bg-[#F0EAE0] border-[#DDD0C0]">
              <CardContent className="p-6">
                <div className="flex h-40 items-center justify-center rounded-lg bg-[#FAF7F2] mb-4 overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <Package className="h-16 w-16 text-[#7C5C3E]/50" />
                  )}
                </div>
                <h3 className="font-semibold text-[#2C1A0E] mb-2">{product.name}</h3>
                <p className="text-xl font-bold text-[#7C5C3E] mb-3">${product.price.toLocaleString()}</p>
                <Badge
                  variant="outline"
                  className={cn(
                    "mb-4",
                    product.stock === "In Stock"
                      ? "border-green-500 text-green-700 bg-green-50"
                      : "border-yellow-500 text-yellow-700 bg-yellow-50"
                  )}
                >
                  {product.stock}
                </Badge>
                <div className="space-y-2">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className={cn(
                      "w-full",
                      addedItems.has(product.id)
                        ? "bg-green-600 hover:bg-green-600"
                        : "bg-[#7C5C3E] hover:bg-[#5C3D20]",
                      "text-white"
                    )}
                  >
                    {addedItems.has(product.id) ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                        {product.stock === "Low Stock" && (
                          <AlertCircle className="h-4 w-4 ml-2" />
                        )}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-[#7C5C3E] text-[#7C5C3E] hover:bg-[#7C5C3E] hover:text-white"
                    onClick={() => navigateTo("quote")}
                  >
                    Request a Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partner Catalog Callout */}
        <div className="bg-[#FAF7F2] border-2 border-[#C9973A] rounded-2xl p-8">
          <h3 className="font-serif text-xl font-bold text-[#2C1A0E] mb-4">
            Looking for a specific model or spec sheet?
          </h3>
          <p className="text-[#8A7060] mb-6">
            Browse our manufacturer catalogs below for complete product listings and technical
            specifications.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {(categoryCalloutMappings[category] || []).map((partner) => (
              <button
                key={partner.name}
                onClick={() => navigateTo(partner.catalogView)}
                className="w-full"
              >
                <Card className="bg-[#F0EAE0] border-[#DDD0C0] hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Package className="h-8 w-8 text-[#7C5C3E]" />
                      <span className="font-medium text-[#2C1A0E]">{partner.name}</span>
                    </div>
                    <ExternalLink className="h-5 w-5 text-[#C9973A]" />
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============ PARTNERS PAGE ============
function PartnersPage({ navigateTo }: { navigateTo: (page: PageView) => void }) {
  const partners: { name: string; category: string; description: string; catalogView: PageView }[] = [
    { name: "CabinetCraft Co.", category: "Cabinets & Millwork", description: "Premium custom cabinetry for every home.", catalogView: "catalog-cabinetcraft" },
    { name: "AppliancePro", category: "Kitchen Appliances", description: "Industry-leading appliances for modern homes.", catalogView: "catalog-appliancepro" },
    { name: "SinkWorks", category: "Sinks & Fixtures", description: "High-quality sinks and faucets for every style.", catalogView: "catalog-sinkworks" },
    { name: "LightSource", category: "Lighting Solutions", description: "Innovative lighting designs for every room.", catalogView: "catalog-lightsource" },
    { name: "StoneWorks", category: "Countertops", description: "Premium granite, quartz, and marble surfaces.", catalogView: "catalog-stoneworks" },
    { name: "FixturePlus", category: "Bath Fixtures", description: "Modern bathroom fixtures and accessories.", catalogView: "catalog-fixtureplus" },
  ]

  return (
    <div className="py-16 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl font-bold text-[#2C1A0E]">Our Manufacturer Partners</h1>
          <div className="mt-4 mx-auto w-24 h-1 bg-[#C9973A]" />
          <p className="mt-6 text-[#8A7060] max-w-2xl mx-auto">
            HRS represents best-in-class brands across every product category. Browse current
            models, technical specifications, and pricing directly from our partner sites — no
            phone call needed.
          </p>
        </div>

        {/* Partner Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {partners.map((partner) => (
            <Card key={partner.name} className="bg-[#F0EAE0] border-[#DDD0C0] hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#7C5C3E]/10 mx-auto mb-4">
                  <Package className="h-10 w-10 text-[#7C5C3E]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2C1A0E] text-center">{partner.name}</h3>
                <Badge className="mx-auto block w-fit mt-2 bg-[#C9973A]/20 text-[#7C5C3E] border-none">
                  {partner.category}
                </Badge>
                <p className="text-center text-[#8A7060] mt-4 flex-1">{partner.description}</p>
                <Button 
                  onClick={() => navigateTo(partner.catalogView)}
                  className="w-full mt-auto flex items-center justify-center gap-2 bg-[#7C5C3E] hover:bg-[#5C3D20] text-white py-3 px-6 text-sm font-medium leading-none"
                >
                  Browse Catalog <ExternalLink className="h-4 w-4 shrink-0" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-[#7C5C3E] rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="font-serif text-2xl font-bold mb-4">
            Don&apos;t see what you&apos;re looking for?
          </h2>
          <p className="text-[#DDD0C0] mb-6 max-w-xl mx-auto">
            Our design team is here to help you find the perfect products for your project.
          </p>
          <Button
            onClick={() => navigateTo("quote")}
            className="bg-[#C9973A] hover:bg-[#b8862f] text-white"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  )
}

// ============ PORTFOLIO PAGE ============
function PortfolioPage() {
  const [filter, setFilter] = useState("all")
  const [selectedImage, setSelectedImage] = useState<{ title: string; image: string } | null>(null)

  const projects = [
    { 
      title: "Scottsdale Kitchen Remodel", 
      category: "kitchens", 
      icon: ChefHat,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-veg1tHpBnpbSpIeDWKTO0OWEVmvbhJ.png"
    },
    { 
      title: "Las Vegas Master Bath", 
      category: "bathrooms", 
      icon: Bath,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CMG3nvaNZJMRTLGl9JPJL0UxRsYnU0.png"
    },
    { 
      title: "Phoenix Custom Cabinets", 
      category: "custom", 
      icon: Package,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ah6ugoFAeNxeaiEBiNsHjtB8Ne56vF.png"
    },
    { 
      title: "Tucson Kitchen & Lighting", 
      category: "kitchens", 
      icon: Lamp,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GjJFPUX3g1lcVzm1rvSPDemaJaEDME.png"
    },
    { 
      title: "Albuquerque Bathroom Renovation", 
      category: "bathrooms", 
      icon: Droplets,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-usprJtCQddMjR8f51sjn8sanVZZkCL.png"
    },
    { 
      title: "Scottsdale Full Kitchen", 
      category: "kitchens", 
      icon: UtensilsCrossed,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-r7UVdebacLLYukLaVLItHChqVW70kX.png"
    },
  ]

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter)

  return (
    <div className="py-16 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-[#2C1A0E]">Our Work</h1>
          <div className="mt-4 mx-auto w-24 h-1 bg-[#C9973A]" />
          <p className="mt-6 text-[#8A7060] max-w-2xl mx-auto">
            A selection of completed renovations across all five of our Southwest locations.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: "all", label: "All" },
            { id: "kitchens", label: "Kitchens" },
            { id: "bathrooms", label: "Bathrooms" },
            { id: "custom", label: "Custom" },
          ].map((f) => (
            <Button
              key={f.id}
              onClick={() => setFilter(f.id)}
              variant={filter === f.id ? "default" : "outline"}
              className={cn(
                filter === f.id
                  ? "bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
                  : "border-[#DDD0C0] text-[#2C1A0E] hover:bg-[#F0EAE0]"
              )}
            >
              {f.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <button
              key={project.title}
              onClick={() => setSelectedImage({ title: project.title, image: project.image })}
              className="group relative overflow-hidden rounded-2xl bg-[#F0EAE0] border border-[#DDD0C0] cursor-pointer text-left"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-[#7C5C3E]/0 group-hover:bg-[#7C5C3E]/40 transition-all flex items-center justify-center">
                <ZoomIn className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2C1A0E]/90 to-transparent p-4">
                <p className="text-white font-medium">{project.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-[#C9973A] transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="relative max-w-5xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
            <p className="mt-4 text-center text-white text-lg font-medium">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ============ CONSULTATION SCHEDULER (replaces QuotePage) ============
function ConsultationScheduler({
  navigateTo,
  preselectedLocation,
  clearPreselectedLocation,
}: {
  navigateTo: (page: PageView) => void
  preselectedLocation: string | null
  clearPreselectedLocation: () => void
}) {
  const [step, setStep] = useState(1)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(preselectedLocation)
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [consultationType, setConsultationType] = useState<string>("in-person")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
    sendConfirmation: true,
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (preselectedLocation) {
      setSelectedLocation(preselectedLocation)
    }
  }, [preselectedLocation])

  const locations = [
    { id: "phoenix", city: "Phoenix (HQ)", address: "101 Sedalia Drive, Phoenix, AZ 85001", phone: "602-KITCHEN", team: 10 },
    { id: "scottsdale", city: "Scottsdale", address: "4500 N Scottsdale Rd, Scottsdale, AZ 85251", phone: "480-KITCHEN", team: 8 },
    { id: "tucson", city: "Tucson", address: "2200 E Broadway Blvd, Tucson, AZ 85719", phone: "520-KITCHEN", team: 7 },
    { id: "las-vegas", city: "Las Vegas", address: "3800 S Maryland Pkwy, Las Vegas, NV 89119", phone: "702-KITCHEN", team: 7 },
    { id: "albuquerque", city: "Albuquerque", address: "6600 Menaul Blvd NE, Albuquerque, NM 87110", phone: "505-KITCHEN", team: 7 },
  ]

  const projectTypes = [
    { id: "kitchen", label: "Kitchen Remodel", icon: UtensilsCrossed },
    { id: "bathroom", label: "Bathroom Remodel", icon: Droplets },
    { id: "cabinets", label: "Custom Cabinets", icon: Package },
    { id: "appliances", label: "Appliance Upgrade", icon: Zap },
    { id: "countertops", label: "Countertop Replacement", icon: Layers },
    { id: "full-home", label: "Full Home Renovation", icon: Home },
    { id: "lighting", label: "Lighting Design", icon: Lightbulb },
    { id: "other", label: "Other / Not Sure", icon: HelpCircle },
  ]

  const getNext14Days = () => {
    const days = []
    const today = new Date()
    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dayOfWeek = date.getDay()
      if (dayOfWeek !== 0) {
        days.push({
          date: date.toISOString().split("T")[0],
          label: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
          isEarliest: i < 3,
        })
      }
    }
    return days
  }

  const morningSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"]
  const afternoonSlots = ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

  const toggleProject = (id: string) => {
    setSelectedProjects((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const handleSubmit = () => {
    setSubmitted(true)
    clearPreselectedLocation()
  }

  if (submitted) {
    const location = locations.find((l) => l.id === selectedLocation)
    return (
      <div className="py-16 bg-[#FAF7F2]">
        <div className="mx-auto max-w-2xl px-4 lg:px-8 text-center">
          <div className="animate-[scaleIn_0.5s_ease-out]">
            <CalendarCheck className="h-20 w-20 text-[#C9973A] mx-auto mb-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#2C1A0E] mb-4">
            Consultation Requested!
          </h1>
          
          <Card className="bg-[#F0EAE0] border-[#7C5C3E] mt-8 text-left">
            <CardContent className="p-6 space-y-4">
              <div>
                <p className="text-sm text-[#8A7060]">Location</p>
                <p className="font-medium text-[#2C1A0E]">{location?.city}</p>
                <p className="text-sm text-[#8A7060]">{location?.address}</p>
              </div>
              <div>
                <p className="text-sm text-[#8A7060]">Project Type(s)</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedProjects.map((p) => {
                    const project = projectTypes.find((pt) => pt.id === p)
                    return (
                      <Badge key={p} className="bg-[#C9973A]/20 text-[#7C5C3E] border-none">
                        {project?.label}
                      </Badge>
                    )
                  })}
                </div>
              </div>
              <div>
                <p className="text-sm text-[#8A7060]">Date & Time</p>
                <p className="font-medium text-[#2C1A0E]">
                  {selectedDate} at {selectedTime} ({consultationType === "in-person" ? "In-Person" : "Video Call"})
                </p>
              </div>
              <div>
                <p className="text-sm text-[#8A7060]">Contact</p>
                <p className="font-medium text-[#2C1A0E]">
                  {formData.firstName} {formData.lastName}
                </p>
                <p className="text-sm text-[#8A7060]">{formData.email}</p>
                <p className="text-sm text-[#8A7060]">{formData.phone}</p>
              </div>
            </CardContent>
          </Card>

          <p className="mt-6 text-[#8A7060]">
            We&apos;ll send a confirmation to {formData.email}. An HRS designer will reach out to confirm your appointment and any preparation details.
          </p>

          <Button
            onClick={() => navigateTo("home")}
            className="mt-8 bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
          >
            Return Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 bg-[#FAF7F2]">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-[#2C1A0E]">Schedule a Consultation</h1>
          <div className="mt-4 mx-auto w-24 h-1 bg-[#C9973A]" />
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12">
          {[
            { num: 1, label: "Location" },
            { num: 2, label: "Project" },
            { num: 3, label: "Schedule" },
            { num: 4, label: "Details" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold",
                    step > s.num
                      ? "bg-[#7C5C3E] text-white"
                      : step === s.num
                      ? "bg-[#7C5C3E] text-white"
                      : "border-2 border-[#DDD0C0] text-[#8A7060]"
                  )}
                >
                  {step > s.num ? <Check className="h-5 w-5" /> : s.num}
                </div>
                <span className="mt-2 text-xs text-[#8A7060]">{s.label}</span>
              </div>
              {i < 3 && (
                <div
                  className={cn(
                    "h-1 w-12 mx-2 rounded",
                    step > s.num ? "bg-[#7C5C3E]" : "bg-[#DDD0C0]"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Location */}
        {step === 1 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-2">
              Which HRS location is nearest to you?
            </h2>
            <p className="text-[#8A7060] mb-8">
              We have 5 locations across the Southwest, each with a dedicated design and installation team.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc.id)}
                  className={cn(
                    "relative p-6 rounded-xl border-2 text-left transition-all",
                    selectedLocation === loc.id
                      ? "border-[#7C5C3E] bg-[#C9973A]/10"
                      : "border-[#DDD0C0] bg-[#F0EAE0] hover:border-[#7C5C3E]"
                  )}
                >
                  {selectedLocation === loc.id && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle className="h-6 w-6 text-[#7C5C3E]" />
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#7C5C3E]/10">
                      <MapPin className="h-6 w-6 text-[#7C5C3E]" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-[#2C1A0E]">{loc.city}</h3>
                      <p className="text-sm text-[#8A7060] mt-1">{loc.address}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-1 text-[#8A7060]">
                          <Phone className="h-4 w-4" />
                          {loc.phone}
                        </span>
                        <Badge className="bg-[#7C5C3E]/10 text-[#7C5C3E] border-none">
                          {loc.team}-person team
                        </Badge>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!selectedLocation}
                className="bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
              >
                Next: Project Type
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Project Type */}
        {step === 2 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-2">
              What are you looking to renovate?
            </h2>
            <p className="text-[#8A7060] mb-8">
              Select all that apply — we handle everything from single fixture upgrades to full multi-room transformations.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projectTypes.map((project) => (
                <button
                  key={project.id}
                  onClick={() => toggleProject(project.id)}
                  className={cn(
                    "relative p-4 rounded-xl border-2 text-left transition-all",
                    selectedProjects.includes(project.id)
                      ? "border-[#7C5C3E] bg-[#C9973A]/10"
                      : "border-[#DDD0C0] bg-[#F0EAE0] hover:border-[#7C5C3E]"
                  )}
                >
                  {selectedProjects.includes(project.id) && (
                    <div className="absolute top-2 right-2">
                      <Check className="h-5 w-5 text-[#7C5C3E]" />
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <project.icon
                      className={cn(
                        "h-6 w-6",
                        selectedProjects.includes(project.id) ? "text-[#C9973A]" : "text-[#7C5C3E]"
                      )}
                    />
                    <span className="font-medium text-[#2C1A0E]">{project.label}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-8 flex justify-between">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="border-[#7C5C3E] text-[#7C5C3E]"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={selectedProjects.length === 0}
                className="bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
              >
                Next: Schedule
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Schedule */}
        {step === 3 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-2">
              Pick a preferred consultation date and time.
            </h2>
            <p className="text-[#8A7060] mb-8">
              All consultations are free. In-person visits are available at your chosen location or we can arrange a video call.
            </p>

            {/* Date Selection */}
            <div className="mb-8">
              <p className="text-sm font-medium text-[#2C1A0E] mb-3">Select a Date</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {getNext14Days().map((day) => (
                  <button
                    key={day.date}
                    onClick={() => setSelectedDate(day.label)}
                    className={cn(
                      "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all",
                      selectedDate === day.label
                        ? "bg-[#7C5C3E] text-white"
                        : "bg-[#F0EAE0] text-[#2C1A0E] hover:bg-[#DDD0C0]"
                    )}
                  >
                    {day.label}
                    {day.isEarliest && (
                      <span className="block text-xs opacity-75">(Earliest)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div className="mb-8 animate-in fade-in slide-in-from-top-2">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sun className="h-5 w-5 text-[#C9973A]" />
                    <span className="text-sm font-medium text-[#2C1A0E]">Morning</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {morningSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                          selectedTime === time
                            ? "bg-[#7C5C3E] text-white"
                            : "bg-[#F0EAE0] text-[#2C1A0E] hover:bg-[#DDD0C0]"
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Coffee className="h-5 w-5 text-[#C9973A]" />
                    <span className="text-sm font-medium text-[#2C1A0E]">Afternoon</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {afternoonSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                          selectedTime === time
                            ? "bg-[#7C5C3E] text-white"
                            : "bg-[#F0EAE0] text-[#2C1A0E] hover:bg-[#DDD0C0]"
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Consultation Type */}
            <div className="mb-8">
              <p className="text-sm font-medium text-[#2C1A0E] mb-3">Consultation Type</p>
              <RadioGroup
                value={consultationType}
                onValueChange={setConsultationType}
                className="flex gap-4"
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="in-person" className="border-[#7C5C3E] text-[#7C5C3E]" />
                  <span className="text-sm text-[#2C1A0E]">In-Person at HRS Location</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <RadioGroupItem value="video" className="border-[#7C5C3E] text-[#7C5C3E]" />
                  <span className="text-sm text-[#2C1A0E]">Video Call (Zoom/Teams)</span>
                </label>
              </RadioGroup>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="border-[#7C5C3E] text-[#7C5C3E]"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(4)}
                disabled={!selectedDate || !selectedTime}
                className="bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
              >
                Next: Your Details
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Details */}
        {step === 4 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-2">
              Almost done — tell us about yourself.
            </h2>
            <Card className="bg-white border-[#DDD0C0] mt-8">
              <CardContent className="p-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C1A0E]">First Name</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                      className="border-[#DDD0C0]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C1A0E]">Last Name</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                      className="border-[#DDD0C0]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2C1A0E]">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A7060]" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="border-[#DDD0C0] pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2C1A0E]">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A7060]" />
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                      className="border-[#DDD0C0] pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2C1A0E]">Additional Notes (Optional)</label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Anything else you'd like us to know before the consultation? Rough budget, current space dimensions, inspiration photos you can share, etc."
                    className="border-[#DDD0C0] min-h-[100px]"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={formData.sendConfirmation}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, sendConfirmation: checked as boolean })
                    }
                    className="border-[#7C5C3E] data-[state=checked]:bg-[#7C5C3E]"
                  />
                  <span className="text-sm text-[#2C1A0E]">Send me a confirmation email</span>
                </label>
              </CardContent>
            </Card>

            <div className="mt-8 flex justify-between">
              <Button
                onClick={() => setStep(3)}
                variant="outline"
                className="border-[#7C5C3E] text-[#7C5C3E]"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                className="bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
              >
                <CalendarCheck className="h-4 w-4 mr-2" />
                Request Consultation
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============ FAQ PAGE ============
function FAQPage({ navigateTo }: { navigateTo: (page: PageView) => void }) {
  const faqs = [
    {
      question: "How much will my cabinets cost?",
      answer:
        "Cabinets vary dramatically in price just like cars or houses. Entry-level cabinets are less expensive than cabinets with special finishes and upgraded storage features. HRS provides cabinetry that fits most any budget—from basic to bold.",
    },
    {
      question: "How long will it take to get the cabinets I order?",
      answer:
        "Order time varies depending on the manufacturer and the complexity of the job. The minimum time is roughly three weeks and can be as much as eight weeks during peak times of the year.",
    },
    {
      question: "Can you design my kitchen from a sketch of the room that I provide?",
      answer:
        "We can certainly start with a sketch you provide. Your forethought in doing some homework can shorten the time needed to design the final layout. However, we will always do our own measurements to verify that the design will actually work.",
    },
    {
      question: "What is the best type of countertop for the kitchen?",
      answer:
        "There are many possible countertop choices. As with cabinets, your budget needs to be matched with your desire for flexibility of design and product longevity. Laminate, solid surface, quartz-enhanced and granite are all good choices.",
    },
    {
      question: "Can you match my existing cabinets or furniture?",
      answer:
        "All woods and stains change color over time—some more so than others. In many cases, HRS can find cabinetry that may be compatible with your existing cabinets or furniture. In no case can we guarantee an exact match.",
    },
    {
      question: "What construction features should I look for when choosing cabinets?",
      answer:
        "Certain construction features are a sign of quality cabinets. A savvy consumer will look for things such as finished backs in all cabinets, drawer guides that also support the drawer bottom, conversion varnish (not lacquer) finishes, multi-way adjustable hinges, adjustable shelves, and a wide range of heights and depths. Newer convenience features include \"soft-close\" hinges and drawers, multi-function drawer systems, and optional task lighting. Be sure to check for the KCMA (Kitchen Cabinet Manufacturers Association) label, a certification that the cabinets meet construction standards designed to ensure many years of trouble-free service.",
    },
    {
      question: "What are the most popular types of cabinets?",
      answer:
        "While popular cabinet styles and trends vary from year to year, traditional raised-panel oak styling is always a favorite due to affordability and durability. A current trend is a \"stand-alone\" furniture look that allows for highly customized design features using cabinetry from major manufacturers. Besides oak, certain wood species tend to be favored by today's consumers. Maple is frequently used in remodeling because of its clean look and its ability to blend in with most existing finishes. Cherry has become increasingly popular as manufacturers have developed a variety of finishes allowing it to work in more applications.",
    },
    {
      question: "Are environmentally \"green\" cabinets available at a reasonable price?",
      answer:
        "HRS represents several manufacturers across the price spectrum whose cabinets are certified under the Environmental Stewardship Program developed by the KCMA (Kitchen Cabinet Manufacturers Association).",
    },
    {
      question: "What's the difference between manufactured cabinets and custom-made cabinets?",
      answer:
        "Years ago there was a significant difference in the sizes and finishes available from \"custom\" cabinetmakers and the \"stock\" manufacturers. Today, many cabinet manufacturers offer custom sizing and finishes that rival, and may even exceed, the possibilities of a local custom cabinet shop.",
    },
    {
      question: "Do you charge a design fee, measure fee or other fees in addition to the contract price for cabinets and installation?",
      answer:
        "HRS does not charge a measure fee or a design fee for a first design or estimate. In some cases, where multiple design revisions are requested, a design retainer may be requested. That retainer is then credited in full to the final cost of the job.",
    },
    {
      question: "Do you do major remodeling?",
      answer:
        "HRS specializes in \"light\" kitchen, office, or laundry room remodeling. We have strong working relationships with several quality, full-line remodeling firms for those jobs that require major structural renovation.",
    },
    {
      question: "Do you provide cabinets for remodeling only, or also for new construction?",
      answer:
        "HRS works with a number of reputable remodelers and can provide cabinets through your contractor or directly to you for your kitchen or bath remodeling project or room addition. We also work with many custom home builders, who consult with our designers to assure that the layouts for kitchen cabinets, bath cabinets, laundry room cabinets and other cabinetry are chosen to properly fit the budget and space. We will coordinate directly with your builder and also consult directly with you.",
    },
  ]

  return (
    <div className="py-16 bg-[#FAF7F2]">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-[#2C1A0E]">
            Frequently Asked Questions
          </h1>
          <div className="mt-4 mx-auto w-24 h-1 bg-[#C9973A]" />
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-[#F0EAE0] border border-[#DDD0C0] rounded-lg px-6"
            >
              <AccordionTrigger className="text-left text-[#2C1A0E] font-medium hover:text-[#7C5C3E]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#8A7060]">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA */}
        <div className="mt-12 bg-[#7C5C3E] rounded-2xl p-8 text-center text-white">
          <h2 className="font-serif text-2xl font-bold mb-4">Ready to get started?</h2>
          <Button
            onClick={() => navigateTo("quote")}
            className="bg-[#C9973A] hover:bg-[#b8862f] text-white"
          >
            Request a Consultation
          </Button>
        </div>
      </div>
    </div>
  )
}

// ============ CATALOG PAGE ============
type PartnerKey = "cabinetcraft" | "appliancepro" | "sinkworks" | "lightsource" | "stoneworks" | "fixtureplus"

interface CatalogProduct {
  id: string
  name: string
  sku: string
  price: string
  priceNum: number
  stock: "In Stock" | "Low Stock" | "Special Order"
  specs: string[]
}

interface CatalogPartnerData {
  name: string
  category: string
  bannerHue: string
  description: string
  products: CatalogProduct[]
}

const catalogData: Record<PartnerKey, CatalogPartnerData> = {
  cabinetcraft: {
    name: "CabinetCraft Co.",
    category: "Cabinets & Millwork",
    bannerHue: "#E8D5B7",
    description: "CabinetCraft Co. specializes in premium custom and semi-custom cabinetry for kitchen and bath. Every piece is built to order with solid wood construction and a lifetime finish warranty.",
    products: [
      { id: "cc-1", name: "42\" Shaker Cabinet Set – White", sku: "CC-4200-W", price: "$1,299", priceNum: 1299, stock: "In Stock", specs: ["Solid maple construction", "Soft-close hinges", "42\" height", "Available in 8 finish options"] },
      { id: "cc-2", name: "Deluxe Oak Cabinet Kit – 10-piece", sku: "CC-OAK-10", price: "$4,500", priceNum: 4500, stock: "In Stock", specs: ["Red oak veneer", "Full-extension drawers", "Dovetail joinery", "Includes crown molding"] },
      { id: "cc-3", name: "Farmhouse Base Cabinet – Walnut", sku: "CC-FARM-W", price: "$2,100", priceNum: 2100, stock: "Special Order", specs: ["American black walnut", "36\" base height", "Exposed face frame", "Oil finish"] },
      { id: "cc-4", name: "Floating Bathroom Vanity – 48\"", sku: "CC-VAN-48", price: "$1,850", priceNum: 1850, stock: "In Stock", specs: ["Plywood box construction", "2 soft-close doors", "Pre-drilled for undermount sink"] },
      { id: "cc-5", name: "Pantry Pull-Out Cabinet", sku: "CC-PAN-PO", price: "$980", priceNum: 980, stock: "In Stock", specs: ["Full-extension pull-out", "84\" tall", "5 adjustable shelves", "White painted finish"] },
      { id: "cc-6", name: "Glass-Front Display Cabinet", sku: "CC-DISP-GF", price: "$760", priceNum: 760, stock: "Special Order", specs: ["Tempered glass panels", "Interior LED-ready", "Available in 3 widths"] },
    ],
  },
  appliancepro: {
    name: "AppliancePro",
    category: "Kitchen Appliances",
    bannerHue: "#E0CBA8",
    description: "AppliancePro delivers industry-leading kitchen appliances trusted by renovation professionals nationwide. Our lineup covers everything from ranges to refrigerators with best-in-class warranty coverage.",
    products: [
      { id: "ap-1", name: "36\" Stainless Steel Gas Range", sku: "AP-RNG-36", price: "$2,800", priceNum: 2800, stock: "In Stock", specs: ["6 sealed burners", "Double convection oven", "Continuous cast-iron grates", "5-year warranty"] },
      { id: "ap-2", name: "French Door Refrigerator – 27 cu ft", sku: "AP-FDR-27", price: "$2,200", priceNum: 2200, stock: "Low Stock", specs: ["Counter-depth option", "Dual ice maker", "LED interior", "Energy Star certified"] },
      { id: "ap-3", name: "Built-in Dishwasher – Premium Series", sku: "AP-DW-PRE", price: "$1,100", priceNum: 1100, stock: "In Stock", specs: ["44 dBA ultra-quiet", "3rd rack", "Soil sensor", "6 wash cycles, panel-ready option"] },
      { id: "ap-4", name: "Over-Range Microwave – 2.1 cu ft", sku: "AP-MWV-21", price: "$540", priceNum: 540, stock: "In Stock", specs: ["400 CFM ventilation", "Sensor cooking", "1000W", "Fits 30\" cabinet opening"] },
      { id: "ap-5", name: "Counter-Depth Side-by-Side Refrigerator", sku: "AP-SBS-22", price: "$1,750", priceNum: 1750, stock: "Special Order", specs: ["22 cu ft", "External water/ice", "Door-in-door storage", "Fingerprint resistant"] },
      { id: "ap-6", name: "30\" Electric Induction Range", sku: "AP-IND-30", price: "$1,950", priceNum: 1950, stock: "In Stock", specs: ["4 induction zones", "Bridge element", "True convection", "Slide-in design"] },
    ],
  },
  sinkworks: {
    name: "SinkWorks",
    category: "Sinks & Fixtures",
    bannerHue: "#E5D8C8",
    description: "SinkWorks produces high-quality sinks and faucets engineered for both form and function. From farmhouse apron fronts to sleek undermount bowls, every piece carries a lifetime finish guarantee.",
    products: [
      { id: "sw-1", name: "Farmhouse Apron Sink – Stainless Steel (Large)", sku: "SW-FARM-L", price: "$549", priceNum: 549, stock: "In Stock", specs: ["16-gauge T-304 stainless", "33\"×21\"×9\"", "Single bowl", "Sound dampening coating"] },
      { id: "sw-2", name: "Granite Double Sink – Undermount", sku: "SW-GRAN-DU", price: "$850", priceNum: 850, stock: "In Stock", specs: ["Composite granite", "33\"×19\"", "60/40 split", "8 color options, chip-resistant"] },
      { id: "sw-3", name: "Chrome Pull-Down Kitchen Faucet", sku: "SW-KFC-PD", price: "$320", priceNum: 320, stock: "In Stock", specs: ["3-function spray", "68\" hose", "Ceramic disc cartridge", "Deck plate included"] },
      { id: "sw-4", name: "Vessel Bathroom Sink – White Porcelain", sku: "SW-VES-WP", price: "$290", priceNum: 290, stock: "In Stock", specs: ["Vitreous china", "16\"×5.5\" oval", "Overflow drain included", "Glossy finish"] },
      { id: "sw-5", name: "Bar/Prep Sink – 15\" Single Bowl", sku: "SW-BAR-15", price: "$210", priceNum: 210, stock: "In Stock", specs: ["18-gauge stainless", "15\"×15\"×7\"", "Bottom grid and drain included"] },
      { id: "sw-6", name: "Touchless Kitchen Faucet – Matte Black", sku: "SW-TCH-MB", price: "$480", priceNum: 480, stock: "Special Order", specs: ["Motion sensor + manual mode", "Pull-down spray", "1.8 GPM", "Deck plate included"] },
    ],
  },
  lightsource: {
    name: "LightSource",
    category: "Lighting Solutions",
    bannerHue: "#EDD9A3",
    description: "LightSource designs innovative lighting systems for kitchens, baths, and living spaces. From under-cabinet LED strips to statement pendants, every fixture is backed by a 5-year manufacturer warranty.",
    products: [
      { id: "ls-1", name: "Under-Cabinet LED Strip Kit – 12ft", sku: "LS-LED-12", price: "$180", priceNum: 180, stock: "In Stock", specs: ["2700K warm white", "Dimmable", "Plug-in or hardwire", "Linkable up to 32ft, CRI 90+"] },
      { id: "ls-2", name: "Pendant Light Set – Brushed Bronze (3-pack)", sku: "LS-PND-BB3", price: "$440", priceNum: 440, stock: "In Stock", specs: ["Adjustable 18\"–48\" cord", "E26 socket", "UL listed", "Fits 4\" canopy, 60W max"] },
      { id: "ls-3", name: "Recessed Lighting Kit – 6 Pack", sku: "LS-REC-6", price: "$290", priceNum: 290, stock: "In Stock", specs: ["6\" slim", "IC-rated", "650 lumen", "3000K, dimmable, no housing required"] },
      { id: "ls-4", name: "Statement Island Pendant – Antique Brass", sku: "LS-ISL-AB", price: "$380", priceNum: 380, stock: "Special Order", specs: ["Hand-hammered metal shade", "14\" diameter", "6ft cord", "100W equiv. LED"] },
      { id: "ls-5", name: "Vanity Bar Light – 5-Bulb Matte Black", sku: "LS-VAN-5B", price: "$210", priceNum: 210, stock: "In Stock", specs: ["36\" width", "ETL listed for damp locations", "G25 bulb base", "14\" from wall"] },
      { id: "ls-6", name: "Undercabinet Puck Lights – 6 Pack", sku: "LS-PCK-6", price: "$140", priceNum: 140, stock: "In Stock", specs: ["3000K", "200 lumen each", "Surface mount", "Hardwire, low-profile 0.5\" depth"] },
    ],
  },
  stoneworks: {
    name: "StoneWorks",
    category: "Countertops",
    bannerHue: "#DDD0C0",
    description: "StoneWorks offers premium granite, quartz, and marble surfaces fabricated and installed by certified craftsmen. Every slab is hand-selected for consistency and sealed for long-term durability.",
    products: [
      { id: "sto-1", name: "Calacatta Marble Slab – per sq ft", sku: "STO-CAL-SLAB", price: "$95/sqft", priceNum: 95, stock: "Special Order", specs: ["Italian origin", "White with gold veining", "Polished finish", "3/4\" or 1.25\" thickness"] },
      { id: "sto-2", name: "Kashmir White Granite – per sq ft", sku: "STO-KWG-SLAB", price: "$55/sqft", priceNum: 55, stock: "In Stock", specs: ["India origin", "Consistent pattern", "Pre-sealed", "Available in honed or polished"] },
      { id: "sto-3", name: "Quartz Countertop – Carrara White", sku: "STO-QTZ-CW", price: "$70/sqft", priceNum: 70, stock: "In Stock", specs: ["Engineered quartz", "Non-porous", "Scratch-resistant", "10-year warranty"] },
      { id: "sto-4", name: "Absolute Black Granite – per sq ft", sku: "STO-ABG-SLAB", price: "$60/sqft", priceNum: 60, stock: "In Stock", specs: ["Zimbabwe origin", "Jet black", "Mirror polish", "Ideal for dramatic contrast"] },
      { id: "sto-5", name: "Quartzite Slab – Taj Mahal", sku: "STO-QZT-TM", price: "$110/sqft", priceNum: 110, stock: "Special Order", specs: ["Brazil origin", "Soft beige/white", "Natural stone", "Requires annual sealing"] },
      { id: "sto-6", name: "Butcher Block – Maple 8ft", sku: "STO-BB-MAP8", price: "$620", priceNum: 620, stock: "In Stock", specs: ["Solid edge-grain maple", "1.5\" thick", "25\"×96\"", "Food-safe oil finish included"] },
    ],
  },
  fixtureplus: {
    name: "FixturePlus",
    category: "Bath Fixtures",
    bannerHue: "#E8D5C8",
    description: "FixturePlus delivers modern bathroom fixtures and accessories trusted by designers and contractors alike. Our collections combine durability with timeless aesthetics across every finish and style.",
    products: [
      { id: "fp-1", name: "Freestanding Soaking Tub – Matte White", sku: "FP-TUB-FW", price: "$1,400", priceNum: 1400, stock: "Special Order", specs: ["Acrylic", "59\"×29.5\"×23.5\"", "Center or end drain", "42 gallon capacity"] },
      { id: "fp-2", name: "Walk-In Shower System – 10\" Rain Head", sku: "FP-SHW-10R", price: "$890", priceNum: 890, stock: "In Stock", specs: ["Stainless rain head", "3-function hand spray", "Thermostatic valve", "Brushed nickel"] },
      { id: "fp-3", name: "Dual-Flush Elongated Toilet", sku: "FP-TOL-DF", price: "$380", priceNum: 380, stock: "In Stock", specs: ["1.0/1.6 GPF", "Comfort height 17\"", "Skirted trapway", "Slow-close seat included"] },
      { id: "fp-4", name: "Chrome Towel Bar Set – 3 piece", sku: "FP-TWL-CR3", price: "$120", priceNum: 120, stock: "In Stock", specs: ["18\", 24\", and 30\" bars", "Solid brass construction", "Mounting hardware included"] },
      { id: "fp-5", name: "Vessel Faucet – Oil-Rubbed Bronze", sku: "FP-VFC-ORB", price: "$310", priceNum: 310, stock: "Special Order", specs: ["Single-hole", "Ceramic disc", "1.2 GPM", "13\" tall spout, ADA compliant"] },
      { id: "fp-6", name: "Recessed Shower Niche – 12\"×24\"", sku: "FP-NCH-1224", price: "$95", priceNum: 95, stock: "In Stock", specs: ["Pre-sloped stainless insert", "Tile-ready", "Installs between 16\" OC studs"] },
    ],
  },
}

function CatalogPage({
  partner,
  navigateTo,
  addToCart,
}: {
  partner: PartnerKey
  navigateTo: (page: PageView) => void
  addToCart: (item: Omit<CartItem, "qty">) => void
}) {
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const data = catalogData[partner]

  const handleAddToCart = (product: CatalogProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: product.priceNum,
      category: data.category,
      source: "catalog",
    })
    setAddedItems((prev) => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev)
        next.delete(product.id)
        return next
      })
    }, 1500)
  }

  return (
    <div className="py-8 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[#8A7060]">
          <button
            onClick={() => navigateTo("partners")}
            className="hover:text-[#7C5C3E] transition-colors"
          >
            Manufacturer Partners
          </button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#2C1A0E] font-medium">{data.name}</span>
        </div>

        {/* Hero Banner */}
        <div
          className="rounded-2xl p-8 lg:p-12 mb-12"
          style={{ backgroundColor: data.bannerHue }}
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#7C5C3E]/10">
              <Package className="h-12 w-12 text-[#7C5C3E]" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-[#2C1A0E]">
                {data.name}
              </h1>
              <Badge className="mt-2 bg-[#C9973A]/20 text-[#7C5C3E] border-none">
                {data.category}
              </Badge>
              <p className="mt-4 text-[#5C3D20] max-w-2xl">{data.description}</p>
              <Button
                onClick={() => navigateTo("quote")}
                variant="outline"
                className="mt-6 border-[#7C5C3E] text-[#7C5C3E] hover:bg-[#7C5C3E] hover:text-white"
              >
                Contact Us About This Brand
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-2">
            Featured Products from {data.name}
          </h2>
          <p className="text-[#8A7060] mb-8">
            Browse current models and technical specifications. Contact our team to place an order
            or request a custom quote.
          </p>

          {/* Product Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.products.map((product) => (
              <Card
                key={product.sku}
                className="bg-[#F0EAE0] border-[#DDD0C0] hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  {/* Product Icon */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7C5C3E]/10 mx-auto mb-4">
                    <Package className="h-8 w-8 text-[#7C5C3E]" />
                  </div>

                  {/* Product Info */}
                  <h3 className="font-serif text-lg font-semibold text-[#2C1A0E] text-center">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#8A7060] text-center font-mono mt-1">
                    SKU: {product.sku}
                  </p>

                  {/* Specs */}
                  <ul className="mt-4 space-y-1">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#5C3D20]">
                        <CheckCircle className="h-4 w-4 text-[#7C5C3E] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price & Stock */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-[#7C5C3E]">{product.price}</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        product.stock === "In Stock"
                          ? "border-green-500 text-green-700 bg-green-50"
                          : product.stock === "Low Stock"
                          ? "border-yellow-500 text-yellow-700 bg-yellow-50"
                          : "border-amber-500 text-amber-700 bg-amber-50"
                      )}
                    >
                      {product.stock}
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-[#7C5C3E] text-[#7C5C3E] hover:bg-[#7C5C3E]/10"
                    >
                      View Specs
                    </Button>
                    {product.stock === "Special Order" ? (
                      <Button
                        onClick={() => navigateTo("quote")}
                        className="flex-1 bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
                      >
                        Request Quote
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className={cn(
                          "flex-1",
                          addedItems.has(product.id)
                            ? "bg-green-600 hover:bg-green-600"
                            : "bg-[#7C5C3E] hover:bg-[#5C3D20]",
                          "text-white"
                        )}
                      >
                        {addedItems.has(product.id) ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Added!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                  {product.stock === "Special Order" && (
                    <p className="mt-2 text-xs text-[#8A7060] text-center">
                      Special order — contact us for pricing.
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Spec Sheet Download Bar */}
        <div className="bg-[#FAF7F2] border-2 border-[#C9973A] rounded-2xl p-6 lg:p-8 mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <FileText className="h-10 w-10 text-[#C9973A] shrink-0" />
            <div className="flex-1 text-center sm:text-left">
              <p className="font-medium text-[#2C1A0E]">
                Full catalog and spec sheets available upon request.
              </p>
            </div>
            <Button
              onClick={() => navigateTo("quote")}
              className="bg-[#C9973A] hover:bg-[#b8862f] text-white shrink-0"
            >
              Request Full Catalog
            </Button>
          </div>
        </div>

        {/* Back CTA */}
        <div className="text-center">
          <p className="text-[#8A7060] mb-4">Explore our other manufacturer partners</p>
          <Button
            onClick={() => navigateTo("partners")}
            variant="outline"
            className="border-[#7C5C3E] text-[#7C5C3E] hover:bg-[#7C5C3E] hover:text-white"
          >
            View All Partners
          </Button>
        </div>
      </div>
    </div>
  )
}

// ============ CHECKOUT PAGE ============
function CheckoutPage({
  cartItems,
  cartTotal,
  updateQty,
  clearCart,
  navigateTo,
  setCartOpen,
}: {
  cartItems: CartItem[]
  cartTotal: number
  updateQty: (id: string, delta: number) => void
  clearCart: () => void
  navigateTo: (page: PageView) => void
  setCartOpen: (open: boolean) => void
}) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    contactMethod: "email",
    notes: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  })
  const [submitted, setSubmitted] = useState(false)

  if (cartItems.length === 0 && !submitted) {
    return (
      <div className="py-16 bg-[#FAF7F2]">
        <div className="mx-auto max-w-2xl px-4 lg:px-8 text-center">
          <ShoppingCart className="h-20 w-20 text-[#DDD0C0] mx-auto mb-6" />
          <h1 className="font-serif text-3xl font-bold text-[#2C1A0E] mb-4">
            Your cart is empty
          </h1>
          <p className="text-[#8A7060] mb-8">
            Add some products to your cart to proceed to checkout.
          </p>
          <Button
            onClick={() => navigateTo("cabinets")}
            className="bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
          >
            Browse Products
          </Button>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="py-16 bg-[#FAF7F2]">
        <div className="mx-auto max-w-2xl px-4 lg:px-8 text-center">
          <div className="animate-[scaleIn_0.5s_ease-out]">
            <CheckCircle className="h-20 w-20 text-[#C9973A] mx-auto mb-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#2C1A0E] mb-4">
            Thank You, {formData.firstName}!
          </h1>
          <p className="text-[#8A7060] mb-8">
            Your order request has been received and is being reviewed by our team.
          </p>

          <Card className="bg-[#F0EAE0] border-[#7C5C3E] text-left mb-8">
            <CardContent className="p-6">
              <h3 className="font-semibold text-[#2C1A0E] mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#2C1A0E]">
                      {item.name} x {item.qty}
                    </span>
                    <span className="text-[#7C5C3E]">
                      ${(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#DDD0C0] pt-4">
                <div className="flex justify-between font-bold">
                  <span className="text-[#2C1A0E]">Total</span>
                  <span className="text-[#7C5C3E]">${cartTotal.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#DDD0C0] text-sm text-[#8A7060]">
                <p>Contact: {formData.firstName} {formData.lastName}</p>
                <p>{formData.email}</p>
                <p>{formData.phone}</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-start gap-3 bg-[#F0EAE0] rounded-lg p-4 text-left mb-8">
            <Clock className="h-5 w-5 text-[#C9973A] shrink-0 mt-0.5" />
            <p className="text-sm text-[#2C1A0E]">
              An HRS team member will contact you within <strong>1 business day</strong> to confirm
              your order, finalize delivery/installation scheduling, and provide your final invoice.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                clearCart()
                navigateTo("cabinets")
              }}
              variant="outline"
              className="border-[#7C5C3E] text-[#7C5C3E]"
            >
              Browse More Products
            </Button>
            <Button
              onClick={() => {
                clearCart()
                navigateTo("home")
              }}
              className="bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
            >
              Return Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 bg-[#FAF7F2]">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12">
          {[
            { num: 1, label: "Review Order" },
            { num: 2, label: "Contact Info" },
            { num: 3, label: "Payment" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold",
                    step > s.num
                      ? "bg-[#7C5C3E] text-white"
                      : step === s.num
                      ? "bg-[#7C5C3E] text-white"
                      : "border-2 border-[#DDD0C0] text-[#8A7060]"
                  )}
                >
                  {step > s.num ? <Check className="h-5 w-5" /> : s.num}
                </div>
                <span className="mt-2 text-xs text-[#8A7060]">{s.label}</span>
              </div>
              {i < 2 && (
                <div
                  className={cn(
                    "h-1 w-16 mx-2 rounded",
                    step > s.num ? "bg-[#7C5C3E]" : "bg-[#DDD0C0]"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Review Order */}
        {step === 1 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-6">Review Your Order</h2>
            <Card className="bg-white border-[#DDD0C0] mb-6">
              <CardContent className="p-0">
                <table className="w-full">
                  <thead className="bg-[#F0EAE0]">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-[#2C1A0E]">Product</th>
                      <th className="text-left p-4 text-sm font-medium text-[#2C1A0E]">SKU</th>
                      <th className="text-center p-4 text-sm font-medium text-[#2C1A0E]">Qty</th>
                      <th className="text-right p-4 text-sm font-medium text-[#2C1A0E]">Unit Price</th>
                      <th className="text-right p-4 text-sm font-medium text-[#2C1A0E]">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-t border-[#DDD0C0]">
                        <td className="p-4 text-sm text-[#2C1A0E]">{item.name}</td>
                        <td className="p-4 text-xs text-[#8A7060] font-mono">{item.sku}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              disabled={item.qty <= 1}
                              className="p-1 border border-[#7C5C3E] rounded text-[#7C5C3E] hover:bg-[#7C5C3E] hover:text-white disabled:opacity-50"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="p-1 border border-[#7C5C3E] rounded text-[#7C5C3E] hover:bg-[#7C5C3E] hover:text-white"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right text-sm text-[#2C1A0E]">
                          ${item.price.toLocaleString()}
                        </td>
                        <td className="p-4 text-right text-sm font-medium text-[#7C5C3E]">
                          ${(item.price * item.qty).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <div className="bg-[#F0EAE0] rounded-lg p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#8A7060]">Subtotal</span>
                <span className="text-[#2C1A0E]">${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8A7060]">Delivery & Installation</span>
                <span className="text-[#8A7060] italic">Quoted separately</span>
              </div>
              <div className="border-t border-[#DDD0C0] pt-3 flex justify-between">
                <span className="font-bold text-[#2C1A0E]">Order Total</span>
                <span className="text-2xl font-bold text-[#7C5C3E]">
                  ${cartTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                onClick={() => setCartOpen(true)}
                variant="outline"
                className="border-[#7C5C3E] text-[#7C5C3E]"
              >
                Back to Cart
              </Button>
              <Button
                onClick={() => setStep(2)}
                className="bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
              >
                Continue to Contact Info
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Contact Info */}
        {step === 2 && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-6">
              Your Contact Information
            </h2>
            <Card className="bg-white border-[#DDD0C0]">
              <CardContent className="p-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C1A0E]">First Name</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                      className="border-[#DDD0C0]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C1A0E]">Last Name</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                      className="border-[#DDD0C0]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2C1A0E]">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A7060]" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="border-[#DDD0C0] pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2C1A0E]">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A7060]" />
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                      className="border-[#DDD0C0] pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2C1A0E]">Nearest HRS Location</label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => setFormData({ ...formData, location: value })}
                  >
                    <SelectTrigger className="border-[#DDD0C0]">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phoenix">Phoenix (HQ)</SelectItem>
                      <SelectItem value="scottsdale">Scottsdale</SelectItem>
                      <SelectItem value="tucson">Tucson</SelectItem>
                      <SelectItem value="las-vegas">Las Vegas</SelectItem>
                      <SelectItem value="albuquerque">Albuquerque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2C1A0E]">Preferred Contact Method</label>
                  <RadioGroup
                    value={formData.contactMethod}
                    onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
                    className="flex gap-4"
                  >
                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem value="email" className="border-[#7C5C3E] text-[#7C5C3E]" />
                      <span className="text-sm text-[#2C1A0E]">Email</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem value="phone" className="border-[#7C5C3E] text-[#7C5C3E]" />
                      <span className="text-sm text-[#2C1A0E]">Phone</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem value="either" className="border-[#7C5C3E] text-[#7C5C3E]" />
                      <span className="text-sm text-[#2C1A0E]">Either</span>
                    </label>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2C1A0E]">
                    Notes / Special Requests (Optional)
                  </label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special requirements, access notes, or questions for the HRS team..."
                    className="border-[#DDD0C0] min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 flex justify-between">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="border-[#7C5C3E] text-[#7C5C3E]"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.email ||
                  !formData.phone ||
                  !formData.location
                }
                className="bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
              >
                Continue to Payment
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div>
            {/* Demo Banner */}
            <div className="bg-amber-100 border-2 border-amber-400 rounded-lg p-4 mb-8 flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0" />
              <div>
                <p className="font-bold text-amber-800">DEMONSTRATION ONLY</p>
                <p className="text-sm text-amber-700">
                  This is a mock checkout for demonstration purposes. No real payment will be
                  processed. No charges will be made. Do not enter real card details.
                </p>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-6">Payment Information</h2>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Payment Form */}
              <Card className="bg-white border-[#DDD0C0]">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C1A0E]">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A7060]" />
                      <Input
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        placeholder="4242 4242 4242 4242"
                        className="border-[#DDD0C0] pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#2C1A0E]">Expiry Date</label>
                      <Input
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        placeholder="MM/YY"
                        className="border-[#DDD0C0]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#2C1A0E]">CVV</label>
                      <Input
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        placeholder="123"
                        className="border-[#DDD0C0]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C1A0E]">Name on Card</label>
                    <Input
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      placeholder="John Doe"
                      className="border-[#DDD0C0]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="bg-[#F0EAE0] border-[#DDD0C0]">
                <CardHeader>
                  <CardTitle className="text-lg text-[#2C1A0E]">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-[#2C1A0E]">
                        {item.name} x {item.qty}
                      </span>
                      <span className="text-[#7C5C3E]">
                        ${(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-[#DDD0C0] pt-3 flex justify-between">
                    <span className="font-bold text-[#2C1A0E]">Order Total</span>
                    <span className="text-xl font-bold text-[#7C5C3E]">
                      ${cartTotal.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="border-[#7C5C3E] text-[#7C5C3E]"
              >
                Back
              </Button>
              <Button
                onClick={() => setSubmitted(true)}
                disabled={!formData.cardNumber || !formData.expiry || !formData.cvv || !formData.cardName}
                className="bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
              >
                Submit Order Request
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============ LOCATIONS HUB ============
function LocationsHub({ navigateTo }: { navigateTo: (page: PageView) => void }) {
  const locations = [
    { id: "phoenix", city: "Phoenix (HQ)", address: "101 Sedalia Drive, Phoenix, AZ 85001", phone: "602-KITCHEN", team: 10, page: "location-phoenix" as PageView },
    { id: "scottsdale", city: "Scottsdale", address: "4500 N Scottsdale Rd, Scottsdale, AZ 85251", phone: "480-KITCHEN", team: 8, page: "location-scottsdale" as PageView },
    { id: "tucson", city: "Tucson", address: "2200 E Broadway Blvd, Tucson, AZ 85719", phone: "520-KITCHEN", team: 7, page: "location-tucson" as PageView },
    { id: "las-vegas", city: "Las Vegas", address: "3800 S Maryland Pkwy, Las Vegas, NV 89119", phone: "702-KITCHEN", team: 7, page: "location-las-vegas" as PageView },
    { id: "albuquerque", city: "Albuquerque", address: "6600 Menaul Blvd NE, Albuquerque, NM 87110", phone: "505-KITCHEN", team: 7, page: "location-albuquerque" as PageView },
  ]

  return (
    <div className="py-16 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl font-bold text-[#2C1A0E]">Our Southwest Locations</h1>
          <div className="mt-4 mx-auto w-24 h-1 bg-[#C9973A]" />
          <p className="mt-6 text-[#8A7060] max-w-2xl mx-auto">
            Five HRS showrooms and service teams, ready to bring your renovation vision to life.
          </p>
        </div>

        {/* Location Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc) => (
            <Card key={loc.id} className="bg-[#F0EAE0] border-[#DDD0C0] hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7C5C3E]/10 mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-[#7C5C3E]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2C1A0E] text-center mb-2">
                  {loc.city}
                </h3>
                <p className="text-sm text-[#8A7060] text-center mb-4">{loc.address}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center gap-2 text-sm text-[#8A7060]">
                    <Phone className="h-4 w-4" />
                    {loc.phone}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-[#8A7060]">
                    <Clock className="h-4 w-4" />
                    Mon–Sat 8:00 AM – 6:00 PM
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-[#8A7060]">
                    <Users className="h-4 w-4" />
                    {loc.team}-person team
                  </div>
                </div>
                <Button
                  onClick={() => navigateTo(loc.page)}
                  className="w-full bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
                >
                  View Location
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============ INDIVIDUAL LOCATION PAGE ============
type LocationCity = "phoenix" | "scottsdale" | "tucson" | "las-vegas" | "albuquerque"

const locationData: Record<
  LocationCity,
  {
    city: string
    address: string
    phone: string
    team: number
    teamMembers: { name: string; role: string }[]
  }
> = {
  phoenix: {
    city: "Phoenix (HQ)",
    address: "101 Sedalia Drive, Phoenix, AZ 85001",
    phone: "602-KITCHEN",
    team: 10,
    teamMembers: [
      { name: "Jessica M.", role: "Lead Kitchen Designer" },
      { name: "Tom R.", role: "Bath & Tile Specialist" },
      { name: "Maria L.", role: "Office Manager" },
    ],
  },
  scottsdale: {
    city: "Scottsdale",
    address: "4500 N Scottsdale Rd, Scottsdale, AZ 85251",
    phone: "480-KITCHEN",
    team: 8,
    teamMembers: [
      { name: "Amanda K.", role: "Senior Designer" },
      { name: "Brian P.", role: "Installation Lead" },
      { name: "Diana S.", role: "Client Relations" },
    ],
  },
  tucson: {
    city: "Tucson",
    address: "2200 E Broadway Blvd, Tucson, AZ 85719",
    phone: "520-KITCHEN",
    team: 7,
    teamMembers: [
      { name: "Carlos V.", role: "Kitchen Specialist" },
      { name: "Elena R.", role: "Design Consultant" },
      { name: "Frank M.", role: "Operations Manager" },
    ],
  },
  "las-vegas": {
    city: "Las Vegas",
    address: "3800 S Maryland Pkwy, Las Vegas, NV 89119",
    phone: "702-KITCHEN",
    team: 7,
    teamMembers: [
      { name: "Nicole B.", role: "Lead Designer" },
      { name: "James W.", role: "Master Installer" },
      { name: "Sophia C.", role: "Sales Coordinator" },
    ],
  },
  albuquerque: {
    city: "Albuquerque",
    address: "6600 Menaul Blvd NE, Albuquerque, NM 87110",
    phone: "505-KITCHEN",
    team: 7,
    teamMembers: [
      { name: "Rachel T.", role: "Design Lead" },
      { name: "Miguel H.", role: "Cabinetry Expert" },
      { name: "Karen D.", role: "Office Administrator" },
    ],
  },
}

function LocationPage({
  city,
  navigateTo,
  navigateToQuoteWithLocation,
}: {
  city: LocationCity
  navigateTo: (page: PageView) => void
  navigateToQuoteWithLocation: (locationId: string) => void
}) {
  const data = locationData[city]

  return (
    <div className="py-8 bg-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-[#8A7060]">
          <button
            onClick={() => navigateTo("locations")}
            className="hover:text-[#7C5C3E] transition-colors"
          >
            Locations
          </button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#2C1A0E] font-medium">{data.city}</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#F0EAE0] rounded-2xl p-8 lg:p-12 border-b-4 border-[#7C5C3E] mb-12">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#7C5C3E]/10">
              <MapPin className="h-12 w-12 text-[#7C5C3E]" />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-[#2C1A0E]">
                {data.city}
              </h1>
              <p className="text-[#8A7060] mt-1">HRS {data.city.replace(" (HQ)", "")} Location</p>
              <p className="mt-4 text-[#5C3D20]">{data.address}</p>
              <a
                href={`tel:${data.phone}`}
                className="inline-flex items-center gap-2 mt-2 text-[#7C5C3E] hover:text-[#5C3D20] font-medium"
              >
                <Phone className="h-4 w-4" />
                {data.phone}
              </a>
              <Badge className="block w-fit mt-4 bg-[#C9973A]/20 text-[#7C5C3E] border-none mx-auto lg:mx-0">
                Mon–Sat 8:00 AM – 6:00 PM
              </Badge>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card className="bg-[#F0EAE0] border-[#DDD0C0]">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-[#C9973A] mx-auto mb-3" />
              <h3 className="font-semibold text-[#2C1A0E] mb-2">Hours</h3>
              <p className="text-sm text-[#8A7060]">Mon–Sat 8:00 AM – 6:00 PM</p>
              <p className="text-sm text-[#8A7060]">Closed Sunday</p>
            </CardContent>
          </Card>
          <Card className="bg-[#F0EAE0] border-[#DDD0C0]">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-[#C9973A] mx-auto mb-3" />
              <h3 className="font-semibold text-[#2C1A0E] mb-2">Our Team</h3>
              <p className="text-sm text-[#8A7060]">{data.team} dedicated renovation specialists</p>
            </CardContent>
          </Card>
          <Card className="bg-[#F0EAE0] border-[#DDD0C0]">
            <CardContent className="p-6 text-center">
              <Wrench className="h-8 w-8 text-[#C9973A] mx-auto mb-3" />
              <h3 className="font-semibold text-[#2C1A0E] mb-2">Services</h3>
              <p className="text-sm text-[#8A7060]">
                Full kitchen & bath renovations, custom cabinets, appliance install
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Map Placeholder */}
        <div className="bg-[#E8D5B7] rounded-2xl border-2 border-[#7C5C3E] h-[380px] flex flex-col items-center justify-center mb-12">
          <Map className="h-16 w-16 text-[#7C5C3E] mb-4" />
          <p className="font-semibold text-[#2C1A0E] mb-2">{data.address}</p>
          <p className="text-sm text-[#8A7060] mb-4">
            Interactive map coming soon — get directions via Google Maps
          </p>
          <Button
            asChild
            variant="outline"
            className="border-[#7C5C3E] text-[#7C5C3E] hover:bg-[#7C5C3E] hover:text-white"
          >
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(data.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] text-center mb-8">
            Meet the Local Team
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {data.teamMembers.map((member) => (
              <Card key={member.name} className="bg-[#F0EAE0] border-[#DDD0C0]">
                <CardContent className="p-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7C5C3E]/10 mx-auto mb-4">
                    <Users className="h-8 w-8 text-[#7C5C3E]" />
                  </div>
                  <h3 className="font-semibold text-[#2C1A0E]">{member.name}</h3>
                  <p className="text-sm text-[#8A7060]">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#7C5C3E] rounded-2xl p-8 lg:p-12 text-center text-white">
          <h2 className="font-serif text-2xl font-bold mb-4">
            Ready to start your {data.city.replace(" (HQ)", "")} renovation?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigateTo("cabinets")}
              className="bg-[#7C5C3E] text-white hover:bg-white hover:text-[#7C5C3E]"
            >
              Browse Products
            </Button>
            <Button
              onClick={() => navigateToQuoteWithLocation(city)}
              className="bg-[#FAF7F2] text-[#7C5C3E] hover:bg-[#F0EAE0]"
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
