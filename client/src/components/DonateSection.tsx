// client/src/components/DonateSection.tsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertDonationSchema, type InsertDonation } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Loader2 } from "lucide-react";

const presetAmounts = [500, 1000, 2500, 5000];

type DonateSectionProps = {
  initialProgram?: InsertDonation["program"]; // "general" | "education" | "nutrition" | "healthcare"
};

export function DonateSection({ initialProgram }: DonateSectionProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const { toast } = useToast();

  const form = useForm<InsertDonation>({
    resolver: zodResolver(insertDonationSchema),
    defaultValues: {
      amount: 0,
      donorName: "",
      donorEmail: "",
      program: initialProgram ?? "general",
    },
  });

  useEffect(() => {
    if (initialProgram) {
      form.setValue("program", initialProgram);
    }
  }, [initialProgram, form]);

  const mutation = useMutation({
    mutationFn: async (data: InsertDonation) => {
      const finalAmount = selectedAmount || parseInt(customAmount) || 0;
      return await apiRequest("POST", "/api/donation", {
        ...data,
        amount: finalAmount,
      });
    },
    onSuccess: (response: any) => {
      toast({
        title: "Donation initiated successfully!",
        description: `Donation ID: ${response.data.donationId}. In production, this would redirect to Stripe payment.`,
      });
      form.reset();
      setSelectedAmount(null);
      setCustomAmount("");
    },
    onError: (error: any) => {
      toast({
        title: "Donation failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertDonation) => {
    const finalAmount = selectedAmount || parseInt(customAmount) || 0;
    if (finalAmount < 1) {
      toast({
        title: "Invalid amount",
        description: "Please select or enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate(data);
  };

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    form.setValue("amount", amount);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    const numValue = parseInt(value) || 0;
    form.setValue("amount", numValue);
  };

  return (
    <section id="donate" className="py-16 md:py-24 scroll-mt-16">
      <div className="container px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Make a Difference Today
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your generous donation helps us provide education, nutrition, and
            hope to thousands of children
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <CreditCard className="h-6 w-6 text-primary" />
              Donation Form
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* amount */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">
                    Select Amount (₹)
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {presetAmounts.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={
                          selectedAmount === amount ? "default" : "outline"
                        }
                        onClick={() => handlePresetClick(amount)}
                        className="h-12"
                        data-testid={`button-preset-${amount}`}
                      >
                        ₹{amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                  <Input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="h-12"
                    data-testid="input-custom-amount"
                  />
                </div>

                {/* program */}
                <FormField
                  control={form.control}
                  name="program"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Support a Program (Optional)
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                        >
                          {[
                            { value: "general", label: "Where Most Needed" },
                            { value: "education", label: "Education" },
                            { value: "nutrition", label: "Nutrition" },
                            { value: "healthcare", label: "Healthcare" },
                          ].map((option) => (
                            <div
                              key={option.value}
                              className="flex items-center space-x-2"
                            >
                              <RadioGroupItem
                                value={option.value}
                                id={option.value}
                                data-testid={`radio-program-${option.value}`}
                              />
                              <Label
                                htmlFor={option.value}
                                className="cursor-pointer"
                              >
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* name */}
                <FormField
                  control={form.control}
                  name="donorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your name"
                          data-testid="input-donor-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* email */}
                <FormField
                  control={form.control}
                  name="donorEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="your.email@example.com"
                          data-testid="input-donor-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-semibold"
                  disabled={mutation.isPending}
                  data-testid="button-proceed-donation"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Proceed to Payment"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Donations are tax-deductible under Section 80G. You'll receive
                  a receipt via email.
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
