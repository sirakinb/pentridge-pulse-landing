import { HomeIcon, CameraIcon, HelpCircleIcon, UserIcon, PhoneIcon, BookOpenIcon, FolderIcon, MicIcon } from "lucide-react";

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
    title: "Services",
    to: "/services",
    icon: <MicIcon className="h-4 w-4" />,
    submenu: [
      {
        title: "AI Voice Agents",
        to: "/services/ai-voice-agents",
        description: "24/7 AI phone answering service"
      },
      {
        title: "Content House",
        to: "/content-house",
        description: "AI-powered content creation"
      }
    ]
  },
  {
    title: "Blog",
    to: "/blog",
    icon: <BookOpenIcon className="h-4 w-4" />,
  },
  {
    title: "Resources",
    to: "/resources",
    icon: <FolderIcon className="h-4 w-4" />,
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
