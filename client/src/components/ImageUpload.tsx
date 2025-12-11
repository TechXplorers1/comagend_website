import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    className?: string;
}

export default function ImageUpload({
    value,
    onChange,
    label = "Upload Image",
    className,
}: ImageUploadProps) {
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast({
                title: "Invalid file type",
                description: "Please upload an image file (PNG, JPG, etc.)",
                variant: "destructive",
            });
            return;
        }

        // Validate file size (e.g., 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: "File too large",
                description: "Image size should be less than 5MB",
                variant: "destructive",
            });
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        setIsUploading(true);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload image");
            }

            const data = await response.json();
            onChange(data.url);
            toast({
                title: "Success",
                description: "Image uploaded successfully",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to upload image",
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemove = () => {
        onChange("");
    };

    return (
        <div className={className}>
            <Label>{label}</Label>
            <div className="mt-2 flex flex-col gap-4">
                {value ? (
                    <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-md border bg-muted">
                        <img
                            src={value}
                            alt="Uploaded"
                            className="h-full w-full object-cover"
                        />
                        <Button
                            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            size="icon"
                            variant="default"
                            onClick={handleRemove}
                            type="button"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex w-full items-center gap-2">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={isUploading}
                            className="cursor-pointer file:cursor-pointer"
                        />
                    </div>
                )}
                {isUploading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Uploading...
                    </div>
                )}
            </div>
        </div>
    );
}
