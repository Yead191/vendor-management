export interface Feature {
  id: string;
  name: string;
  description?: string;
}

export interface Plan {
  id?: number;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  isPopular: boolean;
  features: Feature[];
  buttonText: string;
  buttonColor: "primary" | "secondary" | "success" | "warning";
  featureTitle: string
}

export const mockPlans: Plan[] = [
  {
    id: 1,
    name: "Creator",
    description:
      "Unlock powerful AI tools to create your content, wherever you work online.",
    monthlyPrice: 19,
    annualPrice: 190,
    isPopular: false,
    buttonText: "Choose Plan",
    buttonColor: "primary",
    featureTitle: "Everything in basic, Plus & Business",
    features: [
      { id: "1", name: "01 User Access" },
      { id: "2", name: "Access to Fiora AI Chatbot" },
      { id: "3", name: "Access to SEO Mode" },
      { id: "4", name: "AI Image Generation and editing Tool" },
      { id: "5", name: "03 Brand Voice Access" },
      { id: "6", name: "Use AI with Browser Extension" },
    ],
  },
  {
    id: 2,
    name: "Pro Plan",
    description:
      "Leverage advanced AI to create content for multiple brands or campaigns.",
    monthlyPrice: 99,
    annualPrice: 990,
    isPopular: true,
    buttonText: "Switch to this Plan",
    buttonColor: "primary",
    featureTitle: "Everything in pro, Plus & Business",
    features: [
      { id: "7", name: "05 User Access", description: "Unlimited Access" },
      { id: "8", name: "10 Knowledge Assets" },
      { id: "9", name: "Access to Pro SEO Mode" },
      { id: "10", name: "Collaboration with our Management" },
      { id: "11", name: "10 Brand Voice Access" },
      { id: "12", name: "01 Page Custom change Access" },
    ],
  },
  {
    id: 3,
    name: "Business Plan",
    description:
      "Personalized AI with enhanced controls, security, team training, and tech support.",
    monthlyPrice: 199,
    annualPrice: 1990,
    isPopular: false,
    buttonText: "Choose Plan",
    buttonColor: "success",
    featureTitle: "Everything in enterprise, Plus & Business",
    features: [
      { id: "13", name: "Unlimited Feature Usage" },
      { id: "14", name: "Performance Analytics & Insights" },
      { id: "15", name: "Custom Style Guides with New View" },
      { id: "16", name: "Advanced Admin Panel Access" },
      { id: "17", name: "Group Document Collaboration" },
      { id: "18", name: "High Security Platform" },
    ],
  },
];
