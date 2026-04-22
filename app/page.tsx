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
            {["CabinetCraft Co.", "AppliancePro", "FixturePlus"].map((partner) => (
              <Card key={partner} className="bg-[#F0EAE0] border-[#DDD0C0]">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="h-8 w-8 text-[#7C5C3E]" />
                    <span className="font-medium text-[#2C1A0E]">{partner}</span>
                  </div>
                  <ExternalLink className="h-5 w-5 text-[#C9973A]" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============ PARTNERS PAGE ============
function PartnersPage({ navigateTo }: { navigateTo: (page: PageView) => void }) {
  const partners = [
    { name: "CabinetCraft Co.", category: "Cabinets & Millwork", description: "Premium custom cabinetry for every home." },
    { name: "AppliancePro", category: "Kitchen Appliances", description: "Industry-leading appliances for modern homes." },
    { name: "SinkWorks", category: "Sinks & Fixtures", description: "High-quality sinks and faucets for every style." },
    { name: "LightSource", category: "Lighting Solutions", description: "Innovative lighting designs for every room." },
    { name: "StoneWorks", category: "Countertops", description: "Premium granite, quartz, and marble surfaces." },
    { name: "FixturePlus", category: "Bath Fixtures", description: "Modern bathroom fixtures and accessories." },
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
                <Button className="w-full mt-auto flex items-center justify-center gap-2 bg-[#7C5C3E] hover:bg-[#5C3D20] text-white py-3 px-6 text-sm font-medium leading-none">
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
