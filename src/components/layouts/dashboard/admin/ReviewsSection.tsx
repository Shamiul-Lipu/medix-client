"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Eye, Trash2, Star, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteReview, getReviews } from "@/actions/review.action";
import { toast } from "sonner";

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  medicine: {
    id: string;
    name: string;
    category: {
      id: string;
      name: string;
    };
  };
  orderItem: {
    id: string;
  };
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [medicineFilter, setMedicineFilter] = useState<string>("all");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Fetch reviews
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getReviews();
      if (response?.data?.data) {
        setReviews(response?.data?.data);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      toast.error("Failed to load reviews. Please try again.");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Get unique medicine names for filter
  const uniqueMedicines = useMemo(() => {
    return Array.from(new Set(reviews.map((r) => r.medicine?.name || "")));
  }, [reviews]);

  // Filter reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        review.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.customer?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        review.medicine?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesRating =
        ratingFilter === "all" || review.rating.toString() === ratingFilter;
      const matchesMedicine =
        medicineFilter === "all" || review.medicine?.name === medicineFilter;
      return matchesSearch && matchesRating && matchesMedicine;
    });
  }, [reviews, searchQuery, ratingFilter, medicineFilter]);

  // Handle deleting reviews
  const handleDeleteClick = (review: Review) => {
    setReviewToDelete(review);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!reviewToDelete) return;

    setDeleteLoading(reviewToDelete.id);
    setIsDeleteDialogOpen(false);

    try {
      const response = await deleteReview(reviewToDelete.id);
      if (response.data?.success) {
        toast.success("Review has been deleted successfully");
        fetchReviews();
      } else {
        throw new Error(response.data?.message || "Failed to delete review");
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
      toast.error("Failed to delete review");
    } finally {
      setDeleteLoading(null);
      setReviewToDelete(null);
    }
  };

  // View review details
  const handleViewDetails = (review: Review) => {
    setSelectedReview(review);
    setIsDetailsOpen(true);
  };

  // Render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Reviews Management</CardTitle>
          <CardDescription>
            View and manage customer reviews for medicines
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by Customer Name or Medicine Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
            <Select
              value={ratingFilter}
              onValueChange={setRatingFilter}
              disabled={loading}
            >
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={medicineFilter}
              onValueChange={setMedicineFilter}
              disabled={loading}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by medicine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Medicines</SelectItem>
                {uniqueMedicines.map((medicine) => (
                  <SelectItem key={medicine} value={medicine}>
                    {medicine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reviews Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Review ID</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Medicine Name</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-28" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-48" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-20" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredReviews.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-gray-500"
                    >
                      No reviews found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReviews.map((review) => {
                    const isDeleting = deleteLoading === review.id;

                    return (
                      <TableRow key={review.id}>
                        <TableCell className="font-medium">
                          {review.id.slice(0, 5)}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {review.customer?.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {review.customer?.email}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{review.medicine?.name}</TableCell>
                        <TableCell>{renderStars(review.rating)}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {review.comment || (
                            <span className="text-gray-400">No comment</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {formatDate(review.createdAt)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(review)}
                              disabled={isDeleting}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteClick(review)}
                              disabled={isDeleting}
                            >
                              {isDeleting ? (
                                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                              ) : (
                                <Trash2 className="h-4 w-4 text-red-500" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Review Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>
              Complete information for review {selectedReview?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p>{selectedReview?.customer?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p>{selectedReview?.customer?.email}</p>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <h3 className="font-semibold mb-2">Product Information</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-gray-500 text-sm">Medicine Name</p>
                    <p>{selectedReview.medicine?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Category</p>
                    <Badge variant="outline">
                      {selectedReview.medicine?.category?.name}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="font-semibold mb-2">Rating</h3>
                <div className="flex items-center gap-2">
                  {renderStars(selectedReview.rating)}
                  <span className="text-sm text-gray-500">
                    {selectedReview.rating} out of 5
                  </span>
                </div>
              </div>

              {/* Comment */}
              <div>
                <h3 className="font-semibold mb-2">Comment</h3>
                <p className="text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
                  {selectedReview.comment || "No comment provided"}
                </p>
              </div>

              {/* Review Date */}
              <div>
                <h3 className="font-semibold mb-2">Review Date</h3>
                <p className="text-sm">
                  {formatDate(selectedReview.createdAt)}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              review from {reviewToDelete?.customer?.name} for{" "}
              {reviewToDelete?.medicine?.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
