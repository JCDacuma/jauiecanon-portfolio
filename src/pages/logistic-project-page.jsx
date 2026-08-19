import { Code2, Server, Database, Package, ShieldCheck } from "lucide-react";
import ProjectLayout from "@/components/layout/project-layout.jsx";

const PROJECT = {
  sectionId: "works",
  title: "Point of Sale with Inventory Management System",
  eyebrow: "Full-Stack Web Application",
  description:
    "Streamlines retail operations by combining sales processing, real-time stock tracking, and actionable analytics into a single, seamless platform. Built to handle high-volume transactions while keeping inventory counts accurate across multiple outlets.",
  heroImage: "/projects/inventory_pos_img/inv_pos_img.svg",
  liveUrl: "#",
  githubUrl: "",
  techStack: {
    frontend: {
      label: "Frontend",
      icon: Code2,
      items: [
        "ReactJs",
        "TypeScript",
        "Framer-motion",
        "Material UI",
        "Tailwind CSS",
      ],
    },
    backend: {
      label: "Backend",
      icon: Server,
      items: ["Laravel", "PHP"],
    },
    database: {
      label: "Database",
      icon: Database,
      items: ["MySQL", "Redis"],
    },

    Security: {
      label: "Security",
      icon: ShieldCheck,
      items: ["Laravel Sanctum (SPA)", "Oauth2.0"],
    },
    externalServices: {
      label: "External Services",
      icon: Package,
      items: ["Brevo"],
    },
  },
  architecture: {
    image: "/projects/inventory_pos_img/System Architecture_pos.svg",
    description:
      "This POS and Inventory Management System uses a three tier layered architecture with an MVC based backend, keeping each component clean and focused. The React and TypeScript frontend communicates with the API, where Routes, Controllers, Services, and Models handle requests and business logic in separate layers. Redis provides fast caching while MySQL manages persistent data, with external services handled independently. This clear separation creates an organized data flow and makes the system easier to maintain, scale, and develop.",
  },
  features: [
    {
      image: "/projects/inventory_pos_img/POS.svg",
      title: "Barcode & QR-Powered POS Checkout",
      description:
        "Accelerate register traffic with rapid barcode and QR code scanning, instantly updating stock counts while seamlessly handling split payments and dynamic discounts.",
    },
    {
      image: "/projects/inventory_pos_img/inventory - batchstock.svg",
      title: "Real-Time Batch & Stock Tracking",
      description:
        "Maintain total inventory precision across registers with live multi-outlet sync, automated low-stock warnings, and velocity-based reorder suggestions.",
    },
    {
      image: "/projects/inventory_pos_img/Stock Movement-audittracking.svg",
      title: "Inventory Movement & Audit",
      description:
        "Track inventory activity including stock additions, deductions, transfers, adjustments, and expiration movements with a complete history for better visibility and accountability.",
    },
    {
      image: "/projects/inventory_pos_img/Expiration.svg",
      title: "Proactive Expiration & Shelf-Life Tracking",
      description:
        "Protect profit margins by automatically tracking batch expiration dates, triggering early clearance workflows and alerts before inventory goes to waste.",
    },
    {
      image: "/projects/inventory_pos_img/ManageBranchAndAccount.svg",
      title: "Branch & Access Management",
      description:
        "Manage multiple branches and user accounts with centralized control over branch information, user access, and account permissions.",
    },
  ],
};

export default function InventoryPosProjectPage() {
  return <ProjectLayout project={PROJECT} />;
}
