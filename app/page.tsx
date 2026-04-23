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

export default function HRSWebsite() {
  const [currentPage, setCurrentPage] = useState<PageView>("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigateTo = (page: PageView) => {
    setCurrentPage(page)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Header currentPage={currentPage} navigateTo={navigateTo} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main>
        {currentPage === "home" && <HomePage navigateTo={navigateTo} />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "services" && <ServicesPage />}
        {currentPage === "cabinets" && <ProductsPage category="cabinets" navigateTo={navigateTo} />}
        {currentPage === "appliances" && <ProductsPage category="appliances" navigateTo={navigateTo} />}
        {currentPage === "sinks" && <ProductsPage category="sinks" navigateTo={navigateTo} />}
        {currentPage === "lighting" && <ProductsPage category="lighting" navigateTo={navigateTo} />}
        {currentPage === "partners" && <PartnersPage navigateTo={navigateTo} />}
        {currentPage === "portfolio" && <PortfolioPage />}
        {currentPage === "quote" && <QuotePage />}
        {currentPage === "faq" && <FAQPage navigateTo={navigateTo} />}
        {currentPage === "catalog-cabinetcraft" && <CatalogPage partner="cabinetcraft" navigateTo={navigateTo} />}
        {currentPage === "catalog-appliancepro" && <CatalogPage partner="appliancepro" navigateTo={navigateTo} />}
        {currentPage === "catalog-sinkworks" && <CatalogPage partner="sinkworks" navigateTo={navigateTo} />}
        {currentPage === "catalog-lightsource" && <CatalogPage partner="lightsource" navigateTo={navigateTo} />}
        {currentPage === "catalog-stoneworks" && <CatalogPage partner="stoneworks" navigateTo={navigateTo} />}
        {currentPage === "catalog-fixtureplus" && <CatalogPage partner="fixtureplus" navigateTo={navigateTo} />}
      </main>
      <Footer navigateTo={navigateTo} />
    </div>
  )
}

// ============ HEADER ============
function Header({
  currentPage,
  navigateTo,
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  currentPage: PageView
  navigateTo: (page: PageView) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
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
                  ? "text-[#C9973A] bg-[#F0EAE0]"
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
                    ? "text-[#C9973A] bg-[#F0EAE0]"
                    : "text-[#2C1A0E] hover:text-[#7C5C3E] hover:bg-[#F0EAE0]"
                )}
              >
                Products
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#FAF7F2] border-[#DDD0C0]">
              {productItems.map((item) => (
                <DropdownMenuItem
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className={cn(
                    "cursor-pointer",
                    currentPage === item.page && "text-[#C9973A] bg-[#F0EAE0]"
                  )}
                >
                  {item.label}
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
                  ? "text-[#C9973A] bg-[#F0EAE0]"
                  : "text-[#2C1A0E] hover:text-[#7C5C3E] hover:bg-[#F0EAE0]"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
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
              <li>Phoenix (HQ)</li>
              <li>Scottsdale</li>
              <li>Tucson</li>
              <li>Las Vegas</li>
              <li>Albuquerque</li>
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

      {/* Partner Marquee Teaser */}
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
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "CabinetCo", view: "catalog-cabinetcraft" as PageView },
              { label: "AppliancePro", view: "catalog-appliancepro" as PageView },
              { label: "SinkWorks", view: "catalog-sinkworks" as PageView },
              { label: "LightSource", view: "catalog-lightsource" as PageView },
              { label: "StoneWorks", view: "catalog-stoneworks" as PageView },
            ].map((brand) => (
              <button
                key={brand.label}
                onClick={() => navigateTo(brand.view)}
                className="flex-shrink-0 w-48 cursor-pointer"
              >
                <Card className="bg-[#F0EAE0] border-[#DDD0C0] hover:shadow-lg hover:-translate-y-1 transition-all">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7C5C3E]/10">
                      <Package className="h-8 w-8 text-[#7C5C3E]" />
                    </div>
                    <p className="mt-4 font-medium text-2xl text-[#2C1A0E]">{brand.label}</p>
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
              <Card
                key={testimonial.name}
                className="bg-[#FAF7F2] border-[#DDD0C0]"
              >
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
    { name: "Michael Lombardi", role: "Project Manager" },
    { name: "Caitlyn Brenton", role: "Database Developer" },
    { name: "Connor Polodna", role: "Web Designer" },
    { name: "Mohammad Shaikh", role: "Cybersecurity Specialist" },
    { name: "Camden Dreasher", role: "Network Designer" },
  ]

  const locations = [
    { city: "Phoenix (HQ)", address: "101 Sedalia Drive, Phoenix, AZ 85001" },
    { city: "Scottsdale", address: "Scottsdale, AZ 85018" },
    { city: "Tucson", address: "Tucson, AZ 85705" },
    { city: "Las Vegas", address: "Las Vegas, NV 89169" },
    { city: "Albuquerque", address: "Albuquerque, NM 87110" },
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
            <div className="h-80 w-full max-w-md rounded-2xl bg-[#F0EAE0] border border-[#DDD0C0] flex items-center justify-center">
              <Users className="h-24 w-24 text-[#7C5C3E]/50" />
            </div>
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
          <h2 className="font-serif text-3xl font-bold text-[#2C1A0E] text-center mb-12">
            Our Team
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {teamMembers.map((member) => (
              <Card key={member.name} className="bg-[#F0EAE0] border-[#DDD0C0]">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#7C5C3E]/10">
                    <Users className="h-10 w-10 text-[#7C5C3E]" />
                  </div>
                  <h3 className="font-semibold text-[#2C1A0E]">{member.name}</h3>
                  <p className="text-sm text-[#8A7060]">{member.role}</p>
                </CardContent>
              </Card>
            ))}
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
}: {
  category: "cabinets" | "appliances" | "sinks" | "lighting"
  navigateTo: (page: PageView) => void
}) {
  const categories = [
    { id: "cabinets", label: "Cabinets" },
    { id: "appliances", label: "Appliances" },
    { id: "sinks", label: "Sinks & Faucets" },
    { id: "lighting", label: "Lighting" },
  ] as const

  // Mappings for catalog callout cards per product category
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
      { name: "42-inch Shaker Cabinet Set – White", price: "$1,299.00", stock: "In Stock" },
      { name: "Deluxe Oak Cabinet Kit", price: "$4,500.00", stock: "In Stock" },
      { name: "Farmhouse Base Cabinet – Walnut", price: "$2,100.00", stock: "Low Stock" },
    ],
    appliances: [
      { name: "Stainless Steel Range – 36 inch", price: "$2,800.00", stock: "In Stock" },
      { name: "Built-in Dishwasher – Premium Series", price: "$1,100.00", stock: "In Stock" },
      { name: "French Door Refrigerator", price: "$2,200.00", stock: "Low Stock" },
    ],
    sinks: [
      { name: "Stainless Steel Farmhouse Sink (Large)", price: "$549.00", stock: "In Stock" },
      { name: "Granite Double Sink – Undermount", price: "$850.00", stock: "In Stock" },
      { name: "Chrome Pull-Down Kitchen Faucet", price: "$320.00", stock: "In Stock" },
    ],
    lighting: [
      { name: "Under-Cabinet LED Strip Kit", price: "$180.00", stock: "In Stock" },
      { name: "Pendant Light Set – Brushed Bronze (3-pack)", price: "$440.00", stock: "In Stock" },
      { name: "Recessed Lighting Kit – 6 pack", price: "$290.00", stock: "In Stock" },
    ],
  }

  const categoryTitle = {
    cabinets: "Cabinets",
    appliances: "Appliances",
    sinks: "Sinks & Faucets",
    lighting: "Lighting",
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
            <Card key={product.name} className="bg-[#F0EAE0] border-[#DDD0C0]">
              <CardContent className="p-6">
                <div className="flex h-40 items-center justify-center rounded-lg bg-[#FAF7F2] mb-4">
                  <Package className="h-16 w-16 text-[#7C5C3E]/50" />
                </div>
                <h3 className="font-semibold text-[#2C1A0E] mb-2">{product.name}</h3>
                <p className="text-xl font-bold text-[#7C5C3E] mb-3">{product.price}</p>
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
                <Button
                  variant="outline"
                  className="w-full border-[#7C5C3E] text-[#7C5C3E] hover:bg-[#7C5C3E] hover:text-white"
                  onClick={() => navigateTo("quote")}
                >
                  Request a Quote
                </Button>
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

  const projects = [
    { title: "Scottsdale Kitchen Remodel", category: "kitchens", icon: ChefHat },
    { title: "Las Vegas Master Bath", category: "bathrooms", icon: Bath },
    { title: "Phoenix Custom Cabinets", category: "custom", icon: Package },
    { title: "Tucson Kitchen & Lighting", category: "kitchens", icon: Lamp },
    { title: "Albuquerque Bathroom Renovation", category: "bathrooms", icon: Droplets },
    { title: "Scottsdale Full Kitchen", category: "kitchens", icon: UtensilsCrossed },
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
            <div
              key={project.title}
              className="group relative overflow-hidden rounded-2xl bg-[#F0EAE0] border border-[#DDD0C0] cursor-pointer"
            >
              <div className="aspect-[4/3] flex items-center justify-center">
                <project.icon className="h-20 w-20 text-[#7C5C3E]/30 transition-transform group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-[#7C5C3E]/0 group-hover:bg-[#7C5C3E]/80 transition-all flex items-center justify-center">
                <ZoomIn className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2C1A0E]/90 to-transparent p-4">
                <p className="text-white font-medium">{project.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============ QUOTE PAGE ============
function QuotePage() {
  return (
    <div className="py-16 bg-[#FAF7F2]">
      <div className="mx-auto max-w-2xl px-4 lg:px-8">
        <Card className="bg-white border-[#DDD0C0] shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-3xl text-[#2C1A0E]">
              Request a Free Consultation
            </CardTitle>
            <CardDescription className="text-[#8A7060]">
              Fill out the form below and a member of our team will reach out within 1 business day.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2C1A0E]">First Name</label>
                <Input
                  placeholder="John"
                  className="border-[#DDD0C0] focus:ring-[#C9973A] focus:border-[#C9973A]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2C1A0E]">Last Name</label>
                <Input
                  placeholder="Doe"
                  className="border-[#DDD0C0] focus:ring-[#C9973A] focus:border-[#C9973A]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2C1A0E]">Email Address</label>
              <Input
                type="email"
                placeholder="john@example.com"
                className="border-[#DDD0C0] focus:ring-[#C9973A] focus:border-[#C9973A]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2C1A0E]">Phone Number</label>
              <Input
                type="tel"
                placeholder="(555) 123-4567"
                className="border-[#DDD0C0] focus:ring-[#C9973A] focus:border-[#C9973A]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2C1A0E]">Nearest Location</label>
              <Select>
                <SelectTrigger className="border-[#DDD0C0]">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phoenix">Phoenix (HQ)</SelectItem>
                  <SelectItem value="scottsdale">Scottsdale</SelectItem>
                  <SelectItem value="tucson">Tucson</SelectItem>
                  <SelectItem value="lasvegas">Las Vegas</SelectItem>
                  <SelectItem value="albuquerque">Albuquerque</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2C1A0E]">Project Type</label>
              <Select>
                <SelectTrigger className="border-[#DDD0C0]">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kitchen">Kitchen Remodel</SelectItem>
                  <SelectItem value="bathroom">Bathroom Remodel</SelectItem>
                  <SelectItem value="cabinets">Custom Cabinets</SelectItem>
                  <SelectItem value="appliances">Appliance Installation</SelectItem>
                  <SelectItem value="lighting">Lighting</SelectItem>
                  <SelectItem value="full">Full Renovation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2C1A0E]">Project Details</label>
              <Textarea
                placeholder="Tell us about your space, timeline, and any ideas you have…"
                className="border-[#DDD0C0] focus:ring-[#C9973A] focus:border-[#C9973A] min-h-[120px]"
              />
            </div>

            <Button className="w-full bg-[#7C5C3E] hover:bg-[#5C3D20] text-white">
              Submit Request
            </Button>

            <p className="text-center text-sm text-[#8A7060]">
              Or call us directly:{" "}
              <a href="tel:602-KITCHEN" className="text-[#7C5C3E] font-medium inline-flex items-center gap-1">
                <Phone className="h-4 w-4" /> 602-KITCHEN
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ============ FAQ PAGE ============
function FAQPage({ navigateTo }: { navigateTo: (page: PageView) => void }) {
  const faqs = [
    {
      question: "How long does a typical kitchen or bathroom remodel take?",
      answer:
        "Project timelines vary from 3–12 weeks depending on scope. HRS provides a detailed timeline during the design phase so you know exactly what to expect.",
    },
    {
      question: "Do you supply the appliances and fixtures, or do I provide my own?",
      answer:
        "HRS can supply everything through our manufacturer partners, or we can work with materials you've sourced independently. Either way, we ensure quality installation.",
    },
    {
      question: "Do you serve locations outside of Phoenix?",
      answer:
        "Yes — we have locations in Scottsdale, Tucson, Las Vegas, and Albuquerque, serving homeowners throughout the Southwest.",
    },
    {
      question: "How is pricing determined?",
      answer:
        "Pricing is based on scope, materials, and labor. We provide a full itemized quote after an initial consultation at no cost to you.",
    },
    {
      question: "Are your installers licensed and insured?",
      answer:
        "Yes — all HRS installation crews are certified kitchen and bath specialists, licensed, and fully insured for your peace of mind.",
    },
    {
      question: "Can I browse product catalogs before my consultation?",
      answer:
        "Absolutely — visit our Manufacturer Partners page to browse current models and specs from all of our brand partners directly.",
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
  name: string
  sku: string
  price: string
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
      { name: "42\" Shaker Cabinet Set – White", sku: "CC-4200-W", price: "$1,299", stock: "In Stock", specs: ["Solid maple construction", "Soft-close hinges", "42\" height", "Available in 8 finish options"] },
      { name: "Deluxe Oak Cabinet Kit – 10-piece", sku: "CC-OAK-10", price: "$4,500", stock: "In Stock", specs: ["Red oak veneer", "Full-extension drawers", "Dovetail joinery", "Includes crown molding"] },
      { name: "Farmhouse Base Cabinet – Walnut", sku: "CC-FARM-W", price: "$2,100", stock: "Special Order", specs: ["American black walnut", "36\" base height", "Exposed face frame", "Oil finish"] },
      { name: "Floating Bathroom Vanity – 48\"", sku: "CC-VAN-48", price: "$1,850", stock: "In Stock", specs: ["Plywood box construction", "2 soft-close doors", "Pre-drilled for undermount sink"] },
      { name: "Pantry Pull-Out Cabinet", sku: "CC-PAN-PO", price: "$980", stock: "In Stock", specs: ["Full-extension pull-out", "84\" tall", "5 adjustable shelves", "White painted finish"] },
      { name: "Glass-Front Display Cabinet", sku: "CC-DISP-GF", price: "$760", stock: "Special Order", specs: ["Tempered glass panels", "Interior LED-ready", "Available in 3 widths"] },
    ],
  },
  appliancepro: {
    name: "AppliancePro",
    category: "Kitchen Appliances",
    bannerHue: "#E0CBA8",
    description: "AppliancePro delivers industry-leading kitchen appliances trusted by renovation professionals nationwide. Our lineup covers everything from ranges to refrigerators with best-in-class warranty coverage.",
    products: [
      { name: "36\" Stainless Steel Gas Range", sku: "AP-RNG-36", price: "$2,800", stock: "In Stock", specs: ["6 sealed burners", "Double convection oven", "Continuous cast-iron grates", "5-year warranty"] },
      { name: "French Door Refrigerator – 27 cu ft", sku: "AP-FDR-27", price: "$2,200", stock: "Low Stock", specs: ["Counter-depth option", "Dual ice maker", "LED interior", "Energy Star certified"] },
      { name: "Built-in Dishwasher – Premium Series", sku: "AP-DW-PRE", price: "$1,100", stock: "In Stock", specs: ["44 dBA ultra-quiet", "3rd rack", "Soil sensor", "6 wash cycles, panel-ready option"] },
      { name: "Over-Range Microwave – 2.1 cu ft", sku: "AP-MWV-21", price: "$540", stock: "In Stock", specs: ["400 CFM ventilation", "Sensor cooking", "1000W", "Fits 30\" cabinet opening"] },
      { name: "Counter-Depth Side-by-Side Refrigerator", sku: "AP-SBS-22", price: "$1,750", stock: "Special Order", specs: ["22 cu ft", "External water/ice", "Door-in-door storage", "Fingerprint resistant"] },
      { name: "30\" Electric Induction Range", sku: "AP-IND-30", price: "$1,950", stock: "In Stock", specs: ["4 induction zones", "Bridge element", "True convection", "Slide-in design"] },
    ],
  },
  sinkworks: {
    name: "SinkWorks",
    category: "Sinks & Fixtures",
    bannerHue: "#E5D8C8",
    description: "SinkWorks produces high-quality sinks and faucets engineered for both form and function. From farmhouse apron fronts to sleek undermount bowls, every piece carries a lifetime finish guarantee.",
    products: [
      { name: "Farmhouse Apron Sink – Stainless Steel (Large)", sku: "SW-FARM-L", price: "$549", stock: "In Stock", specs: ["16-gauge T-304 stainless", "33\"×21\"×9\"", "Single bowl", "Sound dampening coating"] },
      { name: "Granite Double Sink – Undermount", sku: "SW-GRAN-DU", price: "$850", stock: "In Stock", specs: ["Composite granite", "33\"×19\"", "60/40 split", "8 color options, chip-resistant"] },
      { name: "Chrome Pull-Down Kitchen Faucet", sku: "SW-KFC-PD", price: "$320", stock: "In Stock", specs: ["3-function spray", "68\" hose", "Ceramic disc cartridge", "Deck plate included"] },
      { name: "Vessel Bathroom Sink – White Porcelain", sku: "SW-VES-WP", price: "$290", stock: "In Stock", specs: ["Vitreous china", "16\"×5.5\" oval", "Overflow drain included", "Glossy finish"] },
      { name: "Bar/Prep Sink – 15\" Single Bowl", sku: "SW-BAR-15", price: "$210", stock: "In Stock", specs: ["18-gauge stainless", "15\"×15\"×7\"", "Bottom grid and drain included"] },
      { name: "Touchless Kitchen Faucet – Matte Black", sku: "SW-TCH-MB", price: "$480", stock: "Special Order", specs: ["Motion sensor + manual mode", "Pull-down spray", "1.8 GPM", "Deck plate included"] },
    ],
  },
  lightsource: {
    name: "LightSource",
    category: "Lighting Solutions",
    bannerHue: "#EDD9A3",
    description: "LightSource designs innovative lighting systems for kitchens, baths, and living spaces. From under-cabinet LED strips to statement pendants, every fixture is backed by a 5-year manufacturer warranty.",
    products: [
      { name: "Under-Cabinet LED Strip Kit – 12ft", sku: "LS-LED-12", price: "$180", stock: "In Stock", specs: ["2700K warm white", "Dimmable", "Plug-in or hardwire", "Linkable up to 32ft, CRI 90+"] },
      { name: "Pendant Light Set – Brushed Bronze (3-pack)", sku: "LS-PND-BB3", price: "$440", stock: "In Stock", specs: ["Adjustable 18\"–48\" cord", "E26 socket", "UL listed", "Fits 4\" canopy, 60W max"] },
      { name: "Recessed Lighting Kit – 6 Pack", sku: "LS-REC-6", price: "$290", stock: "In Stock", specs: ["6\" slim", "IC-rated", "650 lumen", "3000K, dimmable, no housing required"] },
      { name: "Statement Island Pendant – Antique Brass", sku: "LS-ISL-AB", price: "$380", stock: "Special Order", specs: ["Hand-hammered metal shade", "14\" diameter", "6ft cord", "100W equiv. LED"] },
      { name: "Vanity Bar Light – 5-Bulb Matte Black", sku: "LS-VAN-5B", price: "$210", stock: "In Stock", specs: ["36\" width", "ETL listed for damp locations", "G25 bulb base", "14\" from wall"] },
      { name: "Undercabinet Puck Lights – 6 Pack", sku: "LS-PCK-6", price: "$140", stock: "In Stock", specs: ["3000K", "200 lumen each", "Surface mount", "Hardwire, low-profile 0.5\" depth"] },
    ],
  },
  stoneworks: {
    name: "StoneWorks",
    category: "Countertops",
    bannerHue: "#DDD0C0",
    description: "StoneWorks offers premium granite, quartz, and marble surfaces fabricated and installed by certified craftsmen. Every slab is hand-selected for consistency and sealed for long-term durability.",
    products: [
      { name: "Calacatta Marble Slab – per sq ft", sku: "STO-CAL-SLAB", price: "$95/sqft", stock: "Special Order", specs: ["Italian origin", "White with gold veining", "Polished finish", "3/4\" or 1.25\" thickness"] },
      { name: "Kashmir White Granite – per sq ft", sku: "STO-KWG-SLAB", price: "$55/sqft", stock: "In Stock", specs: ["India origin", "Consistent pattern", "Pre-sealed", "Available in honed or polished"] },
      { name: "Quartz Countertop – Carrara White", sku: "STO-QTZ-CW", price: "$70/sqft", stock: "In Stock", specs: ["Engineered quartz", "Non-porous", "Scratch-resistant", "10-year warranty"] },
      { name: "Absolute Black Granite – per sq ft", sku: "STO-ABG-SLAB", price: "$60/sqft", stock: "In Stock", specs: ["Zimbabwe origin", "Jet black", "Mirror polish", "Ideal for dramatic contrast"] },
      { name: "Quartzite Slab – Taj Mahal", sku: "STO-QZT-TM", price: "$110/sqft", stock: "Special Order", specs: ["Brazil origin", "Soft beige/white", "Natural stone", "Requires annual sealing"] },
      { name: "Butcher Block – Maple 8ft", sku: "STO-BB-MAP8", price: "$620", stock: "In Stock", specs: ["Solid edge-grain maple", "1.5\" thick", "25\"×96\"", "Food-safe oil finish included"] },
    ],
  },
  fixtureplus: {
    name: "FixturePlus",
    category: "Bath Fixtures",
    bannerHue: "#E8D5C8",
    description: "FixturePlus delivers modern bathroom fixtures and accessories trusted by designers and contractors alike. Our collections combine durability with timeless aesthetics across every finish and style.",
    products: [
      { name: "Freestanding Soaking Tub – Matte White", sku: "FP-TUB-FW", price: "$1,400", stock: "Special Order", specs: ["Acrylic", "59\"×29.5\"×23.5\"", "Center or end drain", "42 gallon capacity"] },
      { name: "Walk-In Shower System – 10\" Rain Head", sku: "FP-SHW-10R", price: "$890", stock: "In Stock", specs: ["Stainless rain head", "3-function hand spray", "Thermostatic valve", "Brushed nickel"] },
      { name: "Dual-Flush Elongated Toilet", sku: "FP-TOL-DF", price: "$380", stock: "In Stock", specs: ["1.0/1.6 GPF", "Comfort height 17\"", "Skirted trapway", "Slow-close seat included"] },
      { name: "Chrome Towel Bar Set – 3 piece", sku: "FP-TWL-CR3", price: "$120", stock: "In Stock", specs: ["18\", 24\", and 30\" bars", "Solid brass construction", "Mounting hardware included"] },
      { name: "Vessel Faucet – Oil-Rubbed Bronze", sku: "FP-VFC-ORB", price: "$310", stock: "Special Order", specs: ["Single-hole", "Ceramic disc", "1.2 GPM", "13\" tall spout, ADA compliant"] },
      { name: "Recessed Shower Niche – 12\"×24\"", sku: "FP-NCH-1224", price: "$95", stock: "In Stock", specs: ["Pre-sloped stainless insert", "Tile-ready", "Installs between 16\" OC studs"] },
    ],
  },
}

function CatalogPage({ 
  partner, 
  navigateTo 
}: { 
  partner: PartnerKey
  navigateTo: (page: PageView) => void 
}) {
  const data = catalogData[partner]

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
              <p className="mt-4 text-[#5C3D20] max-w-2xl">
                {data.description}
              </p>
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
            Browse current models and technical specifications. Contact our team to place an order or request a custom quote.
          </p>

          {/* Product Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.products.map((product) => (
              <Card key={product.sku} className="bg-[#F0EAE0] border-[#DDD0C0] hover:shadow-lg transition-shadow">
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
                    <Button
                      onClick={() => navigateTo("quote")}
                      className="flex-1 bg-[#7C5C3E] hover:bg-[#5C3D20] text-white"
                    >
                      Request Quote
                    </Button>
                  </div>
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
