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
        name: "Hot Water Systems",
        url: "/services/hot-water",
        subItems: [
          { name: "Gas Hot Water", url: "/services/hot-water/gas" },
          { name: "Electric Hot Water", url: "/services/hot-water/electric" },
          { name: "Heat Pump", url: "/services/hot-water/heat-pump" },
          { name: "Solar Hot Water", url: "/services/hot-water/solar" },
        ]
      },
      {
        name: "Plumbing",
        url: "/services/plumbing",
        subItems: [
          { name: "Emergency Plumbing", url: "/services/plumbing/emergency" },
          { name: "Blocked Drains", url: "/services/plumbing/blocked-drains" },
          { name: "Leak Detection", url: "/services/plumbing/leak-detection" },
          { name: "Gas Fitting", url: "/services/plumbing/gas-fitting" },
        ]
      },
      {
        name: "Roofing",
        url: "/services/roofing",
        subItems: [
          { name: "Roof Repairs", url: "/services/roofing/repairs" },
          { name: "Gutter Cleaning", url: "/services/roofing/gutter-cleaning" },
          { name: "Roof Restoration", url: "/services/roofing/restoration" },
          { name: "Roof Replacement", url: "/services/roofing/replacement" },
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
        name: "Gold Coast",
        url: "/locations/gold-coast",
        subItems: [
          { name: "North Gold Coast", url: "/locations/gold-coast/north" },
          { name: "Central Gold Coast", url: "/locations/gold-coast/central" },
          { name: "South Gold Coast", url: "/locations/gold-coast/south" },
        ]
      },
      {
        name: "Sunshine Coast",
        url: "/locations/sunshine-coast",
        subItems: [
          { name: "North Sunshine Coast", url: "/locations/sunshine-coast/north" },
          { name: "Central Sunshine Coast", url: "/locations/sunshine-coast/central" },
          { name: "South Sunshine Coast", url: "/locations/sunshine-coast/south" },
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