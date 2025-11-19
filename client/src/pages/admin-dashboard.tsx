// client/src/pages/admin-dashboard.tsx

import { useQuery } from "@tanstack/react-query";
import type { Program, BlogPost, ContactMessage } from "@shared/schema";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AdminDashboard() {  // 👈 DEFAULT EXPORT
  const { data: programs, isLoading: isProgramsLoading } = useQuery<Program[]>({
    queryKey: ["/api/programs"],
  });

  const { data: blogPosts, isLoading: isBlogLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const { data: contactMessages, isLoading: isContactsLoading } = useQuery<
    ContactMessage[]
  >({
    queryKey: ["/api/contact"],
  });

  const totalPrograms = programs?.length ?? 0;
  const totalBlogPosts = blogPosts?.length ?? 0;
  const totalContacts = contactMessages?.length ?? 0;

  return (
    <AdminLayout>
      {/* Top stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Programs"
          value={isProgramsLoading ? undefined : totalPrograms.toString()}
          description="Active community programs"
        />
        <StatCard
          label="Blog Posts"
          value={isBlogLoading ? undefined : totalBlogPosts.toString()}
          description="Stories & insights published"
        />
        <StatCard
          label="Contact Messages"
          value={isContactsLoading ? undefined : totalContacts.toString()}
          description="Enquiries from website"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Programs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-semibold">
              Recent Programs
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">
              View all
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            {isProgramsLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : programs && programs.length > 0 ? (
              <ul className="space-y-3">
                {programs.slice(0, 5).map((program) => (
                  <li
                    key={program.id}
                    className="flex items-start justify-between gap-3 text-sm"
                  >
                    <div>
                      <p className="font-medium">{program.title}</p>
                      <p className="text-muted-foreground text-xs">
                        {program.category}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No programs found yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Contact Messages */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-semibold">
              Latest Contact Messages
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">
              View all
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            {isContactsLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ) : contactMessages && contactMessages.length > 0 ? (
              <ul className="space-y-3">
                {contactMessages.slice(0, 5).map((msg) => (
                  <li
                    key={msg.id}
                    className="border-b last:border-none pb-2 last:pb-0 text-sm"
                  >
                    <p className="font-medium">{msg.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {msg.email} · {msg.subject}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No contact messages yet.
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
}: {
  label: string;
  value?: string;
  description: string;
}) {
  return (
    <Card>
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
}
