export default async function SellerDashboard() {
  return <div>SellerDashboard Page</div>;
}

// "use client";

// import { useState } from "react";
// import {
//   DollarSign,
//   FileCheck,
//   Box,
//   Users,
//   TrendingUp,
//   AlertTriangle,
//   UserPlus,
//   Pill,
//   Download,
//   PlusCircle,
//   MoreHorizontal,
//   ArrowUpRight,
//   ChevronLeft,
//   ChevronRight,
//   Search,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const KPI_DATA = [
//   {
//     label: "Revenue",
//     value: "$48,294",
//     change: "+12.5%",
//     trend: "up",
//     icon: DollarSign,
//     color: "bg-accent text-primary",
//   },
//   {
//     label: "Prescriptions",
//     value: "384",
//     change: "+8.2%",
//     trend: "up",
//     icon: FileCheck,
//     color: "bg-secondary/10 text-secondary",
//   },
//   {
//     label: "Low Stock",
//     value: "12",
//     change: "Needs Action",
//     trend: "warning",
//     icon: Box,
//     color: "bg-warning/10 text-warning",
//   },
//   {
//     label: "New Patients",
//     value: "124",
//     change: "+4.3%",
//     trend: "up",
//     icon: Users,
//     color: "bg-muted text-muted-foreground",
//   },
// ];

// const ALERTS = [
//   {
//     title: "New Patient Added",
//     desc: "ID #P-4920 registered.",
//     time: "2 mins ago",
//     icon: UserPlus,
//     color: "bg-accent text-primary border-primary/10",
//   },
//   {
//     title: "Stock Alert: Amoxicillin",
//     desc: "Inventory below 50 units.",
//     time: "45 mins ago",
//     icon: Pill,
//     color: "bg-secondary/10 text-secondary border-secondary/10",
//   },
//   {
//     title: "Rx Expiration Warning",
//     desc: "Batch #992 expires in 7 days.",
//     time: "2 hours ago",
//     icon: AlertTriangle,
//     color: "bg-destructive/10 text-destructive border-destructive/10",
//   },
// ];

// const ORDERS = [
//   {
//     id: "#RX-001",
//     patient: "John Doe",
//     initials: "JD",
//     date: "Oct 24, 2023",
//     amount: "$120.00",
//     status: "Fulfilled",
//   },
//   {
//     id: "#RX-002",
//     patient: "Alice Smith",
//     initials: "AS",
//     date: "Oct 24, 2023",
//     amount: "$85.50",
//     status: "Pending",
//   },
//   {
//     id: "#RX-003",
//     patient: "Robert King",
//     initials: "RK",
//     date: "Oct 23, 2023",
//     amount: "$420.00",
//     status: "Rejected",
//   },
// ];

// export default function DashboardPage() {
//   const [modalOpen, setModalOpen] = useState(false);

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       {/* Page Header */}
//       <div className="mb-8 sm:flex sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold tracking-tight text-foreground">
//             Pharmacy Overview
//           </h1>
//           <p className="mt-1 text-sm text-muted-foreground">
//             Monitor daily sales, inventory levels, and patient activity.
//           </p>
//         </div>
//         <div className="mt-4 flex gap-3 sm:mt-0">
//           <Button variant="outline" className="gap-2">
//             <Download className="h-[18px] w-[18px]" />
//             Export
//           </Button>

//           <Dialog open={modalOpen} onOpenChange={setModalOpen}>
//             <DialogTrigger asChild>
//               <Button className="gap-2">
//                 <PlusCircle className="h-[18px] w-[18px]" />
//                 New Entry
//               </Button>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-[425px]">
//               <DialogHeader>
//                 <DialogTitle className="flex items-center gap-2">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-primary">
//                     <Pill className="h-5 w-5" />
//                   </div>
//                   Add New Entry
//                 </DialogTitle>
//                 <DialogDescription>
//                   Enter the details for the new medicine entry below.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-4 py-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="name" className="text-xs">
//                     Drug Name
//                   </Label>
//                   <Input id="name" placeholder="e.g. Lisinopril" />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="grid gap-2">
//                     <Label htmlFor="price" className="text-xs">
//                       Price
//                     </Label>
//                     <div className="relative">
//                       <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
//                         $
//                       </span>
//                       <Input
//                         id="price"
//                         type="number"
//                         className="pl-6"
//                         placeholder="0.00"
//                       />
//                     </div>
//                   </div>
//                   <div className="grid gap-2">
//                     <Label htmlFor="qty" className="text-xs">
//                       Quantity
//                     </Label>
//                     <Input id="qty" type="number" placeholder="0" />
//                   </div>
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="category" className="text-xs">
//                     Category
//                   </Label>
//                   <Select>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="antibiotics">Antibiotics</SelectItem>
//                       <SelectItem value="analgesics">Analgesics</SelectItem>
//                       <SelectItem value="cardiovascular">
//                         Cardiovascular
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button variant="outline" onClick={() => setModalOpen(false)}>
//                   Cancel
//                 </Button>
//                 <Button onClick={() => setModalOpen(false)}>Save Entry</Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </div>

//       {/* KPI Cards */}
//       <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         {KPI_DATA.map((kpi) => (
//           <Card key={kpi.label} className="card-hover">
//             <CardContent className="p-5">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
//                     {kpi.label}
//                   </p>
//                   <h3 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
//                     {kpi.value}
//                   </h3>
//                 </div>
//                 <div className={`rounded-lg p-2 ${kpi.color}`}>
//                   <kpi.icon className="h-5 w-5" />
//                 </div>
//               </div>
//               <div className="mt-4 flex items-center text-xs">
//                 {kpi.trend === "up" ? (
//                   <span className="flex items-center gap-1 rounded bg-success/10 px-1.5 py-0.5 font-medium text-success">
//                     <ArrowUpRight className="h-3 w-3" />
//                     {kpi.change}
//                   </span>
//                 ) : (
//                   <span className="flex items-center gap-1 rounded bg-warning/10 px-1.5 py-0.5 font-medium text-warning">
//                     <AlertTriangle className="h-3 w-3" />
//                     {kpi.change}
//                   </span>
//                 )}
//                 <span className="ml-2 text-muted-foreground">
//                   {kpi.trend === "warning"
//                     ? "Items below threshold"
//                     : "vs last month"}
//                 </span>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
//         {/* Chart Area */}
//         <Card className="lg:col-span-2 shadow-sm">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
//             <CardTitle className="text-base font-semibold">
//               Sales Trends
//             </CardTitle>
//             <div className="flex gap-2">
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 className="h-7 px-3 text-xs bg-muted text-muted-foreground hover:bg-muted/80"
//               >
//                 7D
//               </Button>
//               <Button size="sm" className="h-7 px-3 text-xs shadow-sm">
//                 30D
//               </Button>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 className="h-7 px-3 text-xs bg-muted text-muted-foreground hover:bg-muted/80"
//               >
//                 1Y
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent>
//             {/* CSS Bar Chart Simulation */}
//             <div className="mt-4 flex h-64 items-end justify-between gap-2 sm:gap-4">
//               {[40, 65, 50, 85, 60, 75, 90].map((height, i) => (
//                 <div
//                   key={i}
//                   className={`group relative w-full rounded-t-sm transition-all hover:bg-primary/20 ${i === 6 ? "bg-primary shadow-md shadow-primary/20" : "bg-accent"}`}
//                   style={{ height: `${height}%` }}
//                 >
//                   <div
//                     className={`absolute -top-8 left-1/2 -translate-x-1/2 rounded border border-border bg-popover px-2 py-1 text-[10px] shadow-sm transition-opacity ${i === 6 ? "opacity-100 bg-foreground text-background" : "opacity-0 group-hover:opacity-100"}`}
//                   >
//                     ${(height / 10).toFixed(1)}k
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4 flex justify-between text-xs font-medium text-muted-foreground">
//               <span>Mon</span>
//               <span>Tue</span>
//               <span>Wed</span>
//               <span>Thu</span>
//               <span>Fri</span>
//               <span>Sat</span>
//               <span>Sun</span>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Recent Activity */}
//         <Card className="flex flex-col shadow-sm">
//           <CardHeader>
//             <CardTitle className="text-base font-semibold">
//               Recent Alerts
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="flex-1">
//             <div className="space-y-6">
//               {ALERTS.map((alert, i) => (
//                 <div key={i} className="flex gap-4">
//                   <div
//                     className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${alert.color}`}
//                   >
//                     <alert.icon className="h-[18px] w-[18px]" />
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-foreground">
//                       {alert.title}
//                     </p>
//                     <p className="mt-0.5 text-xs text-muted-foreground">
//                       {alert.desc}
//                     </p>
//                     <p className="mt-2 text-[10px] text-muted-foreground">
//                       {alert.time}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//           <div className="p-6 pt-0">
//             <Button
//               variant="ghost"
//               className="w-full justify-center border border-dashed border-border py-2 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground"
//             >
//               View All Alerts
//             </Button>
//           </div>
//         </Card>
//       </div>

//       {/* Table Section */}
//       <Card className="overflow-hidden shadow-sm">
//         <div className="flex flex-col gap-4 border-b border-border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//               <Input
//                 placeholder="Filter orders..."
//                 className="w-48 bg-card pl-9 text-xs font-medium shadow-sm"
//               />
//             </div>
//             <Button
//               variant="outline"
//               size="sm"
//               className="h-8 gap-1.5 text-xs font-medium shadow-sm"
//             >
//               <TrendingUp className="h-3.5 w-3.5" />
//               Status
//             </Button>
//           </div>
//           <div className="text-xs text-muted-foreground">
//             Showing <span className="font-medium text-foreground">1-3</span> of{" "}
//             <span className="font-medium text-foreground">148</span> results
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader className="bg-muted/50">
//               <TableRow>
//                 <TableHead className="w-[50px] px-6">
//                   <input
//                     type="checkbox"
//                     className="h-4 w-4 rounded border-input bg-card text-primary"
//                   />
//                 </TableHead>
//                 <TableHead className="px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
//                   Order ID
//                 </TableHead>
//                 <TableHead className="px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
//                   Patient
//                 </TableHead>
//                 <TableHead className="px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
//                   Date
//                 </TableHead>
//                 <TableHead className="px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
//                   Amount
//                 </TableHead>
//                 <TableHead className="px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
//                   Status
//                 </TableHead>
//                 <TableHead className="px-6 text-right">
//                   <span className="sr-only">Actions</span>
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody className="bg-card">
//               {ORDERS.map((order) => (
//                 <TableRow
//                   key={order.id}
//                   className="group hover:bg-muted/50 transition-colors"
//                 >
//                   <TableCell className="px-6">
//                     <input
//                       type="checkbox"
//                       className="h-4 w-4 rounded border-input bg-card text-primary"
//                     />
//                   </TableCell>
//                   <TableCell className="px-6 text-sm font-medium text-foreground">
//                     {order.id}
//                   </TableCell>
//                   <TableCell className="px-6">
//                     <div className="flex items-center">
//                       <div
//                         className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs ${
//                           order.initials === "JD"
//                             ? "bg-accent text-primary"
//                             : order.initials === "AS"
//                               ? "bg-secondary/10 text-secondary"
//                               : "bg-destructive/10 text-destructive"
//                         }`}
//                       >
//                         {order.initials}
//                       </div>
//                       <div className="text-sm font-medium text-foreground">
//                         {order.patient}
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell className="px-6 text-sm text-muted-foreground">
//                     {order.date}
//                   </TableCell>
//                   <TableCell className="px-6 text-sm font-medium text-foreground">
//                     {order.amount}
//                   </TableCell>
//                   <TableCell className="px-6">
//                     <Badge
//                       variant="secondary"
//                       className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${
//                         order.status === "Fulfilled"
//                           ? "bg-success/10 text-success border-success/20"
//                           : order.status === "Pending"
//                             ? "bg-warning/10 text-warning border-warning/20"
//                             : "bg-destructive/10 text-destructive border-destructive/20"
//                       }`}
//                     >
//                       <span
//                         className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
//                           order.status === "Fulfilled"
//                             ? "bg-success"
//                             : order.status === "Pending"
//                               ? "bg-warning"
//                               : "bg-destructive"
//                         }`}
//                       ></span>
//                       {order.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="px-6 text-right">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="h-8 w-8 text-muted-foreground hover:text-primary"
//                     >
//                       <MoreHorizontal className="h-5 w-5" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>

//         {/* Pagination */}
//         <div className="flex items-center justify-between border-t border-border bg-card px-4 py-3 sm:px-6">
//           <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//             <p className="text-xs text-muted-foreground">
//               Showing <span className="font-medium text-foreground">1</span> to{" "}
//               <span className="font-medium text-foreground">3</span> of{" "}
//               <span className="font-medium text-foreground">148</span> results
//             </p>
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="h-8 w-8 text-muted-foreground"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="h-8 w-8 bg-accent border-primary text-primary text-xs font-medium"
//               >
//                 1
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="h-8 w-8 text-muted-foreground text-xs font-medium"
//               >
//                 2
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="h-8 w-8 text-muted-foreground text-xs font-medium"
//               >
//                 3
//               </Button>
//               <span className="px-2 text-muted-foreground text-xs">...</span>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="h-8 w-8 text-muted-foreground"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Card>
//       <div className="h-10"></div>
//     </div>
//   );
// }
