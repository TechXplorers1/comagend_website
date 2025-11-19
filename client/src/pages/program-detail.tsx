import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Program, InsertDonation } from "@shared/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { DonateSection } from "@/components/DonateSection";

import programImage1 from "@assets/generated_images/Women_economic_empowerment_program_d8422519.png";
import programImage2 from "@assets/generated_images/Youth_development_program_ecd0f2bd.png";
import programImage3 from "@assets/generated_images/Community_health_program_b7634ba0.png";

const programImages: Record<string, string> = {
  "Women's Economic Empowerment": programImage1,
  "Youth Development & Education": programImage2,
  "Community Health Initiatives": programImage3,
};

// Map title → donation program enum
const titleToDonationProgram: Record<string, InsertDonation["program"]> = {
  "Women's Economic Empowerment": "general",
  "Youth Development & Education": "education",
  "Community Health Initiatives": "healthcare",
};

// Extra content per program (long description, objectives, impact, stats)
type ProgramExtra = {
  longDescription: string;
  objectives: string[];
  impactAreas: string[];
  stats: { label: string; value: string }[];
};

const defaultExtra: ProgramExtra = {
  longDescription:
    "This program is designed to create sustainable, community-led change through training, advocacy, and direct support. We work closely with local leaders and beneficiaries to ensure every activity responds to real needs on the ground.",
  objectives: [
    "Provide targeted support to the most vulnerable community members",
    "Build local capacity through training and mentorship",
    "Create sustainable systems that continue beyond project funding",
  ],
  impactAreas: [
    "Community awareness and mobilization",
    "Partnerships with local organizations",
    "Long-term resilience and self-reliance",
  ],
  stats: [
    { label: "People Reached", value: "1,500+" },
    { label: "Communities", value: "10+" },
    { label: "Active Projects", value: "3" },
  ],
};

const programExtraByTitle: Record<string, ProgramExtra> = {
  "Women's Economic Empowerment": {
    longDescription:
      "The Women’s Economic Empowerment Program supports women to start and grow small businesses, access savings and credit, and build the confidence to participate in decision-making at home and in the community. We combine practical business skills with rights awareness and peer support groups.",
    objectives: [
      "Train women in basic business, marketing, and financial management",
      "Increase access to savings groups and small loans",
      "Strengthen women’s leadership and voice in household and community decisions",
    ],
    impactAreas: [
      "Income generation and livelihoods",
      "Financial inclusion and savings culture",
      "Women’s rights and leadership",
    ],
    stats: [
      { label: "Women Trained", value: "800+" },
      { label: "Businesses Started", value: "250+" },
      { label: "Savings Groups", value: "35" },
    ],
  },
  "Youth Development & Education": {
    longDescription:
      "Our Youth Development & Education Program invests in the next generation through tutoring, life-skills training, and mentorship. We help young people stay in school, discover their talents, and transition into decent work opportunities.",
    objectives: [
      "Improve learning outcomes and school retention",
      "Equip youth with life skills and digital literacy",
      "Connect young people to mentorship, internships, and job pathways",
    ],
    impactAreas: [
      "After-school tutoring and remedial classes",
      "Digital skills and career guidance",
      "Youth leadership and peer-to-peer mentoring",
    ],
    stats: [
      { label: "Students Reached", value: "1,200+" },
      { label: "Scholarships", value: "95" },
      { label: "Youth Clubs", value: "20" },
    ],
  },
  "Community Health Initiatives": {
    longDescription:
      "The Community Health Initiatives Program focuses on preventive health, maternal and child care, and access to basic services. We train community health volunteers, run outreach clinics, and link families to local health facilities.",
    objectives: [
      "Increase awareness of key health and hygiene practices",
      "Support mothers and children with essential health services",
      "Strengthen community linkages with health facilities and providers",
    ],
    impactAreas: [
      "Health education and awareness campaigns",
      "Maternal and child health support",
      "Water, sanitation, and hygiene (WASH)",
    ],
    stats: [
      { label: "People Reached", value: "2,000+" },
      { label: "Health Sessions", value: "150+" },
      { label: "Community Volunteers", value: "60+" },
    ],
  },
};

type ProgramDetailProps = {
  id: string;
};

export default function ProgramDetail({ id }: ProgramDetailProps) {
  // Reuse /api/programs list and find the one we need
  const { data: programs, isLoading, error } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });

  const program = programs?.find((p) => p.id === id);

  const image =
    program && programImages[program.title]
      ? programImages[program.title]
      : programImage1;

  const donationProgram: InsertDonation["program"] =
    titleToDonationProgram[program?.title || ""] ?? "general";

  const extra: ProgramExtra =
    (program && programExtraByTitle[program.title]) || defaultExtra;

  const [showDonationForm, setShowDonationForm] = useState(false);

  // Scroll handler – works every time you click the button
  const handleSupportClick = () => {
    if (!showDonationForm) {
      setShowDonationForm(true);
    }
    setTimeout(() => {
      document
        .getElementById("donate")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back link */}
          <div className="mb-6">
            <Link href="/#programs">
              <Button
                variant="ghost"
                size="sm"
                className="inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Programs
              </Button>
            </Link>
          </div>

          {isLoading ? (
            // ⏳ Loading skeleton
            <div className="grid md:grid-cols-2 gap-10">
              <Skeleton className="w-full h-72" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ) : error || !program ? (
            // ❌ Error or not found
            <div className="text-center py-20">
              <p className="font-sans text-muted-foreground mb-4">
                Unable to load this program.
              </p>
              <Link href="/#programs">
                <Button>Back to Programs</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* ✅ Program header content */}
              <div className="grid md:grid-cols-2 gap-10 items-start">
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="overflow-hidden rounded-xl shadow-md">
                    <img
                      src={image}
                      alt={program.title}
                      className="w-full h-72 md:h-96 object-cover"
                    />
                  </div>
                </motion.div>

                {/* Text content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                    {program.category}
                  </span>

                  <h1 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                    {program.title}
                  </h1>

                  <p className="font-sans text-muted-foreground text-lg mb-4">
                    {program.description}
                  </p>

                  {/* Long description */}
                  <p className="font-sans text-foreground/90 mb-6">
                    {extra.longDescription}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button
                      size="lg"
                      className="font-sans font-medium"
                      onClick={handleSupportClick}
                    >
                      Support This Program
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="font-sans font-medium"
                    >
                      Volunteer With Us
                    </Button>
                  </div>
                </motion.div>
              </div>

              {/* Quick stats */}
              <section className="mt-12">
                <h2 className="font-heading font-semibold text-2xl mb-4">
                  Program Snapshot
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {extra.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border bg-card p-4 shadow-sm"
                    >
                      <p className="text-sm font-sans text-muted-foreground mb-1">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-heading font-bold">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Objectives & impact areas */}
              <section className="mt-12 grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading font-semibold text-xl mb-3">
                    Key Objectives
                  </h3>
                  <ul className="list-disc list-inside space-y-2 font-sans text-foreground/90">
                    {extra.objectives.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-heading font-semibold text-xl mb-3">
                    Impact Areas
                  </h3>
                  <ul className="list-disc list-inside space-y-2 font-sans text-foreground/90">
                    {extra.impactAreas.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Donation form appears only when button clicked */}
              {showDonationForm && (
                <div className="mt-16">
                  <DonateSection initialProgram={donationProgram} />
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
