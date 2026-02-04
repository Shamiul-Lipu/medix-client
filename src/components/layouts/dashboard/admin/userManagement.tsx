"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Search,
  UserCog,
  Users,
  Shield,
  ShoppingBag,
  Star,
  Ban,
  CheckCircle2,
  MoreVertical,
  Mail,
  MailCheck,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserRole } from "@/constants/userRoles";
import { controlUser, getAllUsers } from "@/actions/admin.action";

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { toast } from "sonner";

interface User {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  isBanned: boolean;
  emailVerified: boolean;
  createdAt: string;
  ordersCount?: number;
  reviewsCount?: number;
  medicinesCount?: number;
}

interface UserFilters {
  page?: string;
  limit?: string;
  role?: UserRole;
  isBanned?: string;
  search?: string;
}

export default function UserActivityPage() {
  // State
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [banFilter, setBanFilter] = useState<"all" | "true" | "false">("all");

  // Fetch users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const filters: UserFilters = {
        page: String(currentPage),
        limit: String(limit),
      };

      if (searchQuery) filters.search = searchQuery;
      if (roleFilter !== "all") filters.role = roleFilter as UserRole;
      if (banFilter !== "all") filters.isBanned = banFilter;

      const res = await getAllUsers(filters);

      if (res.data?.data?.users) {
        setUsers(res.data.data.users);
        setTotal(res.data.data.meta.total);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load users. Please try again.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit, searchQuery, roleFilter, banFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const totalPages = Math.ceil(total / limit);

  // Ban/Unban user
  const handleBanToggle = async (user: User) => {
    if (user.role === "ADMIN") {
      toast.warning("Cannot ban admin users");
      return;
    }

    const newStatus = !user.isBanned;
    setActionLoading(user.id);

    try {
      await controlUser(user.id, { isBanned: newStatus });
      toast.success(`User ${newStatus ? "banned" : "unbanned"} successfully`);

      fetchUsers();
    } catch (error) {
      console.error("Failed to toggle ban status:", error);
      toast.error("Failed to update user status");
    } finally {
      setActionLoading(null);
    }
  };

  // Change user role
  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setActionLoading(userId);

    try {
      await controlUser(userId, { role: newRole });
      toast.success(`User role changed to ${newRole}`);

      fetchUsers();
    } catch (error) {
      console.error("Failed to change role:", error);
      toast.error("Failed to update user role");
    } finally {
      setActionLoading(null);
    }
  };

  // Helper functions
  const getRoleBadge = (role: string) => {
    const variants = {
      ADMIN: {
        icon: Shield,
        className:
          "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200",
      },
      SELLER: {
        icon: ShoppingBag,
        className:
          "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200",
      },
      CUSTOMER: {
        icon: Users,
        className:
          "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200",
      },
    };
    const config = variants[role as keyof typeof variants];
    const Icon = config.icon;

    return (
      <Badge variant="outline" className={config.className}>
        <Icon className="size-3 mr-1" />
        {role}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStats = (user: User) => {
    if (user.role === "SELLER") {
      return [
        {
          label: "Medicines",
          value: user.medicinesCount || 0,
          icon: ShoppingBag,
        },
        { label: "Orders", value: user.ordersCount || 0, icon: ShoppingBag },
        { label: "Reviews", value: user.reviewsCount || 0, icon: Star },
      ];
    } else if (user.role === "CUSTOMER") {
      return [
        { label: "Orders", value: user.ordersCount || 0, icon: ShoppingBag },
        { label: "Reviews", value: user.reviewsCount || 0, icon: Star },
      ];
    }
    return [];
  };

  // Calculate role stats
  const adminCount = users.filter((u) => u.role === "ADMIN").length;
  const sellerCount = users.filter((u) => u.role === "SELLER").length;
  const customerCount = users.filter((u) => u.role === "CUSTOMER").length;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <UserCog className="size-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              User Management
            </h1>
            <p className="text-muted-foreground">
              Manage and monitor all platform users
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardDescription>Total Admins</CardDescription>
            <CardTitle className="text-3xl">{adminCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Shield className="size-4 mr-1 text-purple-500" />
              System administrators
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardDescription>Total Sellers</CardDescription>
            <CardTitle className="text-3xl">{sellerCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <ShoppingBag className="size-4 mr-1 text-blue-500" />
              Active merchants
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardDescription>Total Customers</CardDescription>
            <CardTitle className="text-3xl">{customerCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="size-4 mr-1 text-emerald-500" />
              Registered buyers
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background"
                disabled={loading}
              />
            </div>
            <div className="flex gap-2">
              <Select
                value={roleFilter}
                onValueChange={setRoleFilter}
                disabled={loading}
              >
                <SelectTrigger className="w-[160px]">
                  <Filter className="size-4 mr-2" />
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="SELLER">Seller</SelectItem>
                  <SelectItem value="CUSTOMER">Customer</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={banFilter}
                onValueChange={(v) => setBanFilter(v as typeof banFilter)}
                disabled={loading}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Ban Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="false">Active</SelectItem>
                  <SelectItem value="true">Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Table */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[300px]">User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Stats</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-10 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-12 text-muted-foreground"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => {
                    const isLoading = actionLoading === user.id;

                    return (
                      <TableRow
                        key={user.id}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="size-10 border-2 border-background shadow-sm">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Mail className="size-3" />
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={user.role}
                            onValueChange={(v) =>
                              handleRoleChange(user.id, v as UserRole)
                            }
                            disabled={isLoading}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CUSTOMER">Customer</SelectItem>
                              <SelectItem value="SELLER">Seller</SelectItem>
                              <SelectItem value="ADMIN">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge
                              variant={
                                user.isBanned ? "destructive" : "outline"
                              }
                              className={
                                user.isBanned
                                  ? ""
                                  : "bg-green-50 text-green-700 border-green-200"
                              }
                            >
                              {user.isBanned ? (
                                <>
                                  <Ban className="size-3 mr-1" />
                                  Banned
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="size-3 mr-1" />
                                  Active
                                </>
                              )}
                            </Badge>
                            {user.emailVerified && (
                              <div className="flex items-center gap-1 text-xs text-emerald-600">
                                <MailCheck className="size-3" />
                                Verified
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {getStats(user).map((stat, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md"
                              >
                                <stat.icon className="size-3 text-muted-foreground" />
                                <span className="font-medium">
                                  {stat.value}
                                </span>
                                <span className="text-muted-foreground">
                                  {stat.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatDate(user.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                disabled={isLoading}
                              >
                                {isLoading ? (
                                  <Loader2 className="size-4 animate-spin" />
                                ) : (
                                  <MoreVertical className="size-4" />
                                )}
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  navigator.clipboard.writeText(user.userId);
                                  toast.info("User ID copied to clipboard");
                                }}
                              >
                                Copy User ID
                              </DropdownMenuItem>
                              <Link href={`/admin/users/${user.id}`}>
                                <DropdownMenuItem>
                                  View Activity
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuSeparator />
                              {user.role !== "ADMIN" && (
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleBanToggle(user)}
                                >
                                  {user.isBanned ? "Unban User" : "Ban User"}
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{users.length}</span> of{" "}
              <span className="font-medium">{total}</span> users
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1 || loading}
              >
                <ChevronLeft className="size-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                      disabled={loading}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages || loading}
              >
                Next
                <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
