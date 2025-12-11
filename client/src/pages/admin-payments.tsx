import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import type { Donation } from "@shared/schema";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function AdminPayments() {
    const { data: donations, isLoading } = useQuery<Donation[]>({
        queryKey: ["/api/donations"],
    });

    const totalAmount = donations?.reduce((sum, d) => sum + d.amount, 0) || 0;

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Payments (Donations)</h1>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            Total funds raised
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Donation Count</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{donations?.length || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            Number of successful donations
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Donor Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Program</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8">
                                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        ) : donations?.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="text-center py-8 text-muted-foreground"
                                >
                                    No donations found yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            donations?.map((donation) => (
                                <TableRow key={donation.id}>
                                    <TableCell>
                                        {new Date(donation.createdAt!).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {donation.donorName || "Anonymous"}
                                    </TableCell>
                                    <TableCell>{donation.donorEmail}</TableCell>
                                    <TableCell className="capitalize">{donation.program}</TableCell>
                                    <TableCell className="text-right font-medium">
                                        ₹{donation.amount.toLocaleString()}
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
