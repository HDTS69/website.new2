import { Building2, Calendar, Home, Info, MapPin, Phone, Wrench } from "lucide-react";
import { NavItem } from "@/types/navigation/types";

export const navigationItems: NavItem[] = [
  {
    name: "Home",
    url: "/",
    icon: Home,
  },
  {
    name: "Services",
    url: "/services",
    icon: Wrench,
    dropdownItems: [
      {
        name: "Plumbing",
        url: "/services/plumbing",
        subItems: [
          { name: "Emergency Plumbing", url: "/services/plumbing/emergency" },
          { name: "Blocked Drains", url: "/services/plumbing/blocked-drains" },
          { name: "Blocked Toilet", url: "/services/plumbing/blocked-toilet" },
          { name: "CCTV Camera Inspection", url: "/services/plumbing/cctv-inspection" },
          { name: "Drain Excavation", url: "/services/plumbing/drain-excavation" },
          { name: "Hydro Jet Drain Cleaning", url: "/services/plumbing/hydro-jet-cleaning" },
          { name: "Blocked Stormwater Drains", url: "/services/plumbing/blocked-stormwater" },
          { name: "Sewer and Stormwater Services", url: "/services/plumbing/sewer-stormwater" },
          { name: "Pipe Relining", url: "/services/plumbing/pipe-relining" },
          { name: "Electric Eel Drain Clearing", url: "/services/plumbing/electric-eel" },
          { name: "Leak Detection", url: "/services/plumbing/leak-detection" },
          { name: "Leaking Taps", url: "/services/plumbing/leaking-taps" },
          { name: "Water Pressure Solutions", url: "/services/plumbing/water-pressure" },
          { name: "Hot Water Systems", url: "/services/plumbing/hot-water" },
          { name: "Dishwasher Installations", url: "/services/plumbing/dishwasher-installation" },
          { name: "Fridge Plumbing", url: "/services/plumbing/fridge-plumbing" },
          { name: "Pipe Installations & Repairs", url: "/services/plumbing/pipe-installations" },
          { name: "Toilet Installations & Repairs", url: "/services/plumbing/toilet-installations" },
          { name: "Bathroom Renovations", url: "/services/plumbing/bathroom-renovations" },
          { name: "Shower Repair and Installations", url: "/services/plumbing/shower-installations" }
        ]
      },
      {
        name: "Gas Fitting",
        url: "/services/gas-fitting",
        subItems: [
          { name: "Emergency Gas Repairs", url: "/services/gas-fitting/emergency-gas-repairs" },
          { name: "Gas Leak Detection Service", url: "/services/gas-fitting/gas-leak-detection" },
          { name: "Gas Line Inspections", url: "/services/gas-fitting/gas-line-inspections" },
          { name: "Gas Pipe Repair", url: "/services/gas-fitting/gas-pipe-repair" },
          { name: "Gas System Installation", url: "/services/gas-fitting/gas-system-installation" },
          { name: "Gas Appliance Installation & Repairs", url: "/services/gas-fitting/gas-appliance-installation" },
          { name: "Gas Cooktop Installation", url: "/services/gas-fitting/gas-cooktop-installation" },
          { name: "Gas BBQ Installation and Repair", url: "/services/gas-fitting/gas-bbq-installation" },
          { name: "Gas Hot Water System Installation and Maintenance", url: "/services/gas-fitting/gas-hot-water-installation" },
          { name: "Commercial Gas Appliance Installation", url: "/services/gas-fitting/commercial-gas-installation" },
          { name: "Gas Compliance Certificates", url: "/services/gas-fitting/gas-compliance-certificates" },
        ]
      },
      {
        name: "Roofing",
        url: "/services/roof-repairs",
        subItems: [
          { name: "Roof Inspections", url: "/services/roof-repairs/inspections" },
          { name: "Roof Reports", url: "/services/roof-repairs/reports" },
          { name: "Roof Leak Detection", url: "/services/roof-repairs/leak-detection" },
          { name: "Roof Repairs", url: "/services/roof-repairs/repairs" },
          { name: "Roof Tile Repairs", url: "/services/roof-repairs/tile-repairs" },
          { name: "Metal Roofing", url: "/services/roof-repairs/metal-roofing" },
          { name: "Roof Cleaning", url: "/services/roof-repairs/cleaning" },
          { name: "Roof Ventilation", url: "/services/roof-repairs/ventilation" },
          { name: "Gutter Cleaning", url: "/services/roof-repairs/gutter-cleaning" },
          { name: "Gutter & Downpipes", url: "/services/roof-repairs/gutter-downpipes" },
          { name: "Gutter Guard Installation", url: "/services/roof-repairs/gutter-guard" },
        ]
      },
      {
        name: "Air Conditioning",
        url: "/services/air-conditioning",
        subItems: [
          { name: "AC Installation", url: "/services/air-conditioning/installation" },
          { name: "AC Repairs", url: "/services/air-conditioning/repairs" },
          { name: "AC Servicing", url: "/services/air-conditioning/servicing" },
          { name: "Split System AC", url: "/services/air-conditioning/split-system" },
          { name: "Ducted AC", url: "/services/air-conditioning/ducted" },
        ]
      },
      {
        name: "Hot Water Systems",
        url: "/services/hot-water",
        subItems: [
          { name: "Gas Hot Water", url: "/services/hot-water/gas" },
          { name: "Electric Hot Water", url: "/services/hot-water/electric" },
          { name: "Heat Pump", url: "/services/hot-water/heat-pump" },
          { name: "Solar Hot Water", url: "/services/hot-water/solar" },
          { name: "Hot Water Repairs", url: "/services/hot-water/repairs" },
          { name: "Hot Water Installation", url: "/services/hot-water/installation" },
        ]
      }
    ]
  },
  {
    name: "Brands",
    url: "/brands",
    icon: Building2,
    dropdownItems: [
      {
        name: "Hot Water Brands",
        url: "/brands/hot-water",
        subItems: [
          { name: "Rheem", url: "/brands/rheem" },
          { name: "Rinnai", url: "/brands/rinnai" },
          { name: "Bosch", url: "/brands/bosch" },
          { name: "Dux", url: "/brands/dux" },
          { name: "Thermann", url: "/brands/thermann" },
          { name: "Vulcan", url: "/brands/vulcan" },
          { name: "Aquamax", url: "/brands/aquamax" },
          { name: "Chromagen", url: "/brands/chromagen" },
          { name: "Everhot", url: "/brands/everhot" },
          { name: "Stiebel Eltron", url: "/brands/stiebel-eltron" },
        ]
      },
      {
        name: "Air Conditioning",
        url: "/brands/air-conditioning",
        subItems: [
          { name: "Daikin", url: "/brands/daikin" },
          { name: "Fujitsu", url: "/brands/fujitsu" },
          { name: "Mitsubishi Heavy Industries", url: "/brands/mitsubishi-heavy-industries" },
          { name: "Samsung", url: "/brands/samsung" },
          { name: "Gree", url: "/brands/gree" },
        ]
      }
    ]
  },
  {
    name: "Locations",
    url: "/locations",
    icon: MapPin,
    dropdownItems: [
      {
        name: "Brisbane",
        url: "/locations/brisbane",
        subItems: [
          { name: "North Brisbane", url: "/locations/brisbane/north" },
          { name: "South Brisbane", url: "/locations/brisbane/south" },
          { name: "East Brisbane", url: "/locations/brisbane/east" },
          { name: "West Brisbane", url: "/locations/brisbane/west" },
          { name: "Brisbane CBD", url: "/locations/brisbane/cbd" },
        ]
      },
      {
        name: "Ipswich",
        url: "/locations/ipswich",
        subItems: [
          { name: "Ipswich CBD", url: "/locations/ipswich/cbd" },
          { name: "East Ipswich", url: "/locations/ipswich/east" },
          { name: "West Ipswich", url: "/locations/ipswich/west" },
        ]
      },
      {
        name: "Logan",
        url: "/locations/logan",
        subItems: [
          { name: "Logan Central", url: "/locations/logan/central" },
          { name: "North Logan", url: "/locations/logan/north" },
          { name: "South Logan", url: "/locations/logan/south" },
        ]
      },
      {
        name: "Moreton Bay",
        url: "/locations/moreton-bay",
        subItems: [
          { name: "North Lakes", url: "/locations/moreton-bay/north-lakes" },
          { name: "Redcliffe", url: "/locations/moreton-bay/redcliffe" },
          { name: "Caboolture", url: "/locations/moreton-bay/caboolture" },
        ]
      },
      {
        name: "Gold Coast",
        url: "/locations/gold-coast",
        subItems: [
          { name: "North Gold Coast", url: "/locations/gold-coast/north" },
          { name: "Central Gold Coast", url: "/locations/gold-coast/central" },
          { name: "South Gold Coast", url: "/locations/gold-coast/south" },
        ]
      }
    ]
  },
  {
    name: "About Us",
    url: "/about",
    icon: Info,
    dropdownItems: [
      {
        name: "Our Story",
        url: "/about/our-story",
      },
      {
        name: "Our Team",
        url: "/about/team",
      },
      {
        name: "Testimonials",
        url: "/about/testimonials",
      },
      {
        name: "Blog",
        url: "/about/blog",
      }
    ]
  }
];

export const actionItems: NavItem[] = [
  {
    name: "Call Now",
    url: "tel:1300420911",
    icon: Phone,
  },
  {
    name: "Book Online",
    url: "#booking-form",
    icon: Calendar,
    isHighlighted: true,
  },
]; 