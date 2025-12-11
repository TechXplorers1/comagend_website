import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import type { SiteConfig } from "@shared/schema";

export default function AdminSettings() {
    const { toast } = useToast();
    const [formData, setFormData] = useState<Partial<SiteConfig>>({});

    const { data: config, isLoading } = useQuery<SiteConfig>({
        queryKey: ["/api/site-config"],
    });

    useEffect(() => {
        if (config) {
            setFormData(config);
        }
    }, [config]);

    const updateMutation = useMutation({
        mutationFn: async (data: Partial<SiteConfig>) => {
            await apiRequest("PATCH", "/api/site-config", data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/site-config"] });
            toast({ title: "Success", description: "Settings updated successfully." });
        },
        onError: (error: Error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateMutation.mutate(formData);
    };

    const handleChange = (field: keyof SiteConfig, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Site Settings</h1>

                <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-md border">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold border-b pb-2">Contact Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    value={formData.email || ""}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    value={formData.phone || ""}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="address">Physical Address</Label>
                            <Input
                                id="address"
                                value={formData.address || ""}
                                onChange={(e) => handleChange("address", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold border-b pb-2">About & Mission</h2>

                        <div>
                            <Label htmlFor="about">About Us Text</Label>
                            <Textarea
                                id="about"
                                rows={4}
                                value={formData.aboutText || ""}
                                onChange={(e) => handleChange("aboutText", e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="mission">Mission Statement</Label>
                            <Textarea
                                id="mission"
                                rows={3}
                                value={formData.missionText || ""}
                                onChange={(e) => handleChange("missionText", e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="vision">Vision Statement</Label>
                            <Textarea
                                id="vision"
                                rows={3}
                                value={formData.visionText || ""}
                                onChange={(e) => handleChange("visionText", e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold border-b pb-2">Social Media</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="facebook">Facebook URL</Label>
                                <Input
                                    id="facebook"
                                    value={formData.facebookUrl || ""}
                                    onChange={(e) => handleChange("facebookUrl", e.target.value)}
                                    placeholder="https://facebook.com/..."
                                />
                            </div>
                            <div>
                                <Label htmlFor="instagram">Instagram URL</Label>
                                <Input
                                    id="instagram"
                                    value={formData.instagramUrl || ""}
                                    onChange={(e) => handleChange("instagramUrl", e.target.value)}
                                    placeholder="https://instagram.com/..."
                                />
                            </div>
                            <div>
                                <Label htmlFor="twitter">Twitter/X URL</Label>
                                <Input
                                    id="twitter"
                                    value={formData.twitterUrl || ""}
                                    onChange={(e) => handleChange("twitterUrl", e.target.value)}
                                    placeholder="https://twitter.com/..."
                                />
                            </div>
                            <div>
                                <Label htmlFor="linkedin">LinkedIn URL</Label>
                                <Input
                                    id="linkedin"
                                    value={formData.linkedinUrl || ""}
                                    onChange={(e) => handleChange("linkedinUrl", e.target.value)}
                                    placeholder="https://linkedin.com/..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" size="lg" disabled={updateMutation.isPending}>
                            {updateMutation.isPending && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
