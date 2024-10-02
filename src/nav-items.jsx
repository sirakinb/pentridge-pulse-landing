import { HomeIcon, CameraIcon, HelpCircleIcon, UserIcon, PhoneIcon } from "lucide-react";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
  },
  {
    title: "Content House",
    to: "/content-house",
    icon: <CameraIcon className="h-4 w-4" />,
  },
  {
    title: "How It Works",
    to: "/how-it-works",
    icon: <HelpCircleIcon className="h-4 w-4" />,
  },
  {
    title: "About Us",
    to: "/about",
    icon: <UserIcon className="h-4 w-4" />,
  },
  {
    title: "Contact",
    to: "/contact",
    icon: <PhoneIcon className="h-4 w-4" />,
  },
];
