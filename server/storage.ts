import {
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type ContactMessage,
  type InsertContactMessage,
  type BlogPost,
  type Program,
  type Story,
  type InsertProgram,
  type InsertBlogPost,
  type SiteConfig,
  type InsertSiteConfig,
  type Project,
  type InsertProject,
  type Staff,
  type InsertStaff,
  type Donation,
  type InsertDonation,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  deleteContactMessage(id: string): Promise<void>;
  getAllBlogPosts(): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;
  getAllPrograms(): Promise<Program[]>;
  createProgram(program: InsertProgram): Promise<Program>;
  updateProgram(id: string, program: Partial<InsertProgram>): Promise<Program>;
  deleteProgram(id: string): Promise<void>;
  getAllStories(): Promise<Story[]>;

  // Site Config
  getSiteConfig(): Promise<SiteConfig>;
  updateSiteConfig(config: Partial<InsertSiteConfig>): Promise<SiteConfig>;

  // Projects
  getAllProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: string): Promise<void>;

  // Staff
  getAllStaff(): Promise<Staff[]>;
  createStaff(staff: InsertStaff): Promise<Staff>;
  updateStaff(id: string, staff: Partial<InsertStaff>): Promise<Staff>;
  deleteStaff(id: string): Promise<void>;

  // Donations
  getAllDonations(): Promise<Donation[]>;
  createDonation(donation: InsertDonation): Promise<Donation>;
}

export class MemStorage implements IStorage {
  private newsletterSubscriptions: Map<string, NewsletterSubscription>;
  private contactMessages: Map<string, ContactMessage>;
  private blogPosts: Map<string, BlogPost>;
  private programs: Map<string, Program>;
  private stories: Map<string, Story>;
  private projects: Map<string, Project>;
  private staff: Map<string, Staff>;
  private donations: Map<string, Donation>;
  private siteConfig: SiteConfig;

  constructor() {
    this.newsletterSubscriptions = new Map();
    this.contactMessages = new Map();
    this.blogPosts = new Map();
    this.programs = new Map();
    this.stories = new Map();
    this.projects = new Map();
    this.staff = new Map();
    this.donations = new Map();
    this.siteConfig = {
      id: "default",
      email: "info@comagend.org",
      phone: "+1 234 567 890",
      address: "123 Charity Lane, Cityville, Country",
      aboutText: "COMAGEND is dedicated to empowering communities through sustainable development.",
      missionText: "To create lasting change by empowering individuals and communities.",
      visionText: "A world where every community thrives with dignity and opportunity.",
      facebookUrl: "",
      instagramUrl: "",
      twitterUrl: "",
      linkedinUrl: "",
    };
    this.seedData();
  }

  private seedData() {
    const blogImage = "https://via.placeholder.com/800x600/5A381F/FFFFFF?text=Blog+Post";
    const programImage1 = "https://via.placeholder.com/600x400/5A381F/FFFFFF?text=Women+Empowerment";
    const programImage2 = "https://via.placeholder.com/600x400/5A381F/FFFFFF?text=Youth+Development";
    const programImage3 = "https://via.placeholder.com/600x400/5A381F/FFFFFF?text=Health+Initiatives";

    const blogPosts: BlogPost[] = [
      {
        id: randomUUID(),
        title: "Breaking Barriers: How Women's Literacy Programs Transform Communities",
        excerpt: "Discover the powerful impact of adult literacy programs in empowering women and creating ripple effects of change across entire communities.",
        content: "Full content here...",
        image: blogImage,
        category: "Education",
        readTime: 5,
        publishedAt: new Date("2024-03-15"),
      },
      {
        id: randomUUID(),
        title: "Youth Leadership: Nurturing the Next Generation of Change-Makers",
        excerpt: "Our youth leadership academy is creating a new generation of community leaders equipped with skills and vision for sustainable development.",
        content: "Full content here...",
        image: blogImage,
        category: "Youth",
        readTime: 4,
        publishedAt: new Date("2024-03-10"),
      },
      {
        id: randomUUID(),
        title: "Community Health Champions: A Model for Sustainable Healthcare",
        excerpt: "How training local health volunteers is creating sustainable healthcare access in underserved communities.",
        content: "Full content here...",
        image: blogImage,
        category: "Health",
        readTime: 6,
        publishedAt: new Date("2024-03-05"),
      },
    ];

    const programs: Program[] = [
      {
        id: randomUUID(),
        title: "Women's Economic Empowerment",
        description: "Supporting women entrepreneurs through skills training, microfinance, and market access to build sustainable livelihoods.",
        image: programImage1,
        category: "Economic Development",
      },
      {
        id: randomUUID(),
        title: "Youth Development & Education",
        description: "Providing quality education, mentorship, and vocational training to empower the next generation of leaders.",
        image: programImage2,
        category: "Education",
      },
      {
        id: randomUUID(),
        title: "Community Health Initiatives",
        description: "Improving access to healthcare services and health education in underserved communities across the region.",
        image: programImage3,
        category: "Health",
      },
    ];

    const stories: Story[] = [
      {
        id: randomUUID(),
        name: "Sarah Nakato",
        role: "Program Beneficiary",
        quote: "COMAGEND's women's empowerment program gave me the skills and confidence to start my own business. Today, I employ five women from my community.",
        image: "https://via.placeholder.com/100x100/5A381F/FFFFFF?text=SN",
      },
      {
        id: randomUUID(),
        name: "James Okello",
        role: "Community Leader",
        quote: "The youth development initiatives have transformed our community. Our young people now have hope and opportunities for a better future.",
        image: "https://via.placeholder.com/100x100/5A381F/FFFFFF?text=JO",
      },
      {
        id: randomUUID(),
        name: "Grace Achieng",
        role: "Health Volunteer",
        quote: "Through COMAGEND's health programs, we've been able to reach remote villages and provide essential healthcare services to those who need it most.",
        image: "https://via.placeholder.com/100x100/5A381F/FFFFFF?text=GA",
      },
    ];

    const projects: Project[] = [
      {
        id: randomUUID(),
        title: "Women's Literacy & Skills Development",
        category: "Education",
        description:
          "A comprehensive program providing adult literacy classes and vocational skills training to women in rural communities, enabling economic independence and community leadership.",
        image: "https://images.pexels.com/photos/1181401/pexels-photo-1181401.jpeg?auto=compress&cs=tinysrgb&w=800",
        duration: "2022 - Present",
        beneficiaries: "5,000+ women",
        partners: "Local Education Authority, Women's Cooperative",
        outcomes: "85% participants now literate, 60% started small businesses",
      },
      {
        id: randomUUID(),
        title: "Youth Leadership Academy",
        category: "Youth Development",
        description:
          "An intensive leadership and entrepreneurship training program for young people aged 18-25, equipping them with skills to become change-makers in their communities.",
        image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800",
        duration: "2021 - Present",
        beneficiaries: "2,500+ youth",
        partners: "University Partnership, Business Incubators",
        outcomes: "200+ youth-led initiatives launched, 75% employment rate",
      },
      {
        id: randomUUID(),
        title: "Community Health Champions",
        category: "Health",
        description:
          "Training community health volunteers to provide essential healthcare education and services in underserved areas, improving health outcomes and awareness.",
        image: "https://images.pexels.com/photos/6129201/pexels-photo-6129201.jpeg?auto=compress&cs=tinysrgb&w=800",
        duration: "2020 - Present",
        beneficiaries: "25,000+ community members",
        partners: "Ministry of Health, Local Clinics",
        outcomes:
          "40% reduction in preventable diseases, 150 trained health volunteers",
      },
    ];

    const staffMembers: Staff[] = [
      {
        id: randomUUID(),
        name: "Dr. Amina Kabila",
        role: "Executive Director",
        bio: "Leading COMAGEND with 15+ years of experience in community development and gender advocacy.",
        image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800",
        email: "amina@comagend.org",
        linkedin: "#",
        twitter: "#",
        isActive: true,
      },
      {
        id: randomUUID(),
        name: "Robert Mensah",
        role: "Program Coordinator",
        bio: "Coordinating our youth development initiatives across multiple regions with proven impact.",
        image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800",
        email: "robert@comagend.org",
        linkedin: "#",
        twitter: "#",
        isActive: true,
      },
      {
        id: randomUUID(),
        name: "Grace Omondi",
        role: "Community Outreach Lead",
        bio: "Bridging the gap between our programs and the communities we serve with passion and dedication.",
        image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=800",
        email: "grace@comagend.org",
        linkedin: "#",
        twitter: "#",
        isActive: true,
      },
    ];

    blogPosts.forEach(post => this.blogPosts.set(post.id, post));
    programs.forEach(program => this.programs.set(program.id, program));
    stories.forEach(story => this.stories.set(story.id, story));
    projects.forEach(project => this.projects.set(project.id, project));
    staffMembers.forEach(staff => this.staff.set(staff.id, staff));
  }

  async createNewsletterSubscription(
    insertSubscription: InsertNewsletterSubscription
  ): Promise<NewsletterSubscription> {
    const existing = await this.getNewsletterSubscriptionByEmail(insertSubscription.email);
    if (existing) {
      throw new Error("Email already subscribed");
    }

    const id = randomUUID();
    const subscription: NewsletterSubscription = {
      ...insertSubscription,
      id,
      subscribedAt: new Date(),
    };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }

  async getNewsletterSubscriptionByEmail(
    email: string
  ): Promise<NewsletterSubscription | undefined> {
    return Array.from(this.newsletterSubscriptions.values()).find(
      (sub) => sub.email === email
    );
  }

  async createContactMessage(
    insertMessage: InsertContactMessage
  ): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async deleteContactMessage(id: string): Promise<void> {
    this.contactMessages.delete(id);
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async createBlogPost(insertPost: any): Promise<BlogPost> {
    const id = randomUUID();
    const post: BlogPost = {
      ...insertPost,
      id,
      publishedAt: new Date(),
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: string, updatePost: Partial<any>): Promise<BlogPost> {
    const existing = this.blogPosts.get(id);
    if (!existing) throw new Error("Blog post not found");
    const updated = { ...existing, ...updatePost };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<void> {
    this.blogPosts.delete(id);
  }

  async getAllPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async createProgram(insertProgram: any): Promise<Program> {
    const id = randomUUID();
    const program: Program = {
      ...insertProgram,
      id,
    };
    this.programs.set(id, program);
    return program;
  }

  async updateProgram(id: string, updateProgram: Partial<any>): Promise<Program> {
    const existing = this.programs.get(id);
    if (!existing) throw new Error("Program not found");
    const updated = { ...existing, ...updateProgram };
    this.programs.set(id, updated);
    return updated;
  }

  async deleteProgram(id: string): Promise<void> {
    this.programs.delete(id);
  }

  async getAllStories(): Promise<Story[]> {
    return Array.from(this.stories.values());
  }

  // Site Config
  async getSiteConfig(): Promise<SiteConfig> {
    return this.siteConfig;
  }

  async updateSiteConfig(config: Partial<InsertSiteConfig>): Promise<SiteConfig> {
    this.siteConfig = { ...this.siteConfig, ...config };
    return this.siteConfig;
  }

  // Projects
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = {
      id,
      title: insertProject.title,
      category: insertProject.category,
      description: insertProject.description,
      image: insertProject.image,
      duration: insertProject.duration,
      beneficiaries: insertProject.beneficiaries,
      partners: insertProject.partners,
      outcomes: insertProject.outcomes,
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, updateProject: Partial<InsertProject>): Promise<Project> {
    const existing = this.projects.get(id);
    if (!existing) throw new Error("Project not found");
    const updated = { ...existing, ...updateProject };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: string): Promise<void> {
    this.projects.delete(id);
  }

  // Staff
  async getAllStaff(): Promise<Staff[]> {
    return Array.from(this.staff.values());
  }

  async createStaff(insertStaff: InsertStaff): Promise<Staff> {
    const id = randomUUID();
    const staff: Staff = {
      id,
      name: insertStaff.name,
      role: insertStaff.role,
      bio: insertStaff.bio,
      image: insertStaff.image,
      email: insertStaff.email ?? null,
      linkedin: insertStaff.linkedin ?? null,
      twitter: insertStaff.twitter ?? null,
      isActive: insertStaff.isActive ?? true,
    };
    this.staff.set(id, staff);
    return staff;
  }

  async updateStaff(id: string, updateStaff: Partial<InsertStaff>): Promise<Staff> {
    const existing = this.staff.get(id);
    if (!existing) throw new Error("Staff member not found");
    const updated = { ...existing, ...updateStaff };
    this.staff.set(id, updated);
    return updated;
  }

  async deleteStaff(id: string): Promise<void> {
    this.staff.delete(id);
  }

  // Donations
  async getAllDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values()).sort(
      (a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = randomUUID();
    const donation: Donation = {
      id,
      amount: insertDonation.amount,
      donorEmail: insertDonation.donorEmail,
      program: insertDonation.program,
      donorName: insertDonation.donorName ?? null,
      createdAt: new Date(),
    };
    this.donations.set(id, donation);
    return donation;
  }
}

export const storage = new MemStorage();
