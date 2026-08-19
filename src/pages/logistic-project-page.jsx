import { Code2, Server, Database, Package, ShieldCheck } from "lucide-react";
import ProjectLayout from "@/components/layout/project-layout.jsx";

const PROJECT = {
  sectionId: "works",
  title: "Order Fulfillment and Delivery Management System",
  eyebrow: "Full-Stack Web Application",
  description:
    "A full-stack order fulfillment and delivery management platform developed for Koolwater, a mineral water refilling business. The system connects customer ordering, delivery scheduling, order fulfillment, dispatch, routing, inventory, fleet operations, and returnable container management into a centralized platform. It provides dedicated workflows for customers, administrators, and drivers, allowing each role to manage the parts of the delivery lifecycle relevant to them.",
  liveUrl: "#",
  heroImage: "/projects/logistics_img/main_logistics.svg",
  githubUrl: "",
  techStack: {
    frontend: {
      label: "Frontend",
      icon: Code2,
      items: [
        "ReactJs",
        "TypeScript",
        "Framer-motion",
        "Shadcn UI",
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
      items: ["Laravel Sanctum (SPA)", "OAuth 2.0"],
    },

    externalServices: {
      label: "External Services",
      icon: Package,
      items: ["Brevo", "LocationIQ", "PayMongo", "Leaflet"],
    },
  },

  architecture: {
    image: "/projects/logistics_img/System Architecture_logistic.svg",
    description:
      "The system follows a multi-application, API-driven architecture designed around three primary user roles: Customer, Administrator, and Driver. Each role has its own React-based frontend application tailored to its specific workflow, while all applications communicate with a centralized Laravel backend through REST APIs over HTTPS. The backend acts as the central business and data layer, handling authentication, order processing, delivery workflows, dispatch operations, inventory, returnable containers, routing, and other core business logic. MySQL serves as the primary relational database for persistent application data, while Redis provides caching to improve the retrieval of frequently accessed information. The backend also communicates with external services for online payments, email notifications, geolocation, and interactive mapping. This separation keeps the user interfaces, business logic, data layer, and third-party integrations organized while allowing the Customer, Admin, and Driver applications to operate independently while sharing the same centralized backend.",
  },

  features: [
    {
      title: "Customer Ordering & Delivery Scheduling",
      description:
        "Allows customers to browse available products, place orders, select delivery schedules, monitor order status, and manage their delivery-related requests.",
    },
    {
      title: "Order Fulfillment Management",
      description:
        "Manages the order lifecycle from customer placement and confirmation through fulfillment, dispatch, delivery, and completion.",
    },
    {
      title: "Delivery Dispatch",
      description:
        "Allows administrators to organize delivery operations by assigning delivery tasks to available drivers and vehicles based on scheduled orders.",
    },
    {
      title: "Driver Operations",
      description:
        "Provides drivers with a dedicated interface for viewing assigned deliveries, managing delivery tasks, and updating delivery statuses while on the field.",
    },
    {
      title: "Route & Location Management",
      description:
        "Supports delivery planning and location-based operations using mapping and geolocation services to manage customer destinations and delivery routes.",
    },
    {
      title: "Returnable Container Management",
      description:
        "Tracks reusable water containers throughout their operational lifecycle, including available, borrowed, returned, damaged, and other relevant statuses.",
    },
    {
      title: "Customer Borrowed Container Tracking",
      description:
        "Maintains records of containers currently borrowed by customers, including quantities and return status, helping the business monitor outstanding containers.",
    },
    {
      title: "Scheduled Returnable Pickups",
      description:
        "Allows returnable containers to be scheduled for pickup and included in driver operations alongside regular delivery activities.",
    },
    {
      title: "Inventory & Product Management",
      description:
        "Provides centralized management of products and stock to support accurate product availability and order fulfillment.",
    },
    {
      title: "Vehicle & Driver Management",
      description:
        "Allows administrators to manage delivery drivers, vehicles, assignments, and operational availability.",
    },
    {
      title: "Online Payment Integration",
      description:
        "Integrates PayMongo to support online payment processing and payment-related order workflows.",
    },
    {
      title: "Email Notifications",
      description:
        "Uses Brevo to deliver transactional notifications related to orders and other important system events.",
    },
  ],
};

export default function OrderFulfillmentProjectPage() {
  return <ProjectLayout project={PROJECT} />;
}
