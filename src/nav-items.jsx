import { HomeIcon, UserIcon, PhoneIcon, CalculatorIcon, FolderIcon, MicIcon, WorkflowIcon } from "lucide-react";

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
        title: "AI Workflow Automation",
        to: "/services",
        description: "Audit, build, integrate, and maintain AI workflows"
      },
      {
        title: "AI Voice Agents",
        to: "/services/ai-voice-agents",
        description: "24/7 call handling, qualification, and booking"
      },
      {
        title: "CRM & Operations Automation",
        to: "/services",
        description: "CRM, calendar, email, SMS, and reporting automation"
      }
    ]
  },
  {
    title: "Use Cases",
    to: "/resources/ai-process-automation-examples",
    icon: <WorkflowIcon className="h-4 w-4" />,
  },
  {
    title: "ROI Calculator",
    to: "/roi-calculator",
    icon: <CalculatorIcon className="h-4 w-4" />,
  },
  {
    title: "Resources",
    to: "/resources",
    icon: <FolderIcon className="h-4 w-4" />,
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
