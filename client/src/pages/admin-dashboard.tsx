// client/src/pages/admin-dashboard.tsx

import { useQuery } from "@tanstack/react-query";
import type { Program, BlogPost, Staff, Project, ContactMessage } from "@shared/schema";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function AdminDashboard() {
  const { data: programs, isLoading: isProgramsLoading, error: programsError } =
    useQuery<Program[]>({
      queryKey: ["/api/programs"],
    });

  const { data: blogPosts, isLoading: isBlogLoading, error: blogError } =
    useQuery<BlogPost[]>({
      queryKey: ["/api/blog"],
    });

  const { data: staff, isLoading: isStaffLoading, error: staffError } =
    useQuery<Staff[]>({
      queryKey: ["/api/staff"],
    });

  const { data: projects, isLoading: isProjectsLoading, error: projectsError } =
    useQuery<Project[]>({
      queryKey: ["/api/projects"],
    });

  const { data: messages, isLoading: isMessagesLoading } =
    useQuery<ContactMessage[]>({
      queryKey: ["/api/contact-messages"],
    });

  const totalPrograms = programs?.length ?? 0;
  const totalBlogPosts = blogPosts?.length ?? 0;
  const totalStaff = staff?.length ?? 0;
  const totalProjects = projects?.length ?? 0;
  const totalMessages = messages?.length ?? 0;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Top stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard
          label="Programs"
          value={isProgramsLoading ? undefined : totalPrograms.toString()}
          description="Active programs"
          href="/admin/programs"
        />
        <StatCard
          label="Projects"
          value={isProjectsLoading ? undefined : totalProjects.toString()}
          description="Impact projects"
          href="/admin/projects"
        />
        <StatCard
          label="Blog Posts"
          value={isBlogLoading ? undefined : totalBlogPosts.toString()}
          description="Published articles"
          href="/admin/blog"
        />
        <StatCard
          label="Team"
          value={isStaffLoading ? undefined : totalStaff.toString()}
          description="Staff members"
          href="/admin/staff"
        />
        <StatCard
          label="Messages"
          value={isMessagesLoading ? undefined : totalMessages.toString()}
          description="Inbox messages"
          href="/admin/contacts"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Recent Programs */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Recent Programs
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <Link href="/admin/programs">
                <span className="flex items-center cursor-pointer">
                  View all
                  <ArrowRight className="h-3 w-3 ml-1" />
                </span>
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {isProgramsLoading ? (
              <SkeletonList />
            ) : programsError ? (
              <p className="text-sm text-destructive">
                Failed to load programs.
              </p>
            ) : programs && programs.length > 0 ? (
              <ul className="space-y-3 pt-2">
                {programs.slice(0, 3).map((program) => (
                  <li
                    key={program.id}
                    className="flex items-start justify-between gap-3 text-sm p-3 rounded-md bg-muted/40"
                  >
                    <div>
                      <p className="font-medium">{program.title}</p>
                      <p className="text-muted-foreground text-xs mt-1">
                        {program.category}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground py-4">
                No programs found yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Projects */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Recent Projects
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <Link href="/admin/projects">
                <span className="flex items-center cursor-pointer">
                  View all
                  <ArrowRight className="h-3 w-3 ml-1" />
                </span>
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {isProjectsLoading ? (
              <SkeletonList />
            ) : projectsError ? (
              <p className="text-sm text-destructive">
                Failed to load projects.
              </p>
            ) : projects && projects.length > 0 ? (
              <ul className="space-y-3 pt-2">
                {projects.slice(0, 3).map((project) => (
                  <li key={project.id} className="text-sm p-3 rounded-md bg-muted/40 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {project.category}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground py-4">
                No projects created yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Messages - New Section */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">
              Recent Messages
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <Link href="/admin/contacts">
                <span className="flex items-center cursor-pointer">
                  View all
                  <ArrowRight className="h-3 w-3 ml-1" />
                </span>
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {isMessagesLoading ? (
              <SkeletonList />
            ) : messages && messages.length > 0 ? (
              <ul className="space-y-3 pt-2">
                {messages.slice(0, 3).map((msg) => (
                  <li key={msg.id} className="text-sm p-3 rounded-md bg-muted/40">
                    <div className="flex justify-between">
                      <p className="font-medium">{msg.name}</p>
                      <span className="text-xs text-muted-foreground">{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {msg.subject}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground py-4">
                No messages received yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

function StatCard({
  label,
  value,
  description,
  href
}: {
  label: string;
  value?: string;
  description: string;
  href?: string;
}) {
  const Content = (
    <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {value === undefined ? (
          <Skeleton className="h-7 w-16" />
        ) : (
          <p className="text-2xl font-heading font-bold">{value}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );

  return href ? <Link href={href}>{Content}</Link> : Content;
}

function SkeletonList() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}
