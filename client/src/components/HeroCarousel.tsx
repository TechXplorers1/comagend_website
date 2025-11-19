import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Program } from "@shared/schema";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-fade";

import heroImage1 from "@assets/generated_images/Hero_community_empowerment_scene_3c5019a0.png";
import heroImage2 from "@assets/generated_images/Gender_equality_workshop_hero_9359228b.png";
import heroImage3 from "@assets/generated_images/Youth_education_hero_image_45adaae5.png";

// map DB program titles → hero images
const programHeroImages: Record<string, string> = {
  "Women's Economic Empowerment": heroImage1,
  "Community Health Initiatives": heroImage2,
  "Youth Development & Education": heroImage3,
};

// fallback slides if API not loaded yet / empty
const fallbackSlides = [
  {
    title: "Empowering Communities",
    subtitle:
      "Building a future of gender equality and sustainable development across Africa",
    image: heroImage1,
    programPath: "#programs",
  },
  {
    title: "Gender Equality for All",
    subtitle:
      "Creating opportunities and advocating for women's rights in every community",
    image: heroImage2,
    programPath: "#programs",
  },
  {
    title: "Youth Development",
    subtitle:
      "Investing in the next generation through education and skills training",
    image: heroImage3,
    programPath: "#programs",
  },
];

export default function HeroCarousel() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // 🔹 Load real programs from API (same data ProgramDetail uses)
  const { data: programs } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });

  // build hero slides from programs if available
  const programSlides =
    programs && programs.length > 0
      ? // use first 3 programs (or change logic as you like)
        programs.slice(0, 3).map((program) => ({
          title: program.title, // same title as ProgramDetail
          subtitle: program.description, // use DB description under the heading
          image:
            programHeroImages[program.title] ??
            heroImage1, // default image if not mapped
          programPath: `/programs/${program.id}`, // ProgramDetail route
        }))
      : null;

  const slidesToRender = programSlides && programSlides.length > 0
    ? programSlides
    : fallbackSlides;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        navigation={false}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-white/50",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
        }}
        autoplay={
          prefersReducedMotion
            ? false
            : { delay: 5000, disableOnInteraction: false }
        }
        speed={prefersReducedMotion ? 0 : 450}
        onSwiper={setSwiper}
        onSlideChange={(swiperInstance) =>
          setActiveIndex(swiperInstance.activeIndex)
        }
        className="h-full"
      >
        {slidesToRender.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10" />

              <motion.img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: activeIndex === index ? 1 : 1.1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-4">
                  <motion.div
                    className="max-w-3xl"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{
                      opacity: activeIndex === index ? 1 : 0,
                      x: activeIndex === index ? 0 : -50,
                    }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.45,
                      delay: prefersReducedMotion ? 0 : 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <motion.h2
                      className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 md:mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: activeIndex === index ? 1 : 0,
                        y: activeIndex === index ? 0 : 20,
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.45,
                        delay: prefersReducedMotion ? 0 : 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {slide.title}
                    </motion.h2>

                    <motion.p
                      className="font-sans text-lg md:text-xl text-white/90 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: activeIndex === index ? 1 : 0,
                        y: activeIndex === index ? 0 : 20,
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.45,
                        delay: prefersReducedMotion ? 0 : 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: activeIndex === index ? 1 : 0,
                        y: activeIndex === index ? 0 : 20,
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.45,
                        delay: prefersReducedMotion ? 0 : 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {/* Primary: scroll to programs */}
                      <Button
                        size="lg"
                        variant="default"
                        className="font-sans font-medium text-base"
                        asChild
                        data-testid="button-hero-primary"
                      >
                        <a href="#programs">Our Programs</a>
                      </Button>

                      {/* Secondary: go to this specific program detail */}
                      <Button
                        size="lg"
                        variant="outline"
                        className="font-sans font-medium text-base bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                        asChild
                        data-testid="button-hero-secondary"
                      >
                        <a href={slide.programPath}>Learn More</a>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => swiper?.slidePrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-3 transition-all"
        data-testid="button-hero-prev"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={() => swiper?.slideNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-3 transition-all"
        data-testid="button-hero-next"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
