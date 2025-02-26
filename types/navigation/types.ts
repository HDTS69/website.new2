import { LucideIcon } from "lucide-react"

export interface SubNavItem {
  name: string
  url: string
}

export interface DropdownNavItem {
  name: string
  url: string
  subItems?: SubNavItem[]
}

export interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  dropdownItems?: DropdownNavItem[]
  isHighlighted?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export interface BaseNavigationProps {
  items: NavItem[]
  actionItems?: NavItem[]
  className?: string
} 