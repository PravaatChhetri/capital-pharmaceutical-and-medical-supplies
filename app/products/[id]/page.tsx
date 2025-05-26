"use client"

import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/rance-lab/product-detail"
import { ProductDetailSkeleton } from "@/components/ui/loading-skeleton"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { ArrowLeft } from "lucide-react"

// Sample product data (in a real app, this would come from a database)
const products = [
  {
    id: 1,
    name: "Amoxicillin 500mg Capsules",
    category: "Prescription Medications",
    description: "Broad-spectrum antibiotic for bacterial infections",
    fullDescription:
      "Amoxicillin is a penicillin-type antibiotic used to treat a wide variety of bacterial infections. It works by stopping the growth of bacteria. This antibiotic treats only bacterial infections and will not work for viral infections.",
    image: "/images/products/amoxicillin.jpg",
    expiryDate: "2025-12-31",
    manufacturer: "PharmaCorp",
    batchNumber: "AMX2024001",
    inStock: true,
    ingredients: "Amoxicillin trihydrate, microcrystalline cellulose, sodium starch glycolate, magnesium stearate",
    usage:
      "Take by mouth with or without food as directed by your doctor, usually every 8 or 12 hours. The dosage is based on your medical condition and response to treatment.",
    storage:
      "Store at room temperature away from light and moisture. Do not store in the bathroom. Keep all medications away from children and pets.",
    warnings: "May cause allergic reactions in patients with penicillin allergy. Consult your doctor before use.",
    pdfBrochure: "/brochures/amoxicillin-info.pdf",
  },
  {
    id: 2,
    name: "Digital Blood Pressure Monitor",
    category: "Medical Devices",
    description: "Automatic digital BP monitor with memory function",
    fullDescription:
      "Advanced digital blood pressure monitor featuring automatic inflation, memory storage for multiple readings, and large LCD display. Clinically validated for accuracy and suitable for home and professional use.",
    image: "/images/products/blood-pressure-monitor.jpg",
    expiryDate: "2027-06-15",
    manufacturer: "MedTech Solutions",
    batchNumber: "DBP2024002",
    inStock: true,
    ingredients: "Electronic components, LCD display, inflatable cuff, pressure sensors",
    usage:
      "Wrap cuff around upper arm, press start button, remain still during measurement. Device automatically inflates and deflates.",
    storage: "Store in dry place at room temperature. Avoid extreme temperatures and humidity.",
    warnings:
      "Not suitable for patients with irregular heartbeat. Consult healthcare provider for proper interpretation of readings.",
    pdfBrochure: "/brochures/bp-monitor-manual.pdf",
  },
  {
    id: 3,
    name: "Surgical Gloves (Latex-Free)",
    category: "Surgical Supplies",
    description: "Sterile, powder-free surgical gloves - Box of 100",
    fullDescription:
      "Premium quality latex-free surgical gloves designed for maximum dexterity and protection. These powder-free gloves reduce the risk of allergic reactions and provide excellent tactile sensitivity for precise medical procedures.",
    image: "/images/products/surgical-gloves.jpg",
    expiryDate: "2026-03-20",
    manufacturer: "SafeHands Medical",
    batchNumber: "SGL2024003",
    inStock: true,
    ingredients: "Synthetic nitrile rubber, cornstarch powder-free coating",
    usage:
      "For single use only. Select appropriate size, put on using sterile technique. Remove carefully to avoid contamination.",
    storage: "Store in cool, dry place away from direct sunlight. Avoid extreme temperatures.",
    warnings: "Single use only. Do not reuse. Check for tears or punctures before use.",
    pdfBrochure: "/brochures/surgical-gloves-specs.pdf",
  },
  {
    id: 4,
    name: "Aspirin 325mg Tablets",
    category: "Prescription Medications",
    description: "Pain reliever and anti-inflammatory medication",
    fullDescription:
      "Aspirin is a salicylate used to treat pain, fever, and inflammation. It is also used as an antiplatelet agent to prevent blood clots in patients at risk of cardiovascular events.",
    image: "/images/products/aspirin.jpg",
    expiryDate: "2025-08-10",
    manufacturer: "Generic Pharma",
    batchNumber: "ASP2024004",
    inStock: false,
    ingredients: "Aspirin, microcrystalline cellulose, corn starch, hypromellose",
    usage: "Take with food or milk to reduce stomach irritation. Follow dosage instructions carefully.",
    storage: "Store at room temperature in a dry place. Keep container tightly closed.",
    warnings: "May cause stomach bleeding. Not recommended for children under 16 due to Reye's syndrome risk.",
    pdfBrochure: "/brochures/aspirin-info.pdf",
  },
  {
    id: 5,
    name: "Centrifuge Machine",
    category: "Laboratory Equipment",
    description: "High-speed laboratory centrifuge for sample separation",
    fullDescription:
      "Professional laboratory centrifuge designed for efficient separation of samples. Features variable speed control, digital display, and safety interlocks for reliable operation in clinical and research settings.",
    image: "/images/products/centrifuge.jpg",
    expiryDate: "2030-01-01",
    manufacturer: "LabEquip Pro",
    batchNumber: "CTF2024005",
    inStock: true,
    ingredients: "Stainless steel rotor, electronic control system, safety housing",
    usage: "Load samples evenly, set appropriate speed and time, ensure lid is properly secured before operation.",
    storage: "Keep in clean, dry laboratory environment. Regular maintenance required.",
    warnings: "Trained personnel only. Ensure proper balance of samples before operation.",
    pdfBrochure: "/brochures/centrifuge-manual.pdf",
  },
  {
    id: 6,
    name: "Bandages Assorted Pack",
    category: "Surgical Supplies",
    description: "Sterile adhesive bandages in various sizes",
    fullDescription:
      "Comprehensive assortment of sterile adhesive bandages suitable for various wound sizes. Features strong adhesive, breathable material, and non-stick pad for comfortable wound care.",
    image: "/images/products/bandages.jpg",
    expiryDate: "2026-11-30",
    manufacturer: "WoundCare Plus",
    batchNumber: "BND2024006",
    inStock: true,
    ingredients: "Adhesive fabric, non-stick pad, hypoallergenic adhesive",
    usage: "Clean wound area, apply bandage ensuring pad covers wound completely, change regularly.",
    storage: "Store in cool, dry place. Keep packaging sealed until use.",
    warnings: "For external use only. Change if bandage becomes wet or soiled.",
    pdfBrochure: "/brochures/bandages-guide.pdf",
  },
  {
    id: 7,
    name: "Insulin Pen Needles",
    category: "Medical Devices",
    description: "Ultra-fine insulin pen needles - 32G x 4mm",
    fullDescription:
      "Ultra-fine insulin pen needles designed for comfortable insulin injection. Features advanced tip technology for reduced injection pain and improved patient compliance.",
    image: "/images/products/insulin-needles.jpg",
    expiryDate: "2027-02-28",
    manufacturer: "DiabetesCare",
    batchNumber: "IPN2024007",
    inStock: true,
    ingredients: "Surgical grade stainless steel, safety cap, hub",
    usage: "Attach to insulin pen, inject as directed by healthcare provider, dispose safely after single use.",
    storage: "Store at room temperature. Do not freeze.",
    warnings: "Single use only. Dispose in sharps container. Do not share needles.",
    pdfBrochure: "/brochures/insulin-needles-guide.pdf",
  },
  {
    id: 8,
    name: "Microscope Slides",
    category: "Laboratory Equipment",
    description: "Pre-cleaned glass microscope slides - Pack of 50",
    fullDescription:
      "High-quality pre-cleaned glass microscope slides suitable for various laboratory applications. Ground edges for safety and consistent thickness for optimal imaging.",
    image: "/images/products/microscope-slides.jpg",
    expiryDate: "2028-12-31",
    manufacturer: "LabGlass Co",
    batchNumber: "MCS2024008",
    inStock: true,
    ingredients: "Optical grade glass, ground edges",
    usage: "Place specimen on slide, add cover slip if needed, view under microscope.",
    storage: "Store in protective packaging to prevent breakage and contamination.",
    warnings: "Handle with care. Glass may break and cause injury.",
    pdfBrochure: "/brochures/microscope-slides-specs.pdf",
  },
  {
    id: 9,
    name: "Betadine Solution",
    category: "Surgical Supplies",
    description: "Antiseptic solution for wound cleaning - 500ml",
    fullDescription:
      "Povidone-iodine antiseptic solution for topical application. Effective broad-spectrum antimicrobial agent for wound cleaning and surgical site preparation.",
    image: "/images/products/betadine.jpg",
    expiryDate: "2025-05-15",
    manufacturer: "Antiseptic Labs",
    batchNumber: "BET2024009",
    inStock: true,
    ingredients: "Povidone-iodine 10%, purified water, glycerin",
    usage: "Apply to affected area, allow to dry, may be diluted as directed by healthcare provider.",
    storage: "Store at room temperature. Protect from light.",
    warnings: "For external use only. May cause skin irritation in sensitive individuals.",
    pdfBrochure: "/brochures/betadine-info.pdf",
  },
  {
    id: 10,
    name: "Lisinopril 10mg Tablets",
    category: "Prescription Medications",
    description: "ACE inhibitor for hypertension treatment",
    fullDescription:
      "Lisinopril is an ACE inhibitor used to treat high blood pressure and heart failure. It works by relaxing blood vessels, allowing blood to flow more easily.",
    image: "/images/products/lisinopril.jpg",
    expiryDate: "2024-12-31",
    manufacturer: "CardioMed",
    batchNumber: "LIS2024010",
    inStock: true,
    ingredients: "Lisinopril, mannitol, calcium phosphate, corn starch",
    usage: "Take once daily as prescribed. May be taken with or without food.",
    storage: "Store at room temperature away from moisture and heat.",
    warnings: "May cause dizziness. Do not use during pregnancy.",
    pdfBrochure: "/brochures/lisinopril-info.pdf",
  },
]

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Breadcrumb */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <ErrorBoundary>
            <Suspense fallback={<ProductDetailSkeleton />}>
              <ProductDetail productId={params.id} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </section>

      <Footer />
    </div>
  )
}
