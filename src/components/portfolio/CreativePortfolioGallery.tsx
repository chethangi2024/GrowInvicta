"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  Eye,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
} from "lucide-react";
import BorderGlow from "@/components/ui/BorderGlow";

export type CreativeCategory = "Brochures" | "Flyers" | "Others" | "Posters";

export interface CreativeAsset {
  id: string;
  title: string;
  category: CreativeCategory;
  type: "image" | "pdf";
  thumbnailUrl: string;
  fullImageUrl?: string;
  pdfUrl?: string;
  subtitle?: string;
}

// 4 Subfolders Data Mapping from "Design And Creatives"
export const CREATIVE_PORTFOLIO_DATA: Record<CreativeCategory, CreativeAsset[]> = {
  Brochures: [
    {
      id: "brochure-amaara",
      title: "Amaara Luxury Residences",
      category: "Brochures",
      type: "pdf",
      thumbnailUrl: "/design-and-creatives/Brochures/Amaara.webp",
      fullImageUrl: "/design-and-creatives/Brochures/Amaara.webp",
      pdfUrl: "/design-and-creatives/Brochures/Amaara Brochure.pdf",
      subtitle: "Luxury Real Estate Architecture & Living Brochure",
    },
    {
      id: "brochure-arkenza-office",
      title: "Arkenza Commercial Workspace",
      category: "Brochures",
      type: "pdf",
      thumbnailUrl: "/design-and-creatives/Brochures/Arkenza Office.webp",
      fullImageUrl: "/design-and-creatives/Brochures/Arkenza Office.webp",
      pdfUrl: "/design-and-creatives/Brochures/Arkenza Office Brochure.pdf",
      subtitle: "Corporate Office & Tech Park Infrastructure Brochure",
    },
    {
      id: "brochure-arkenza-residential",
      title: "Arkenza Premium Residential",
      category: "Brochures",
      type: "pdf",
      thumbnailUrl: "/design-and-creatives/Brochures/Arkenza Residential.webp",
      fullImageUrl: "/design-and-creatives/Brochures/Arkenza Residential.webp",
      pdfUrl: "/design-and-creatives/Brochures/Arkenza Residential Brochure.pdf",
      subtitle: "Modern Urban Living & Apartment Showcase",
    },
    {
      id: "brochure-dhriti",
      title: "Dhriti Enterprises Corporate",
      category: "Brochures",
      type: "pdf",
      thumbnailUrl: "/design-and-creatives/Brochures/Dhriti Enterprices.webp",
      fullImageUrl: "/design-and-creatives/Brochures/Dhriti Enterprices.webp",
      pdfUrl: "/design-and-creatives/Brochures/Dhriti Brochure.pdf",
      subtitle: "Enterprise Capabilities & Business Profile Brochure",
    },
    {
      id: "brochure-elite",
      title: "Elite Construction Infrastructure",
      category: "Brochures",
      type: "pdf",
      thumbnailUrl: "/design-and-creatives/Brochures/Elite Construction Brochure.webp",
      fullImageUrl: "/design-and-creatives/Brochures/Elite Construction Brochure.webp",
      pdfUrl: "/design-and-creatives/Brochures/Elite Construction Brochure.pdf",
      subtitle: "Civil Construction & Engineering Project Portfolio",
    },
    {
      id: "brochure-oasis",
      title: "Oasis Living Masterplan",
      category: "Brochures",
      type: "pdf",
      thumbnailUrl: "/design-and-creatives/Brochures/Oasis Brochure.webp",
      fullImageUrl: "/design-and-creatives/Brochures/Oasis Brochure.webp",
      pdfUrl: "/design-and-creatives/Brochures/Oasis Brochure.pdf",
      subtitle: "Gated Community & Villa Layout Brochure",
    },
    {
      id: "brochure-reva",
      title: "Reva Educational Institution",
      category: "Brochures",
      type: "pdf",
      thumbnailUrl: "/design-and-creatives/Brochures/Reva.webp",
      fullImageUrl: "/design-and-creatives/Brochures/Reva.webp",
      pdfUrl: "/design-and-creatives/Brochures/Reva Brochure.pdf",
      subtitle: "Academic Programs & Campus Life Prospectus",
    },
    {
      id: "brochure-svastha-vaccine",
      title: "Svastha Pediatric Immunization",
      category: "Brochures",
      type: "pdf",
      thumbnailUrl: "/design-and-creatives/Brochures/Vaccination Card.webp",
      fullImageUrl: "/design-and-creatives/Brochures/Vaccination Card.webp",
      pdfUrl: "/design-and-creatives/Brochures/Svastha Vaccination Card.pdf",
      subtitle: "Clinical Vaccination Schedule & Child Health Tracker",
    },
    {
      id: "brochure-tiiger-trail",
      title: "Tiiger Trail Eco Resort",
      category: "Brochures",
      type: "pdf",
      thumbnailUrl: "/design-and-creatives/Brochures/Tiiger Trail Brochure.webp",
      fullImageUrl: "/design-and-creatives/Brochures/Tiiger Trail Brochure.webp",
      pdfUrl: "/design-and-creatives/Brochures/Tiiger Trail Brochure.pdf",
      subtitle: "Wilderness Retreat & Luxury Safari Brochure",
    },
  ],
  Flyers: [
    {
      id: "flyer-annual-flu",
      title: "Annual Flu Prevention Advisory",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/Annual Flu.webp",
      fullImageUrl: "/design-and-creatives/Flyers/Annual Flu.webp",
      subtitle: "Seasonal Influenza Health Awareness Campaign",
    },
    {
      id: "flyer-hepatitis-a",
      title: "Hepatitis A Clinical Protocol",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/Hepatitis A.webp",
      fullImageUrl: "/design-and-creatives/Flyers/Hepatitis A.webp",
      subtitle: "Preventive Care & Liver Wellness Advisory",
    },
    {
      id: "flyer-hepatitis-b",
      title: "Hepatitis B Vaccination Guide",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/Hepatitis B.webp",
      fullImageUrl: "/design-and-creatives/Flyers/Hepatitis B.webp",
      subtitle: "Immunization Dosage & Protection Advisory",
    },
    {
      id: "flyer-hpv",
      title: "HPV Vaccination & Protection",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/HPV Vaccination.webp",
      fullImageUrl: "/design-and-creatives/Flyers/HPV Vaccination.webp",
      subtitle: "Cervical Cancer Awareness & Vaccine Schedule",
    },
    {
      id: "flyer-immunity",
      title: "Childhood Immunity & Wellness",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/Immunity in Kids.webp",
      fullImageUrl: "/design-and-creatives/Flyers/Immunity in Kids.webp",
      subtitle: "Pediatric Nutrition & Defense Health Tips",
    },
    {
      id: "flyer-meningitis",
      title: "Meningitis Health Warning & Prevention",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/Meningitis.webp",
      fullImageUrl: "/design-and-creatives/Flyers/Meningitis.webp",
      subtitle: "Early Symptom Recognition & Emergency Guidance",
    },
    {
      id: "flyer-nethra-drishti-3",
      title: "Nethra Drishti Eye Care Specialist",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/Nethra Drishti Poster 3.webp",
      fullImageUrl: "/design-and-creatives/Flyers/Nethra Drishti Poster 3.webp",
      subtitle: "Retina & Cataract Specialization Services",
    },
    {
      id: "flyer-ok-botox",
      title: "Clinical Aesthetics — Botox Procedures",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/OK - Botox.webp",
      fullImageUrl: "/design-and-creatives/Flyers/OK - Botox.webp",
      subtitle: "Dermatological Anti-Aging Treatments",
    },
    {
      id: "flyer-ok-laser",
      title: "Advanced Laser Hair Removal",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/OK - Laser Hair Removal.webp",
      fullImageUrl: "/design-and-creatives/Flyers/OK - Laser Hair Removal.webp",
      subtitle: "Painless Triple-Wavelength Laser Technology",
    },
    {
      id: "flyer-ok-rf",
      title: "Microneedling RF Skin Rejuvenation",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/OK - Microneedling Radiofrequency.webp",
      fullImageUrl: "/design-and-creatives/Flyers/OK - Microneedling Radiofrequency.webp",
      subtitle: "Collagen Induction & Scar Reduction Therapy",
    },
    {
      id: "flyer-pneumonia",
      title: "Pneumococcal Health & Care",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/Pneumonia.webp",
      fullImageUrl: "/design-and-creatives/Flyers/Pneumonia.webp",
      subtitle: "Elderly & Pediatric Respiratory Protection",
    },
    {
      id: "flyer-prp",
      title: "PRP Regenerative Injection Therapy",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/PRP Injection (Ananth Doctor).webp",
      fullImageUrl: "/design-and-creatives/Flyers/PRP Injection (Ananth Doctor).webp",
      subtitle: "Platelet-Rich Plasma Hair & Joint Therapy",
    },
    {
      id: "flyer-shingles",
      title: "Shingles Clinical Awareness",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/Shingles.webp",
      fullImageUrl: "/design-and-creatives/Flyers/Shingles.webp",
      subtitle: "Adult Herpes Zoster Prevention & Care",
    },
    {
      id: "flyer-1",
      title: "Specialist Care Campaign 01",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/1.webp",
      fullImageUrl: "/design-and-creatives/Flyers/1.webp",
      subtitle: "Comprehensive Clinical Service Promotion",
    },
    {
      id: "flyer-2",
      title: "Specialist Care Campaign 02",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/2.webp",
      fullImageUrl: "/design-and-creatives/Flyers/2.webp",
      subtitle: "Diagnostic Testing & Wellness Packages",
    },
    {
      id: "flyer-4",
      title: "Diagnostic Health Campaign 03",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/4.webp",
      fullImageUrl: "/design-and-creatives/Flyers/4.webp",
      subtitle: "Preventive Screening & Full Body Checkup",
    },
    {
      id: "flyer-5",
      title: "Diagnostic Health Campaign 04",
      category: "Flyers",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Flyers/5.webp",
      fullImageUrl: "/design-and-creatives/Flyers/5.webp",
      subtitle: "Outpatient Consultation & Pharmacy Discounts",
    },
  ],
  Others: [
    {
      id: "other-pricelist",
      title: "Nethra Drishti Tariff & Service Menu",
      category: "Others",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Others/Nethra Drishti Pricelist.webp",
      fullImageUrl: "/design-and-creatives/Others/Nethra Drishti Pricelist.webp",
      subtitle: "Ophthalmology Consultation & Procedure Tariff",
    },
    {
      id: "other-idcard",
      title: "Corporate Identity & Staff ID Card",
      category: "Others",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Others/Nethra Drusti ID Card.webp",
      fullImageUrl: "/design-and-creatives/Others/Nethra Drusti ID Card.webp",
      subtitle: "Hospital Staff Identification & RFID Badge",
    },
    {
      id: "other-certificate",
      title: "Medical Authenticity Certificate",
      category: "Others",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Others/Svastha Certificate.webp",
      fullImageUrl: "/design-and-creatives/Others/Svastha Certificate.webp",
      subtitle: "Official Healthcare Certificate & Seal Design",
    },
    {
      id: "other-letterhead-1",
      title: "Executive Corporate Letterhead",
      category: "Others",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Others/Svastha Letterhead.webp",
      fullImageUrl: "/design-and-creatives/Others/Svastha Letterhead.webp",
      subtitle: "Official Institutional Stationery & Letterhead",
    },
    {
      id: "other-letterhead-2",
      title: "Clinical Prescription Header",
      category: "Others",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Others/Svastha Letterhead 2.webp",
      fullImageUrl: "/design-and-creatives/Others/Svastha Letterhead 2.webp",
      subtitle: "Medical Rx Pad & Doctor Consultation Stationery",
    },
    {
      id: "other-letterhead-3",
      title: "Official Consultation Header",
      category: "Others",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Others/Svastha Letterhead 3.webp",
      fullImageUrl: "/design-and-creatives/Others/Svastha Letterhead 3.webp",
      subtitle: "Departmental Documentation & Memo Stationery",
    },
    {
      id: "other-1",
      title: "Brand Identity Collateral 01",
      category: "Others",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Others/1.webp",
      fullImageUrl: "/design-and-creatives/Others/1.webp",
      subtitle: "Corporate Brand System & Graphic Elements",
    },
    {
      id: "other-2",
      title: "Brand Identity Collateral 02",
      category: "Others",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Others/2.webp",
      fullImageUrl: "/design-and-creatives/Others/2.webp",
      subtitle: "Marketing Presentation & Identity Assets",
    },
  ],
  Posters: [
    {
      id: "poster-dr-rashmi",
      title: "Dr. Rashmi Consultation Pamphlet",
      category: "Posters",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Posters/Dr. Rashmi Pamphlet.webp",
      fullImageUrl: "/design-and-creatives/Posters/Dr. Rashmi Pamphlet.webp",
      subtitle: "Specialist Physician Consultation & Clinic Guide",
    },
    {
      id: "poster-khb",
      title: "KHB Public Health Campaign",
      category: "Posters",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Posters/KHB Poster.webp",
      fullImageUrl: "/design-and-creatives/Posters/KHB Poster.webp",
      subtitle: "Community Health Awareness & Event Poster",
    },
    {
      id: "poster-nethra-1",
      title: "Nethra Drishti Eye Care Outreach",
      category: "Posters",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Posters/Nethra Drishti Poster.webp",
      fullImageUrl: "/design-and-creatives/Posters/Nethra Drishti Poster.webp",
      subtitle: "Vision Care & Comprehensive Eye Health Poster",
    },
    {
      id: "poster-nethra-2",
      title: "Advanced Ophthalmology Services",
      category: "Posters",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Posters/Nethra Drishti Poster 2.webp",
      fullImageUrl: "/design-and-creatives/Posters/Nethra Drishti Poster 2.webp",
      subtitle: "Surgical Eye Care & Laser Vision Solutions",
    },
    {
      id: "poster-svastha-bg",
      title: "Medical Exhibition Backdrop",
      category: "Posters",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Posters/Svastha Background.webp",
      fullImageUrl: "/design-and-creatives/Posters/Svastha Background.webp",
      subtitle: "High-Resolution Stage & Conference Backdrop",
    },
    {
      id: "poster-svastha-camp-1",
      title: "Community Wellness & Screening Camp",
      category: "Posters",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Posters/Svastha Camp.webp",
      fullImageUrl: "/design-and-creatives/Posters/Svastha Camp.webp",
      subtitle: "Free Health Checkup & Specialty Doctor Camp",
    },
    {
      id: "poster-svastha-camp-2",
      title: "Comprehensive Diagnostic Health Camp",
      category: "Posters",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Posters/Svastha Clinic Health Camp.webp",
      fullImageUrl: "/design-and-creatives/Posters/Svastha Clinic Health Camp.webp",
      subtitle: "Cardiology, Diabetes & General Health Camp",
    },
    {
      id: "poster-svastha-derma",
      title: "Dermatology & Skin Science Banner",
      category: "Posters",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Posters/Svastha Dermatology Poster.webp",
      fullImageUrl: "/design-and-creatives/Posters/Svastha Dermatology Poster.webp",
      subtitle: "Cosmetic & Medical Dermatology Poster",
    },
    {
      id: "poster-svastha-doctor",
      title: "Specialist Physician Directory",
      category: "Posters",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Posters/Svastha Doctor Poster.webp",
      fullImageUrl: "/design-and-creatives/Posters/Svastha Doctor Poster.webp",
      subtitle: "Departmental Consultant Timings & Specialties",
    },
    {
      id: "poster-svastha-poster-1",
      title: "Hospital Standards & Quality Protocol",
      category: "Posters",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Posters/Svastha Poster.webp",
      fullImageUrl: "/design-and-creatives/Posters/Svastha Poster.webp",
      subtitle: "NABH Compliance & Patient Safety Standards",
    },
    {
      id: "poster-svastha-poster-2",
      title: "Clinical Diagnostic Excellence",
      category: "Posters",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Posters/Svastha Poster 2.webp",
      fullImageUrl: "/design-and-creatives/Posters/Svastha Poster 2.webp",
      subtitle: "24/7 Advanced Pathology & Imaging Services",
    },
    {
      id: "poster-svastha-poster-3",
      title: "Emergency & Trauma Care Protocol",
      category: "Posters",
      type: "image",
      thumbnailUrl: "/design-and-creatives/Posters/Svastha Poster 3.webp",
      fullImageUrl: "/design-and-creatives/Posters/Svastha Poster 3.webp",
      subtitle: "Critical Care Unit & 24/7 Emergency Helpline",
    },
  ],
};

const CATEGORIES: CreativeCategory[] = ["Brochures", "Flyers", "Posters", "Others"];

export default function CreativePortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState<CreativeCategory>("Brochures");
  const [selectedAsset, setSelectedAsset] = useState<CreativeAsset | null>(null);
  const [modalMode, setModalMode] = useState<"preview" | "pdf">("pdf");

  const currentAssets = CREATIVE_PORTFOLIO_DATA[activeCategory] || [];

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedAsset) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedAsset]);

  // Handle ESC key and arrow keys
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedAsset) return;

      if (e.key === "Escape") {
        setSelectedAsset(null);
      } else if (e.key === "ArrowRight") {
        const currentIndex = currentAssets.findIndex((a) => a.id === selectedAsset.id);
        if (currentIndex !== -1 && currentIndex < currentAssets.length - 1) {
          const nextAsset = currentAssets[currentIndex + 1];
          setSelectedAsset(nextAsset);
          setModalMode(nextAsset.type === "pdf" ? "pdf" : "preview");
        }
      } else if (e.key === "ArrowLeft") {
        const currentIndex = currentAssets.findIndex((a) => a.id === selectedAsset.id);
        if (currentIndex > 0) {
          const prevAsset = currentAssets[currentIndex - 1];
          setSelectedAsset(prevAsset);
          setModalMode(prevAsset.type === "pdf" ? "pdf" : "preview");
        }
      }
    },
    [selectedAsset, currentAssets]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const openAssetModal = (asset: CreativeAsset) => {
    setSelectedAsset(asset);
    setModalMode(asset.type === "pdf" ? "pdf" : "preview");
  };

  const currentIndex = selectedAsset
    ? currentAssets.findIndex((a) => a.id === selectedAsset.id)
    : -1;
  const hasNext = currentIndex !== -1 && currentIndex < currentAssets.length - 1;
  const hasPrev = currentIndex > 0;

  const navigateNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasNext) {
      const nextAsset = currentAssets[currentIndex + 1];
      setSelectedAsset(nextAsset);
      setModalMode(nextAsset.type === "pdf" ? "pdf" : "preview");
    }
  };

  const navigatePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasPrev) {
      const prevAsset = currentAssets[currentIndex - 1];
      setSelectedAsset(prevAsset);
      setModalMode(prevAsset.type === "pdf" ? "pdf" : "preview");
    }
  };

  return (
    <section className="mb-20 sm:mb-28 pt-8 border-t border-[var(--border)]">
      {/* Section Header */}
      <div className="max-w-4xl mb-10 gsap-reveal-header">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#7C3AED] font-semibold block mb-1.5">
          DESIGN &amp; CREATIVE WORK
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
          Creative &amp; Branding Portfolio
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          Selected creative, branding, marketing and visual design work created for businesses and digital campaigns.
        </p>
      </div>

      {/* 4 Actual Subfolder Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 pb-4 border-b border-[var(--border)]">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          const count = CREATIVE_PORTFOLIO_DATA[category]?.length || 0;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-[2px] text-xs font-mono font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                isActive
                  ? "bg-[var(--card-bg-hover)] text-[var(--text-primary)] border border-[#7C3AED]/60 shadow-[0_0_15px_rgba(124,58,237,0.2)]"
                  : "bg-[var(--section-bg)] text-[var(--text-secondary)] border border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--card-bg)]"
              }`}
            >
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shadow-[0_0_8px_#7C3AED]" />
              )}
              <span>{category}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-[2px] ${
                  isActive
                    ? "bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/30"
                    : "bg-[var(--border-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
      >
        {currentAssets.map((asset, index) => {
          const isPdf = asset.type === "pdf";

          return (
            <div
              key={asset.id}
              onClick={() => openAssetModal(asset)}
              className="cursor-pointer group block text-left"
            >
              <BorderGlow
                className="p-0 overflow-hidden flex flex-col h-full transition-transform duration-300 group-hover:scale-[1.015]"
                borderRadius={4}
                edgeSensitivity={25}
                glowRadius={30}
                glowIntensity={1.1}
                colors={["#7C3AED", "#FF6A00"]}
                
              >
                {/* Artwork Thumbnail Frame */}
                <div className="relative w-full aspect-[4/3] bg-[var(--page-bg)] overflow-hidden flex items-center justify-center p-3 border-b border-[var(--border)]">
                  {/* Subtle Grid / Texture under artwork */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[2px]">
                    <Image
                      src={asset.thumbnailUrl}
                      alt={asset.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      loading={index < 6 ? "eager" : "lazy"}
                    />
                  </div>

                  {/* Format Badge overlay */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                    {isPdf ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--section-bg)]/90 backdrop-blur-md border border-[#7C3AED]/40 text-[var(--text-primary)] font-mono text-[9px] font-semibold uppercase tracking-wider rounded-[2px] shadow-sm">
                        <FileText className="w-2.5 h-2.5 text-[#7C3AED]" />
                        PDF Document
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--section-bg)]/90 backdrop-blur-md border border-[var(--border)] text-[var(--text-secondary)] font-mono text-[9px] font-semibold uppercase tracking-wider rounded-[2px] shadow-sm">
                        <Eye className="w-2.5 h-2.5 text-[var(--text-secondary)]" />
                        Artwork
                      </span>
                    )}
                  </div>

                  {/* Hover Quick Action Indicator */}
                  <div className="absolute inset-0 bg-[var(--page-bg)]/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-10 pointer-events-none">
                    <div className="px-3.5 py-1.5 bg-[var(--card-bg)]/95 border border-[#7C3AED]/60 text-[var(--text-primary)] font-mono text-xs font-semibold flex items-center gap-2 rounded-[2px] shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                      {isPdf ? (
                        <>
                          <FileText className="w-3.5 h-3.5 text-[#7C3AED]" />
                          <span>Open PDF Viewer</span>
                        </>
                      ) : (
                        <>
                          <Maximize2 className="w-3.5 h-3.5 text-[#7C3AED]" />
                          <span>View Fullscreen</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Metadata Description */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow bg-[var(--card-bg)]">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                      {asset.category} &bull; {isPdf ? "Interactive PDF" : "Digital Creative"}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] tracking-tight group-hover:text-[var(--text-primary)] transition-colors line-clamp-1">
                      {asset.title}
                    </h3>
                    {asset.subtitle && (
                      <p className="mt-1 text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed font-sans">
                        {asset.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-secondary)]">
                    <span className="text-[var(--text-muted)]">
                      {isPdf ? "Click to view PDF" : "Click to view full image"}
                    </span>
                    <span className="text-[var(--text-primary)] group-hover:text-[#7C3AED] transition-colors flex items-center gap-1 font-semibold">
                      <span>{isPdf ? "Read PDF" : "Expand"}</span>
                      <Maximize2 className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </BorderGlow>
            </div>
          );
        })}
      </motion.div>

      {/* FULLSCREEN LIGHTBOX / PDF VIEWER MODAL */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedAsset(null)}
            className="fixed inset-0 z-50 bg-[var(--page-bg)]/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-hidden"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[92vh] bg-[var(--card-bg)] border border-[var(--border)] rounded-[4px] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[var(--section-bg)] border-b border-[var(--border)] shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="px-2 py-0.5 bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-[#7C3AED] font-mono text-[10px] uppercase font-semibold tracking-wider rounded-[2px] shrink-0">
                    {selectedAsset.category}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-bold text-[var(--text-primary)] truncate">
                      {selectedAsset.title}
                    </h4>
                    {selectedAsset.subtitle && (
                      <p className="text-xs text-[var(--text-secondary)] truncate hidden sm:block">
                        {selectedAsset.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Top Bar Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {selectedAsset.type === "pdf" && selectedAsset.pdfUrl && (
                    <>
                      {/* View Mode Toggle */}
                      <div className="hidden sm:inline-flex items-center bg-[var(--page-bg)] border border-[var(--border)] p-0.5 rounded-[2px] mr-2">
                        <button
                          type="button"
                          onClick={() => setModalMode("pdf")}
                          className={`px-2.5 py-1 text-[11px] font-mono rounded-[2px] transition-colors ${
                            modalMode === "pdf"
                              ? "bg-[var(--card-bg-hover)] text-[var(--text-primary)] border border-[#7C3AED]/50 font-semibold"
                              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          PDF Viewer
                        </button>
                        <button
                          type="button"
                          onClick={() => setModalMode("preview")}
                          className={`px-2.5 py-1 text-[11px] font-mono rounded-[2px] transition-colors ${
                            modalMode === "preview"
                              ? "bg-[var(--card-bg-hover)] text-[var(--text-primary)] border border-[#7C3AED]/50 font-semibold"
                              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          Cover Image
                        </button>
                      </div>

                      <a
                        href={selectedAsset.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[var(--card-bg-hover)] hover:bg-[#1A1E28] border border-[var(--border)] text-xs font-mono text-[var(--text-primary)] flex items-center gap-1.5 rounded-[2px] transition-colors"
                        title="Open PDF in new browser tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#7C3AED]" />
                        <span className="hidden md:inline">Open in Tab</span>
                      </a>
                      <a
                        href={selectedAsset.pdfUrl}
                        download
                        className="p-1.5 sm:px-3 sm:py-1.5 bg-[var(--card-bg-hover)] hover:bg-[#1A1E28] border border-[var(--border)] text-xs font-mono text-[var(--text-primary)] flex items-center gap-1.5 rounded-[2px] transition-colors"
                        title="Download PDF document"
                      >
                        <Download className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                        <span className="hidden md:inline">Download</span>
                      </a>
                    </>
                  )}

                  {selectedAsset.type === "image" && selectedAsset.fullImageUrl && (
                    <a
                      href={selectedAsset.fullImageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[var(--card-bg-hover)] hover:bg-[#1A1E28] border border-[var(--border)] text-xs font-mono text-[var(--text-primary)] flex items-center gap-1.5 rounded-[2px] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#7C3AED]" />
                      <span className="hidden md:inline">Full Image</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedAsset(null)}
                    className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border)] rounded-[2px] transition-colors ml-1"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content Body */}
              <div className="relative flex-grow min-h-[50vh] max-h-[78vh] bg-[var(--page-bg)] flex items-center justify-center overflow-hidden p-2 sm:p-4">
                {/* PDF Viewer Mode */}
                {selectedAsset.type === "pdf" && modalMode === "pdf" && selectedAsset.pdfUrl ? (
                  <div className="w-full h-full min-h-[60vh] max-h-[75vh] relative rounded-[2px] overflow-hidden bg-[var(--section-bg)] border border-[var(--border)]">
                    <iframe
                      src={`${selectedAsset.pdfUrl}#toolbar=1&navpanes=0`}
                      className="w-full h-full min-h-[60vh] border-0"
                      title={selectedAsset.title}
                    />
                  </div>
                ) : (
                  /* Image Lightbox Mode */
                  <div className="relative w-full h-full max-h-[74vh] flex items-center justify-center overflow-hidden">
                    <Image
                      src={selectedAsset.fullImageUrl || selectedAsset.thumbnailUrl}
                      alt={selectedAsset.title}
                      width={1600}
                      height={1200}
                      className="max-h-[74vh] w-auto max-w-full object-contain rounded-[2px] select-none"
                      priority
                      quality={95}
                    />
                  </div>
                )}

                {/* Left Navigation Arrow */}
                {hasPrev && (
                  <button
                    type="button"
                    onClick={navigatePrev}
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 bg-[var(--section-bg)]/90 hover:bg-[var(--card-bg-hover)] text-[var(--text-primary)] border border-[var(--border)] rounded-full transition-all shadow-xl hover:scale-110 z-20 cursor-pointer"
                    aria-label="Previous item"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {/* Right Navigation Arrow */}
                {hasNext && (
                  <button
                    type="button"
                    onClick={navigateNext}
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 bg-[var(--section-bg)]/90 hover:bg-[var(--card-bg-hover)] text-[var(--text-primary)] border border-[var(--border)] rounded-full transition-all shadow-xl hover:scale-110 z-20 cursor-pointer"
                    aria-label="Next item"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Modal Footer Controls & Telemetry */}
              <div className="px-4 sm:px-6 py-2.5 bg-[var(--section-bg)] border-t border-[var(--border)] flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-muted)]">
                    Item {currentIndex + 1} of {currentAssets.length}
                  </span>
                  <span className="text-zinc-600 hidden sm:inline">&bull;</span>
                  <span className="text-[var(--text-muted)] hidden sm:inline">Use &larr; &rarr; to navigate, ESC to close</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedAsset(null)}
                    className="px-3 py-1 bg-[var(--border-subtle)] hover:bg-[var(--border)] border border-[var(--border)] text-[var(--text-primary)] text-[11px] font-mono uppercase tracking-wider rounded-[2px] transition-colors"
                  >
                    Close [ESC]
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
