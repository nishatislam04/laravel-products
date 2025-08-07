"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import AccountLayout from "@/layouts/account-layout";
import { Head } from "@inertiajs/react";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  HelpCircle,
  Mail,
  MessageCircle,
  Paperclip,
  Phone,
  Search,
  Send,
} from "lucide-react";
import { useState } from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
}

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdDate: string;
  lastUpdate: string;
  messages: {
    id: string;
    sender: "user" | "support";
    message: string;
    timestamp: string;
    attachments?: string[];
  }[];
}

interface HelpCenterProps {
  faqs: FAQ[];
  tickets: SupportTicket[];
}

export default function HelpCenter({ faqs = [], tickets = [] }: HelpCenterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFAQs, setOpenFAQs] = useState<number[]>([]);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "medium",
    description: "",
    attachments: [] as File[],
  });

  const mockFAQs: FAQ[] = [
    {
      id: 1,
      question: "How do I track my order?",
      answer:
        "You can track your order by going to 'My Orders' in your account dashboard. Click on the order you want to track and you'll see the current status and tracking information. You'll also receive email updates when your order status changes.",
      category: "Orders",
      helpful: 45,
      notHelpful: 3,
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Items must be in original condition with tags attached. To initiate a return, go to 'My Returns' in your account and follow the instructions. Refunds are processed within 5-7 business days after we receive your return.",
      category: "Returns",
      helpful: 38,
      notHelpful: 2,
    },
    {
      id: 3,
      question: "How do I change my delivery address?",
      answer:
        "You can change your delivery address in the 'Address Book' section of your account. If you need to change the address for an existing order, please contact our support team immediately as we can only modify addresses before the order is shipped.",
      category: "Delivery",
      helpful: 29,
      notHelpful: 1,
    },
    {
      id: 4,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), debit cards, mobile banking (bKash, Nagad, Rocket), bank transfers, and cash on delivery. You can manage your payment methods in the 'Payment Options' section of your account.",
      category: "Payment",
      helpful: 52,
      notHelpful: 0,
    },
    {
      id: 5,
      question: "How do I cancel my order?",
      answer:
        "Orders can be cancelled within 1 hour of placement. Go to 'My Orders', find your order, and click 'Cancel Order' if the option is available. Once an order is shipped, it cannot be cancelled, but you can return it after delivery.",
      category: "Orders",
      helpful: 33,
      notHelpful: 4,
    },
    {
      id: 6,
      question: "Do you offer international shipping?",
      answer:
        "Currently, we only ship within Bangladesh. We're working on expanding our shipping coverage to other countries. Please check back for updates on international shipping availability.",
      category: "Delivery",
      helpful: 18,
      notHelpful: 8,
    },
  ];

  const mockTickets: SupportTicket[] = [
    {
      id: "TKT-2024-001",
      subject: "Issue with order delivery",
      category: "Delivery",
      status: "in-progress",
      priority: "high",
      createdDate: "2024-01-20",
      lastUpdate: "2024-01-21",
      messages: [
        {
          id: "1",
          sender: "user",
          message:
            "My order was supposed to be delivered yesterday but I haven't received it yet. The tracking shows it was delivered but I didn't get anything.",
          timestamp: "2024-01-20T10:30:00Z",
        },
        {
          id: "2",
          sender: "support",
          message:
            "Thank you for contacting us. I'm sorry to hear about the delivery issue. I've contacted our delivery partner to investigate this matter. I'll update you within 24 hours with more information.",
          timestamp: "2024-01-20T14:15:00Z",
        },
        {
          id: "3",
          sender: "support",
          message:
            "Good news! I've located your package. It was delivered to your neighbor at apartment 4B. Please check with them. If you still can't find it, we'll arrange a replacement immediately.",
          timestamp: "2024-01-21T09:45:00Z",
        },
      ],
    },
    {
      id: "TKT-2024-002",
      subject: "Refund not received",
      category: "Payment",
      status: "resolved",
      priority: "medium",
      createdDate: "2024-01-18",
      lastUpdate: "2024-01-19",
      messages: [
        {
          id: "1",
          sender: "user",
          message:
            "I returned an item last week but haven't received my refund yet. The return was approved on January 15th.",
          timestamp: "2024-01-18T16:20:00Z",
        },
        {
          id: "2",
          sender: "support",
          message:
            "I've checked your return and the refund was processed on January 16th. Bank transfers typically take 3-5 business days. You should receive it by January 19th. I'll send you the transaction reference number via email.",
          timestamp: "2024-01-18T17:30:00Z",
        },
      ],
    },
  ];

  const categories = ["all", "Orders", "Returns", "Delivery", "Payment", "Account", "Technical"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredFAQs = mockFAQs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (faqId: number) => {
    setOpenFAQs((prev) => (prev.includes(faqId) ? prev.filter((id) => id !== faqId) : [...prev, faqId]));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicketForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit support ticket:", ticketForm);
    // Handle ticket submission
    setIsTicketDialogOpen(false);
    resetTicketForm();
  };

  const resetTicketForm = () => {
    setTicketForm({
      subject: "",
      category: "",
      priority: "medium",
      description: "",
      attachments: [],
    });
  };

  const handleFAQFeedback = (faqId: number, helpful: boolean) => {
    console.log("FAQ feedback:", faqId, helpful);
    // Handle FAQ feedback
  };

  return (
    <AccountLayout>
      <Head title="Help Center - Account" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-red-500">Help Center</h1>
            <p className="text-gray-600">Find answers to common questions or get support</p>
          </div>
          <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-500 text-white hover:bg-red-600">
                <MessageCircle className="mr-2 h-4 w-4" />
                Create Support Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Support Ticket</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={ticketForm.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={ticketForm.category}
                      onValueChange={(value) => setTicketForm((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orders">Orders</SelectItem>
                        <SelectItem value="returns">Returns & Refunds</SelectItem>
                        <SelectItem value="delivery">Delivery</SelectItem>
                        <SelectItem value="payment">Payment</SelectItem>
                        <SelectItem value="account">Account Issues</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={ticketForm.priority}
                      onValueChange={(value) => setTicketForm((prev) => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={ticketForm.description}
                    onChange={handleInputChange}
                    placeholder="Please provide detailed information about your issue..."
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments (Optional)</Label>
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
                    <Paperclip className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">Images, documents up to 10MB each</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsTicketDialogOpen(false);
                      resetTicketForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-red-500 text-white hover:bg-red-600">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Ticket
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Live Chat</h3>
              <p className="mb-4 text-sm text-gray-600">Get instant help from our support team</p>
              <Button variant="outline" className="w-full">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Phone Support</h3>
              <p className="mb-4 text-sm text-gray-600">Call us: +88015-88888-9999</p>
              <Button variant="outline" className="w-full">
                Call Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Email Support</h3>
              <p className="mb-4 text-sm text-gray-600">support@exclusive.com</p>
              <Button variant="outline" className="w-full">
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
            <TabsTrigger value="tickets">My Support Tickets</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="capitalize">
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* FAQ List */}
            {filteredFAQs.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <HelpCircle className="mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">No FAQs found</h3>
                  <p className="text-center text-gray-600">Try adjusting your search terms or category filter.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <Card key={faq.id}>
                    <Collapsible open={openFAQs.includes(faq.id)} onOpenChange={() => toggleFAQ(faq.id)}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer transition-colors hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <CardTitle className="text-lg">{faq.question}</CardTitle>
                              <Badge variant="outline" className="capitalize">
                                {faq.category}
                              </Badge>
                            </div>
                            {openFAQs.includes(faq.id) ? (
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <p className="mb-4 text-gray-700">{faq.answer}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-gray-600">Was this helpful?</span>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleFAQFeedback(faq.id, true)}
                                  className="text-green-600 hover:text-green-800"
                                >
                                  <CheckCircle className="mr-1 h-4 w-4" />
                                  Yes ({faq.helpful})
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleFAQFeedback(faq.id, false)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <AlertCircle className="mr-1 h-4 w-4" />
                                  No ({faq.notHelpful})
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="tickets" className="space-y-6">
            {mockTickets.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageCircle className="mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">No support tickets</h3>
                  <p className="mb-4 text-center text-gray-600">You haven't created any support tickets yet.</p>
                  <Button
                    onClick={() => setIsTicketDialogOpen(true)}
                    className="bg-red-500 text-white hover:bg-red-600"
                  >
                    Create Your First Ticket
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {mockTickets.map((ticket) => (
                  <Card key={ticket.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <CardTitle className="text-lg">#{ticket.id}</CardTitle>
                          <Badge className={`${getStatusColor(ticket.status)} hover:${getStatusColor(ticket.status)}`}>
                            {ticket.status.replace("-", " ")}
                          </Badge>
                          <Badge
                            className={`${getPriorityColor(ticket.priority)} hover:${getPriorityColor(ticket.priority)}`}
                          >
                            {ticket.priority}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Created</p>
                          <p className="font-semibold">{ticket.createdDate}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="mb-2 font-medium text-gray-900">{ticket.subject}</h4>
                        <p className="text-sm text-gray-600">Category: {ticket.category}</p>
                        <p className="text-sm text-gray-600">Last updated: {ticket.lastUpdate}</p>
                      </div>

                      {/* Recent Messages */}
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-900">Recent Messages</h5>
                        {ticket.messages.slice(-2).map((message) => (
                          <div
                            key={message.id}
                            className={`rounded-lg p-3 ${
                              message.sender === "user" ? "ml-8 bg-blue-50" : "mr-8 bg-gray-50"
                            }`}
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-sm font-medium">
                                {message.sender === "user" ? "You" : "Support Team"}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(message.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{message.message}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t pt-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{ticket.messages.length} messages</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Full Conversation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AccountLayout>
  );
}
