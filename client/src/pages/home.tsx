// client/src/pages/home.tsx

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import StatsSection from "@/components/StatsSection";
import ProgramsSection from "@/components/ProgramsSection";
import StoriesSection from "@/components/StoriesSection";
import { DonateSection } from "@/components/DonateSection";
import ScrollToTopButton from "@/components/ScrollToTopButton";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { HandHeart, Users, Handshake, CheckCircle } from "lucide-react";
import type { InsertDonation, InsertContactMessage } from "@shared/schema";
import { insertContactMessageSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function Home() {
  const { toast } = useToast();

  // Donation popup
  const [donationProgram, setDonationProgram] =
    useState<InsertDonation["program"]>("general");
  const [isDonationDialogOpen, setIsDonationDialogOpen] = useState(false);

  // Volunteer popup
  const [isVolunteerDialogOpen, setIsVolunteerDialogOpen] = useState(false);
  const [volunteerSuccess, setVolunteerSuccess] = useState(false);

  const volunteerForm = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "I’d like to volunteer with COMAGEND",
      message: "",
    },
  });

  const volunteerMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setVolunteerSuccess(true);
      toast({
        title: "Thank you for volunteering!",
        description: "Our team will contact you within 24 hours.",
      });
      volunteerForm.reset({
        name: "",
        email: "",
        subject: "I’d like to volunteer with COMAGEND",
        message: "",
      });
      setTimeout(() => setVolunteerSuccess(false), 3000);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.message ||
          "Failed to submit your volunteer interest. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleVolunteerSubmit = (data: InsertContactMessage) => {
    volunteerMutation.mutate(data);
  };

  // Partner popup
  const [isPartnerDialogOpen, setIsPartnerDialogOpen] = useState(false);
  const [partnerSuccess, setPartnerSuccess] = useState(false);

  const partnerForm = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "I’d like to partner with COMAGEND",
      message: "",
    },
  });

  const partnerMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setPartnerSuccess(true);
      toast({
        title: "Thank you for your interest in partnering!",
        description: "We’ll get back to you with partnership options soon.",
      });
      partnerForm.reset({
        name: "",
        email: "",
        subject: "I’d like to partner with COMAGEND",
        message: "",
      });
      setTimeout(() => setPartnerSuccess(false), 3000);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.message ||
          "Failed to submit your partnership enquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handlePartnerSubmit = (data: InsertContactMessage) => {
    partnerMutation.mutate(data);
  };

  const ctaCards = [
    {
      icon: HandHeart,
      title: "Support Our Cause",
      description:
        "Your contribution helps us create lasting change in communities across Africa.",
      cta: "Make a Difference",
      color: "bg-chart-2/10",
    },
    {
      icon: Users,
      title: "Volunteer With Us",
      description:
        "Join our team of dedicated volunteers and directly impact lives in your community.",
      cta: "Join Our Team",
      color: "bg-chart-3/10",
    },
    {
      icon: Handshake,
      title: "Partner With Us",
      description:
        "Collaborate with COMAGEND to amplify our impact and reach more communities.",
      cta: "Become a Partner",
      color: "bg-chart-4/10",
    },
  ];

  // Button handlers → open dialogs
  const handleSupportOurCauseClick = () => {
    setDonationProgram("general");
    setIsDonationDialogOpen(true);
  };

  const handleVolunteerClick = () => {
    setIsVolunteerDialogOpen(true);
  };

  const handlePartnerClick = () => {
    setIsPartnerDialogOpen(true);
  };

  const handleGetInvolvedTodayClick = () => {
    document
      .getElementById("get-involved-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <main>
        <HeroCarousel />
        <StatsSection />
        <ProgramsSection />

        {/* How You Can Help */}
        <section
          id="get-involved-section"
          className="py-16 md:py-24 bg-background"
        >
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                How You Can Help
              </h2>
              <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
                There are many ways to support our mission and make a meaningful
                difference in the lives of those we serve.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {ctaCards.map((card, index) => {
                const Icon = card.icon;
                const isSupportOurCause = card.title === "Support Our Cause";
                const isVolunteer = card.title === "Volunteer With Us";
                const isPartner = card.title === "Partner With Us";

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Card className="p-8 text-center h-full flex flex-col hover-elevate active-elevate-2 transition-all">
                      <div
                        className={`inline-flex p-4 rounded-lg ${card.color} mx-auto mb-6`}
                      >
                        <Icon className="h-8 w-8 text-foreground" />
                      </div>
                      <h3 className="font-heading font-semibold text-xl mb-3">
                        {card.title}
                      </h3>
                      <p className="font-sans text-muted-foreground mb-6 flex-1">
                        {card.description}
                      </p>
                      <Button
                        variant="default"
                        className="font-sans font-medium w-full"
                        data-testid={`button-cta-${index}`}
                        onClick={
                          isSupportOurCause
                            ? handleSupportOurCauseClick
                            : isVolunteer
                            ? handleVolunteerClick
                            : isPartner
                            ? handlePartnerClick
                            : undefined
                        }
                      >
                        {card.cta}
                      </Button>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <StoriesSection />

        {/* Volunteer Form – Popup */}
        <Dialog
          open={isVolunteerDialogOpen}
          onOpenChange={setIsVolunteerDialogOpen}
        >
          <DialogContent className="w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">
                Volunteer With COMAGEND
              </DialogTitle>
              <DialogDescription className="font-sans text-base">
                Share a few details about yourself and how you’d like to help.
                Our team will reach out with next steps.
              </DialogDescription>
            </DialogHeader>

            <Form {...volunteerForm}>
              <form
                onSubmit={volunteerForm.handleSubmit(handleVolunteerSubmit)}
                className="space-y-6 mt-4"
              >
                <FormField
                  control={volunteerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans font-medium">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your name"
                          className="font-sans"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={volunteerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="you@example.com"
                          className="font-sans"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={volunteerForm.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans font-medium">
                        Subject
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="font-sans" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={volunteerForm.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans font-medium">
                        How would you like to volunteer?
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={5}
                          placeholder="Tell us about your skills, availability, and areas of interest…"
                          className="font-sans resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-sans font-medium"
                  disabled={volunteerMutation.isPending}
                >
                  {volunteerMutation.isPending ? (
                    <span className="flex items-center">
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                      Submitting...
                    </span>
                  ) : volunteerSuccess ? (
                    <span className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Thank you!
                    </span>
                  ) : (
                    "Submit Volunteer Interest"
                  )}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Partner Form – Popup */}
        <Dialog
          open={isPartnerDialogOpen}
          onOpenChange={setIsPartnerDialogOpen}
        >
          <DialogContent className="w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">
                Partner With COMAGEND
              </DialogTitle>
              <DialogDescription className="font-sans text-base">
                Whether you’re an NGO, company, or institution, we’d love to
                explore how we can work together to expand our impact.
              </DialogDescription>
            </DialogHeader>

            <Form {...partnerForm}>
              <form
                onSubmit={partnerForm.handleSubmit(handlePartnerSubmit)}
                className="space-y-6 mt-4"
              >
                <FormField
                  control={partnerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans font-medium">
                        Organization / Contact Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your organization or full name"
                          className="font-sans"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={partnerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans font-medium">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="you@example.com"
                          className="font-sans"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={partnerForm.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans font-medium">
                        Subject
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="font-sans" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={partnerForm.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans font-medium">
                        Partnership Details
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={5}
                          placeholder="Tell us about your organization, what kind of partnership you’re interested in, and how we can collaborate."
                          className="font-sans resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-sans font-medium"
                  disabled={partnerMutation.isPending}
                >
                  {partnerMutation.isPending ? (
                    <span className="flex items-center">
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                      Submitting...
                    </span>
                  ) : partnerSuccess ? (
                    <span className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Thank you!
                    </span>
                  ) : (
                    "Submit Partnership Enquiry"
                  )}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Donation – Popup */}
        <Dialog
          open={isDonationDialogOpen}
          onOpenChange={setIsDonationDialogOpen}
        >
          <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto p-0">
            <DonateSection initialProgram={donationProgram} />
          </DialogContent>
        </Dialog>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="font-sans text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
                Join us in our mission to empower communities and create
                sustainable change across Africa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-sans font-medium"
                  data-testid="button-cta-get-involved"
                  onClick={handleGetInvolvedTodayClick}
                >
                  Get Involved Today
                </Button>

                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-sans font-medium bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                    data-testid="button-cta-learn-more"
                  >
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
}
