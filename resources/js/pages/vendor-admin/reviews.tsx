import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import VendorLayout from "@/layouts/vendor-layout";
import { ChevronLeft, ChevronRight, Eye, MessageSquare, MoreHorizontal, Search, Star, ThumbsUp } from "lucide-react";
import { useState } from "react";

// Mock reviews data for vendor
const productReviews = [
  {
    id: 1,
    customer: "John Smith",
    email: "john@example.com",
    product: "Wireless Headphones",
    rating: 5,
    title: "Excellent sound quality!",
    comment:
      "These headphones exceeded my expectations. The sound quality is crystal clear and the battery life is amazing. Highly recommended!",
    date: "2024-03-15",
    verified: true,
    helpful: 12,
    response: null,
    avatar: "/images/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    product: "Smart Watch",
    rating: 4,
    title: "Great features, minor issues",
    comment:
      "Love the fitness tracking features and the display is crisp. However, the battery could last longer. Overall a good purchase.",
    date: "2024-03-12",
    verified: true,
    helpful: 8,
    response: "Thank you for your feedback! We're working on improving battery life in future updates.",
    avatar: "/images/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    customer: "Mike Wilson",
    email: "mike@example.com",
    product: "USB-C Cable",
    rating: 2,
    title: "Not as described",
    comment: "The cable feels cheap and doesn't charge as fast as advertised. Expected better quality for the price.",
    date: "2024-03-10",
    verified: true,
    helpful: 3,
    response: null,
    avatar: "/images/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    customer: "Emma Davis",
    email: "emma@example.com",
    product: "Bluetooth Speaker",
    rating: 5,
    title: "Perfect for outdoor use",
    comment:
      "Amazing sound quality and the waterproof feature works perfectly. Took it to the beach and it performed flawlessly!",
    date: "2024-03-08",
    verified: false,
    helpful: 15,
    response: "So glad you enjoyed it! Thanks for choosing our products.",
    avatar: "/images/placeholder.svg?height=40&width=40",
  },
];

const reviewStats = [
  {
    title: "Total Reviews",
    value: "156",
    change: "+23",
    icon: Star,
  },
  {
    title: "Average Rating",
    value: "4.6",
    change: "+0.2",
    icon: Star,
  },
  {
    title: "Pending Responses",
    value: "8",
    change: "+3",
    icon: MessageSquare,
  },
  {
    title: "Helpful Votes",
    value: "342",
    change: "+45",
    icon: ThumbsUp,
  },
];

export default function VendorReviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [selectedReview, setSelectedReview] = useState(null);
  const [responseText, setResponseText] = useState("");

  const itemsPerPage = 5;
  const filteredReviews = productReviews.filter((review) => {
    const matchesSearch =
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter;
    return matchesSearch && matchesRating;
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

  const handleResponse = (reviewId: number, response: string) => {
    console.log(`Responding to review ${reviewId}: ${response}`);
    setSelectedReview(null);
    setResponseText("");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ));
  };

  return (
    <VendorLayout title="Reviews & Ratings">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reviews & Ratings</h1>
          <p className="text-muted-foreground">Manage customer reviews and ratings for your products</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reviewStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reviews List */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Reviews</CardTitle>
            <CardDescription>View and respond to customer reviews for your products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center space-x-2">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-[180px]">
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
            </div>

            <div className="space-y-4">
              {paginatedReviews.map((review) => (
                <Card key={review.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-1 items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={review.avatar || "/images/placeholder.svg"} />
                        <AvatarFallback>
                          {review.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center space-x-2">
                          <h4 className="font-semibold">{review.customer}</h4>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="mb-2 flex items-center space-x-2">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-sm font-medium">{review.product}</span>
                        </div>
                        <h5 className="mb-1 font-medium">{review.title}</h5>
                        <p className="mb-3 text-sm text-muted-foreground">{review.comment}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{review.helpful} helpful</span>
                          </div>
                        </div>
                        {review.response && (
                          <div className="mt-3 rounded-md bg-muted p-3">
                            <div className="mb-1 flex items-center space-x-2">
                              <Badge variant="secondary">Vendor Response</Badge>
                            </div>
                            <p className="text-sm">{review.response}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedReview(review)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {!review.response && (
                          <DropdownMenuItem onClick={() => setSelectedReview(review)}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Respond
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredReviews.length)} of{" "}
                {filteredReviews.length} reviews
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="h-8 w-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Review Response Dialog */}
        {selectedReview && (
          <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{selectedReview.response ? "Review Details" : "Respond to Review"}</DialogTitle>
                <DialogDescription>
                  {selectedReview.response
                    ? "View the complete review and your response"
                    : "Write a response to this customer review"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedReview.avatar || "/images/placeholder.svg"} />
                      <AvatarFallback>
                        {selectedReview.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedReview.customer}</p>
                      <p className="text-sm text-muted-foreground">{selectedReview.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(selectedReview.rating)}</div>
                    <span className="font-medium">{selectedReview.product}</span>
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium">{selectedReview.title}</h4>
                    <p className="text-sm text-muted-foreground">{selectedReview.comment}</p>
                  </div>
                </div>
                {selectedReview.response ? (
                  <div className="rounded-md bg-muted p-3">
                    <div className="mb-2 flex items-center space-x-2">
                      <Badge variant="secondary">Your Response</Badge>
                    </div>
                    <p className="text-sm">{selectedReview.response}</p>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="response">Your Response</Label>
                    <Textarea
                      id="response"
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Write a helpful response to this review..."
                      rows={4}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
              {!selectedReview.response && (
                <DialogFooter>
                  <Button
                    onClick={() => handleResponse(selectedReview.id, responseText)}
                    disabled={!responseText.trim()}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Response
                  </Button>
                </DialogFooter>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </VendorLayout>
  );
}
