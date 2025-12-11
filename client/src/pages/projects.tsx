import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, Users, Award, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";

import projectImage from "@assets/generated_images/Adult_literacy_project_showcase_171ac1d0.png";

export default function Projects() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const galleryImages = [
    projectImage,
    projectImage,
    projectImage,
    projectImage,
    projectImage,
    projectImage,
    projectImage,
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const showPrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev === 0 ? galleryImages.length - 1 : prev - 1) : prev
    );
  };

  const showNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev !== null ? (prev === galleryImages.length - 1 ? 0 : prev + 1) : prev
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 pt-24 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
                Our Projects
              </h1>
              <p className="font-sans text-lg md:text-xl text-muted-foreground">
                Transforming communities through sustainable development initiatives
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {projects?.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No projects found.
                </div>
              ) : (
                projects?.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.1,
                    }}
                  >
                    <Card className="overflow-hidden shadow-lg">
                      <div
                        className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                          }`}
                      >
                        {/* Full Image Section */}
                        <div
                          className={`relative w-full lg:min-h-[450px] ${index % 2 === 1 ? "lg:col-start-2" : ""
                            }`}
                        >
                          <img
                            src={project.image || projectImage}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute top-6 left-6">
                            <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div
                          className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:col-start-1" : ""
                            }`}
                        >
                          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                            {project.title}
                          </h2>
                          <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                            {project.description}
                          </p>

                          <Card className="bg-muted/40 p-6 mb-6 border-0 rounded-lg">
                            <h3 className="font-heading font-semibold text-lg mb-4">
                              Project Overview
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-start space-x-3">
                                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <p className="font-medium text-sm">Duration</p>
                                  <p className="text-sm text-muted-foreground">
                                    {project.duration}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <Users className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <p className="font-medium text-sm">Beneficiaries</p>
                                  <p className="text-sm text-muted-foreground">
                                    {project.beneficiaries}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <Award className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                  <p className="font-medium text-sm">Partners</p>
                                  <p className="text-sm text-muted-foreground">
                                    {project.partners}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Card>

                          <div>
                            <h4 className="font-heading font-semibold mb-2">
                              Key Outcomes
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {project.outcomes}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
