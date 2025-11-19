import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  Award,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import projectImage from "@assets/generated_images/Adult_literacy_project_showcase_171ac1d0.png";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Women's Literacy & Skills Development",
      category: "Education",
      description:
        "A comprehensive program providing adult literacy classes and vocational skills training to women in rural communities, enabling economic independence and community leadership.",
      image: projectImage,
      stats: {
        duration: "2022 - Present",
        beneficiaries: "5,000+ women",
        partners: "Local Education Authority, Women's Cooperative",
        outcomes:
          "85% participants now literate, 60% started small businesses",
      },
    },
    {
      id: 2,
      title: "Youth Leadership Academy",
      category: "Youth Development",
      description:
        "An intensive leadership and entrepreneurship training program for young people aged 18-25, equipping them with skills to become change-makers in their communities.",
      image: projectImage,
      stats: {
        duration: "2021 - Present",
        beneficiaries: "2,500+ youth",
        partners: "University Partnership, Business Incubators",
        outcomes:
          "200+ youth-led initiatives launched, 75% employment rate",
      },
    },
    {
      id: 3,
      title: "Community Health Champions",
      category: "Health",
      description:
        "Training community health volunteers to provide essential healthcare education and services in underserved areas, improving health outcomes and awareness.",
      image: projectImage,
      stats: {
        duration: "2020 - Present",
        beneficiaries: "25,000+ community members",
        partners: "Ministry of Health, Local Clinics",
        outcomes:
          "40% reduction in preventable diseases, 150 trained health volunteers",
      },
    },
  ];

  const galleryImages = [
    projectImage,
    projectImage,
    projectImage,
    projectImage,
    projectImage,
    projectImage,
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

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
      prev !== null
        ? prev === galleryImages.length - 1
          ? 0
          : prev + 1
        : prev
    );
  };

  // Keyboard support: Esc, arrow left/right
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") showPrevImage();
      if (e.key === "ArrowRight") showNextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

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
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
                Our Projects
              </h1>
              <p className="font-sans text-lg md:text-xl text-muted-foreground">
                Transforming communities through sustainable development
                initiatives
              </p>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Card className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${
                        index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                      }`}
                    >
                      {/* Image section */}
                      <div
                        className={`relative h-56 md:h-64 lg:h-72 ${
                          index % 2 === 1 ? "lg:col-start-2" : ""
                        }`}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary/95 text-primary-foreground px-3 py-1 rounded-full text-xs md:text-sm font-sans font-semibold shadow-md">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Content section */}
                      <div
                        className={`p-8 md:p-12 flex flex-col justify-center space-y-4 ${
                          index % 2 === 1 ? "lg:col-start-1" : ""
                        }`}
                      >
                        <h2 className="font-heading font-bold text-2xl md:text-3xl">
                          {project.title}
                        </h2>
                        <p className="font-sans text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>

                        <Card className="bg-muted/60 p-6 border-0 rounded-2xl shadow-inner">
                          <h3 className="font-heading font-semibold text-lg mb-4">
                            Project Overview
                          </h3>
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <Calendar className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-sans font-medium text-sm">
                                  Duration
                                </p>
                                <p className="font-sans text-sm text-muted-foreground">
                                  {project.stats.duration}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Users className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-sans font-medium text-sm">
                                  Beneficiaries
                                </p>
                                <p className="font-sans text-sm text-muted-foreground">
                                  {project.stats.beneficiaries}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Award className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="font-sans font-medium text-sm">
                                  Partners
                                </p>
                                <p className="font-sans text-sm text-muted-foreground">
                                  {project.stats.partners}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Card>

                        <div className="pt-2">
                          <h4 className="font-heading font-semibold text-base mb-1">
                            Key Outcomes
                          </h4>
                          <p className="font-sans text-sm text-muted-foreground">
                            {project.stats.outcomes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Impact in Action
              </h2>
              <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
                Visual stories from our projects showcasing the transformation
                happening in communities.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-xl group cursor-pointer aspect-[4/3] max-h-52 bg-background/40 border border-border/60 shadow-sm hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.02, translateY: -4 }}
                  onClick={() => handleImageClick(index)}
                  data-testid={`gallery-image-${index}`}
                >
                  <img
                    src={image}
                    alt={`Project gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1">
                    <p className="text-white font-sans font-semibold tracking-wide text-sm uppercase">
                      View Image
                    </p>
                    <span className="text-xs text-white/80">
                      Click to expand
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImageIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="relative max-w-5xl w-full mx-4 p-4 md:p-6 bg-background/90 rounded-2xl shadow-2xl border border-border/60"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full bg-black/70 hover:bg-black/90 p-2 border border-white/20 transition-colors"
                >
                  <X className="h-4 w-4 text-white" />
                </button>

                {/* Navigation arrows */}
                <button
                  onClick={showPrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-black/70 hover:bg-black/90 p-3 border border-white/20 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={showNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-black/70 hover:bg-black/90 p-3 border border-white/20 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>

                {/* Image */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full max-h-[70vh] flex items-center justify-center">
                    <img
                      src={galleryImages[selectedImageIndex]}
                      alt={`Full view ${selectedImageIndex + 1}`}
                      className="w-full max-h-[70vh] object-contain rounded-xl"
                    />
                  </div>

                  {/* Caption / Info */}
                  <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm font-sans text-muted-foreground">
                    <span>
                      Image {selectedImageIndex + 1} of {galleryImages.length}
                    </span>
                    <span className="text-xs md:text-sm">
                      Tip: Use ← → keys or swipe (on touchpad) to navigate
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
