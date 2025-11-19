import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import { format } from "date-fns";

import blogImage from "@assets/generated_images/Adult_literacy_project_showcase_171ac1d0.png";

export default function Blog() {
  // --- SAMPLE DATA (replace with API data when needed) ---
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Empowering Women through Rural Education Programs",
      category: "Education",
      excerpt:
        "Our rural education initiative is unlocking opportunities for young women by providing access to quality learning...",
      content: `Access to education transforms lives, especially for women in rural areas.
      
Our program focuses on:
• Adult literacy classes  
• Digital skill training  
• Scholarships for girls  

These women are now running small businesses, joining local councils, and inspiring others to dream bigger.

One participant, Amina, says:  
“Education gave me the power to stand up for my rights and help other women.”

This initiative will be extended to 3 more villages in the coming months.`,
      readTime: 5,
      publishedAt: "2025-02-10T10:00:00Z",
    },
    {
      id: 2,
      title: "Health Camps Reached 4,200 Families Last Month",
      category: "Health",
      excerpt:
        "Mobile health camps are bringing critical medical services to remote communities...",
      content: `In remote regions where hospitals are far away, our mobile health camps are a lifesaver.

Last month alone:
• 4,200 families served  
• 800 children vaccinated  
• 350 prenatal checkups  

Volunteer doctors, nurses, and local health workers are making a tremendous difference.

Our next goal: Provide basic medical insurance to 1,000 families.`,
      readTime: 4,
      publishedAt: "2025-02-05T08:00:00Z",
    },
    {
      id: 3,
      title: "Youth Leadership Program Expands Nationwide",
      category: "Youth",
      excerpt:
        "The youth leadership initiative is now active in 12 districts with over 600 participants...",
      content: `Tomorrow's leaders are being shaped today.

The Youth Leadership Program trains students in:
• Public speaking  
• Community organizing  
• Problem-solving  
• Entrepreneurship  

65% of participants have already launched local initiatives like clean water projects, tutoring centers, and youth clubs.`,
      readTime: 3,
      publishedAt: "2025-02-01T07:30:00Z",
    },
  ];

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [scrollPositionBeforeOpen, setScrollPositionBeforeOpen] = useState(0);

  const handleOpenPost = (post: BlogPost) => {
    // Remember where user was
    setScrollPositionBeforeOpen(window.scrollY);
    // Scroll to top when opening
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedPost(post);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
    // Scroll back to where user was
    window.scrollTo({ top: scrollPositionBeforeOpen, behavior: "smooth" });
  };

  const categories = [
    "All",
    "Education",
    "Youth",
    "Health",
    "Empowerment",
    "Gender",
    "Development",
  ];

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
                Our Stories & Insights
              </h1>
              <p className="font-sans text-lg md:text-xl text-muted-foreground">
                Impact stories, updates, and insights from our field work
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog List Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Categories Filter (UI only for now) */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="px-4 py-2 cursor-pointer font-sans"
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Blog Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <Card className="hover-elevate active-elevate-2 overflow-hidden flex flex-col">
                    {/* Slightly smaller image */}
                    <div className="relative h-40 md:h-48 overflow-hidden">
                      <motion.img
                        src={blogImage}
                        alt={post.title}
                        className="w-full h-full object-cover object-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <Badge className="absolute top-3 left-3">
                        {post.category}
                      </Badge>
                    </div>

                    <CardContent className="p-6 flex-1">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {format(
                              new Date(post.publishedAt),
                              "MMMM dd, yyyy"
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                      <h3 className="font-heading text-xl font-semibold mb-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground">{post.excerpt}</p>
                    </CardContent>

                    <CardFooter className="p-6 pt-0">
                      <Button
                        variant="ghost"
                        className="group font-sans font-medium p-0 h-auto hover:bg-transparent"
                        onClick={() => handleOpenPost(post)}
                      >
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Article Popup with scrollbar & back behavior */}
      <Dialog
        open={!!selectedPost}
        onOpenChange={(open) => {
          if (!open) handleClosePost();
        }}
      >
        <DialogContent className="max-w-3xl w-full p-0 overflow-hidden">
          {selectedPost && (
            <div className="flex flex-col max-h-[90vh]">
              {/* Image (fixed area, no scroll) */}
              <div className="relative h-48 md:h-56 w-full overflow-hidden flex-shrink-0">
                <img
                  src={blogImage}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover object-center"
                />
                <Badge className="absolute top-3 left-3">
                  {selectedPost.category}
                </Badge>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <DialogHeader>
                  <DialogTitle className="text-2xl md:text-3xl font-heading">
                    {selectedPost.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(
                        new Date(selectedPost.publishedAt),
                        "MMMM dd, yyyy"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{selectedPost.readTime} min read</span>
                  </div>
                </div>

                {/* FULL CONTENT */}
                <div className="space-y-4 text-muted-foreground leading-relaxed font-sans">
                  {selectedPost.content.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Back button */}
                <div className="mt-6 flex justify-end">
                  <Button
                    variant="outline"
                    className="font-sans"
                    onClick={handleClosePost}
                  >
                    ← Back to Articles
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
