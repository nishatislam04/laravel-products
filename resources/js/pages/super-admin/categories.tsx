import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import AdminLayout from "@/layouts/admin-layout";
import { cn } from "@/lib/utils";
import { useForm } from "@inertiajs/react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Edit,
  Eye,
  Folder,
  MoreHorizontal,
  Plus,
  Search,
  Tag,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";

// Mock category data
const categories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    description: "Electronic devices and gadgets",
    status: "Active",
    products: 245,
    parent: null,
    image: "/images/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Smartphones",
    slug: "smartphones",
    description: "Mobile phones and accessories",
    status: "Active",
    products: 89,
    parent: "Electronics",
    image: "/images/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    name: "Clothing",
    slug: "clothing",
    description: "Fashion and apparel",
    status: "Active",
    products: 156,
    parent: null,
    image: "/images/placeholder.svg?height=40&width=40",
    createdAt: "2024-02-01",
  },
  {
    id: 4,
    name: "Men's Clothing",
    slug: "mens-clothing",
    description: "Clothing for men",
    status: "Active",
    products: 78,
    parent: "Clothing",
    image: "/images/placeholder.svg?height=40&width=40",
    createdAt: "2024-02-05",
  },
  {
    id: 5,
    name: "Books",
    slug: "books",
    description: "Books and literature",
    status: "Inactive",
    products: 34,
    parent: null,
    image: "/images/placeholder.svg?height=40&width=40",
    createdAt: "2024-03-01",
  },
];

const categoryStats = [
  {
    title: "Total Categories",
    value: "45",
    change: "+5",
    icon: Tag,
  },
  {
    title: "Active Categories",
    value: "42",
    change: "+3",
    icon: Tag,
  },
  {
    title: "Parent Categories",
    value: "12",
    change: "+1",
    icon: Folder,
  },
  {
    title: "Total Products",
    value: "1,234",
    change: "+89",
    icon: Tag,
  },
];

type CategoryType = {
  id: number;
  name: string;
};

type FormCategory = {
  name: string;
  status: string;
  description: string;
  image: File | undefined;
  icon: File | undefined;
  meta_title: string;
  meta_description: string;
  parent_id: string;
  sort_order: string;
};

export default function Categories({ categories }: { categories: CategoryType[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryValues, setCategoryValues] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    data,
    setData,
    post,
    processing,
    errors,
    isDirty,
    setDefaults,
    reset,
    setError,
    clearErrors,
    progress,
    transform,
  } = useForm<FormCategory>({
    name: "",
    description: "",
    status: "",
    image: undefined,
    icon: undefined,
    meta_title: "",
    meta_description: "",
    parent_id: "",
    sort_order: "",
  });

  const itemsPerPage = 5;
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route("vendor-admin.products.store"), {
      forceFormData: true,
      onSuccess: () => {
        setIsDialogOpen(false); // close modal on success
        reset();
      },
      onError: () => {
        // optionally do something on error
      },
    });
  };

  const handleChange = (field: keyof FormCategory) => (e: any) => {
    let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setData(field, value);
    if (errors[field]) clearErrors(field);
  };

  return (
    <AdminLayout title="Categories">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
            <p className="text-muted-foreground">Manage product categories and subcategories</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] min-h-[90vh] max-w-[70vw] min-w-[70vw] overflow-y-auto p-0">
              <DialogHeader className="bg-white px-6 py-6">
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new product category. Fill in the required information below.
                </DialogDescription>
              </DialogHeader>
              <form className="p-6 pt-0" onSubmit={handleSubmit}>
                <section className="grid grid-cols-12 gap-4">
                  {/* basic container */}
                  <div className="col-span-6 space-y-2 rounded-sm border border-gray-200 p-4">
                    <h3 className="mb-2 text-lg font-semibold tracking-tight">Basic Info</h3>
                    <div className="">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => handleChange("name")}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="">
                      <Label htmlFor="status" className="text-right">
                        Status
                      </Label>
                      <Select value={data.status} onValueChange={(value) => handleChange("status")}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* description */}
                    <div className="">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => handleChange("description")}
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                  </div>
                  {/* image container */}
                  <div className="col-span-6 space-y-5 rounded-sm border border-gray-200 p-4">
                    <h3 className="mb-2 text-lg font-semibold tracking-tight">Image</h3>
                    <div className="my-6">
                      <Label htmlFor="image" className="text-right">
                        Image*
                      </Label>
                      <Input
                        id="image"
                        type="file"
                        name="image"
                        className={errors.image ? "border-red-500" : ""}
                        onChange={(e) => {
                          setData("image", e.target.files?.[0]);
                          if (errors.image) clearErrors("image");
                        }}
                        // required
                      />
                      {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                    </div>
                    <div className="my-6">
                      <Label htmlFor="icon" className="text-right">
                        Icon*
                      </Label>
                      <Input
                        id="icon"
                        type="file"
                        name="icon"
                        className={errors.icon ? "border-red-500" : ""}
                        onChange={(e) => {
                          setData("icon", e.target.files?.[0]);
                          if (errors.icon) clearErrors("icon");
                        }}
                        // required
                      />
                      {errors.icon && <p className="text-sm text-red-500">{errors.icon}</p>}
                    </div>
                  </div>
                  {/* meta container */}
                  <div className="col-span-6 rounded-sm border border-gray-200 p-4">
                    <h3 className="mb-2 text-lg font-semibold tracking-tight">Meta & SEO</h3>
                    <div className="my-6">
                      <Label htmlFor="meta_title" className="text-right">
                        Meta Title
                      </Label>
                      <Input
                        id="meta_title"
                        value={data.meta_title}
                        onChange={(e) => handleChange("meta_title")}
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="my-6">
                      <Label htmlFor="meta_description" className="text-right">
                        Meta Description
                      </Label>
                      <Textarea
                        id="meta_description"
                        value={data.meta_description}
                        onChange={(e) => handleChange("meta_description")}
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* miscs container */}
                  <div className="col-span-6 rounded-sm border border-gray-200 p-4">
                    <h3 className="mb-2 text-lg font-semibold tracking-tight">Miscs</h3>
                    <div className="my-6 flex flex-col items-start gap-2">
                      <Label htmlFor="category" className="text-right">
                        <Tooltip>
                          <TooltipTrigger>Category 📢</TooltipTrigger>
                          <TooltipContent className="space-y-2">
                            <h1>This is about nested category block</h1>
                            <ul className="list-disc pl-2">
                              <li>If no category is selected, the new category will be Level 1</li>
                              <li>If you select a Level 1 category, the new category will be Level 2</li>
                              <li>If you select a Level 2 category, the new category will be Level 3</li>
                              <li>Categories with the same numbering prefix are siblings.</li>
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Popover open={openCategory} onOpenChange={setOpenCategory}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openCategory}
                            className="w-[250px] justify-between"
                          >
                            {categoryValues ? categoryValues : "Select category..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[250px] p-0">
                          <Command>
                            <CommandInput placeholder="Search category..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No category found.</CommandEmpty>
                              <CommandGroup>
                                {categories.map((category: any) => (
                                  <CommandItem
                                    key={category.name}
                                    value={category.name}
                                    onSelect={(currentValue) => {
                                      setCategoryInput(currentValue === categoryInput ? "" : currentValue);
                                      setCategoryValues((prev) => (prev !== currentValue ? currentValue : ""));
                                      setOpenCategory(false);

                                      setData("parent_id", category.id); // better to use id instead of name
                                      if (errors.parent_id) clearErrors("parent_id");
                                    }}
                                  >
                                    {category.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        categoryInput === category.name ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    {/* sort order */}
                    <div className="flex justify-between">
                      <div className="">
                        <Label htmlFor="sort_order" className="text-right">
                          Sort Order
                        </Label>
                        <Input
                          id="sort_order"
                          value={data.sort_order}
                          onChange={(e) => handleChange("sort_order")}
                          type="number"
                          required
                        />
                      </div>
                      <div className="flex items-center self-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button>show current order state</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-[200px]">
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </section>
                <DialogFooter className="my-4">
                  <Button className="mt-2" disabled={processing} type="submit">
                    {processing ? "Creating..." : "Create Category"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categoryStats.map((stat) => (
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

        {/* Categories List */}
        <Card>
          <CardHeader>
            <CardTitle>Category List</CardTitle>
            <CardDescription>Manage all product categories and their hierarchy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center space-x-2">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={category.image || "/images/placeholder.svg"}
                          alt={category.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-muted-foreground">{category.slug}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {category.parent ? (
                        <Badge variant="outline">{category.parent}</Badge>
                      ) : (
                        <span className="text-muted-foreground">Root</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={category.status === "Active" ? "default" : "destructive"}>
                        {category.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{category.products}</TableCell>
                    <TableCell>{category.createdAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Category
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Category
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCategories.length)} of{" "}
                {filteredCategories.length} categories
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
      </div>
    </AdminLayout>
  );
}
