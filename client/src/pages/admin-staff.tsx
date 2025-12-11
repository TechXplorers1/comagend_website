import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import AdminLayout from "@/components/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import type { Staff, InsertStaff } from "@shared/schema";

export default function AdminStaff() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  const initialForm: InsertStaff = {
    name: "",
    role: "",
    image: "",
    bio: "",
    email: "",
    linkedin: "",
    twitter: "",
    isActive: true,
  };

  const [form, setForm] = useState<InsertStaff>(initialForm);

  const { data: staff, isLoading } = useQuery<Staff[]>({
    queryKey: ["/api/staff"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertStaff) => {
      await apiRequest("POST", "/api/staff", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      toast({ title: "Success", description: "Staff member created." });
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertStaff> }) => {
      await apiRequest("PATCH", `/api/staff/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      toast({ title: "Success", description: "Staff member updated." });
      setIsDialogOpen(false);
      setEditingStaff(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/staff/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff"] });
      toast({ title: "Deleted", description: "Staff member removed." });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const openCreate = () => {
    setEditingStaff(null);
    setForm(initialForm);
    setIsDialogOpen(true);
  };

  const openEdit = (staffMember: Staff) => {
    setEditingStaff(staffMember);
    setForm({
      name: staffMember.name,
      role: staffMember.role,
      image: staffMember.image,
      bio: staffMember.bio,
      email: staffMember.email ?? "",
      linkedin: staffMember.linkedin ?? "",
      twitter: staffMember.twitter ?? "",
      isActive: staffMember.isActive === null ? true : staffMember.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStaff) {
      updateMutation.mutate({ id: editingStaff.id, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staff</h1>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" /> Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>
                {editingStaff ? "Edit Staff Member" : "Add New Staff Member"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="role">Role / Title</Label>
                <Input
                  id="role"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  required
                />
              </div>

              <div>
                <ImageUpload
                  label="Profile Image"
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                />
              </div>

              <div>
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea
                  id="bio"
                  value={form.bio ?? ""}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-3 pt-2">
                <Label>Social Links (Optional)</Label>
                <div className="grid grid-cols-1 gap-3">
                  <Input
                    placeholder="Email Address"
                    value={form.email ?? ""}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <Input
                    placeholder="LinkedIn URL"
                    value={form.linkedin ?? ""}
                    onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  />
                  <Input
                    placeholder="Twitter/X URL"
                    value={form.twitter ?? ""}
                    onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="isActive"
                  type="checkbox"
                  checked={form.isActive ?? true}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="isActive">Show on About Page</Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editingStaff ? "Update Staff" : "Create Staff"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : staff?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-muted-foreground"
                >
                  No staff members found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              staff?.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${member.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                      {member.isActive ? "Active" : "Hidden"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(member)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this staff member?"
                            )
                          ) {
                            deleteMutation.mutate(member.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
