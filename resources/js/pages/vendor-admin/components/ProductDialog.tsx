import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronsUpDown, ChevronDownIcon, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useAppForm } from "@/hooks/useAppForm";
import { FormProduct } from "../types";

export interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: any[];
  brands: any[];
  stockStatusEnum: any[];
  warrentTypeEnum: any[];
}

export const ProductDialog: React.FC<ProductDialogProps> = ({
  open,
  onOpenChange,
  categories,
  brands,
  stockStatusEnum,
  warrentTypeEnum,
}) => {
  const [openCategory, setOpenCategory] = React.useState(false);
  const [categoryValues, setCategoryValues] = React.useState("");
  const [categoryInput, setCategoryInput] = React.useState("");

  const [openBrand, setOpenBrand] = React.useState(false);
  const [brandValues, setBrandValues] = React.useState("");
  const [brandInput, setBrandInput] = React.useState("");

  const [openStartDate, setOpenStartDate] = React.useState(false);
  const [openEndDate, setOpenEndDate] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date());

  const {
    data,
    setData,
    post,
    processing,
    errors,
    reset,
    clearErrors,
    handleChange,
    handleFile,
    handleFiles,
  } = useAppForm<FormProduct>({
    name: "",
    slug: "",
    description: "",
    thumbnail: undefined,
    images: [],
    category_id: "",
    sale_price: "",
    sale_start: "",
    sale_end: "",
    stock_quantity: "",
    stock_status: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    sku: "",
    brand_id: "",
    price: "",
    stock: "",
    return_days: "",
    warranty_type: "",
    warranty_period: "",
    meta_title: "",
    meta_description: "",
    tags: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route("vendor-admin.products.store"), {
      forceFormData: true,
      onSuccess: () => {
        onOpenChange(false);
        reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h[90vh] min-h-[90vh] max-w-[70vw] min-w-[70vw] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 z-50 bg-white px-6 py-6">
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Create a new product listing for your store.</DialogDescription>
        </DialogHeader>
        <form className="p-6 pt-0" onSubmit={handleSubmit}>
          <section className="grid grid-cols-12 gap-4">
            {/* Basic Info */}
            <div className="col-span-6 space-y-2 rounded-sm border border-gray-200 p-4">
              <h3 className="mb-2 text-lg font-semibold tracking-tight">Basic Info</h3>
              <div>
                <Label htmlFor="name" className="text-right">
                  Name*
                </Label>
                <Input id="name" name="name" value={data.name} className={errors.name ? "border-red-500" : ""} onChange={handleChange("name")} />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="slug" className="text-right">
                  slug*
                </Label>
                <Input id="slug" name="slug" value={data.slug} className={errors.slug ? "border-red-500" : ""} onChange={handleChange("slug")} />
                {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
              </div>
              <div>
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" name="description" value={data.description} className={errors.description ? "border-red-500" : ""} onChange={handleChange("description")} />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>

              {/* Category & Brand */}
              <div className="flex justify-between">
                <div className="flex w-1/2 flex-col space-y-1">
                  <Label htmlFor="category">Category*</Label>
                  <Popover open={openCategory} onOpenChange={setOpenCategory}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox" aria-expanded={openCategory} className="w-[200px] justify-between">
                        {categoryValues ? categoryValues : "Select category..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
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
                                  setData("category_id", category.id);
                                  if (errors.category_id) clearErrors("category_id");
                                }}
                              >
                                {category.name}
                                <Check className={cn("ml-auto", categoryInput === category.name ? "opacity-100" : "opacity-0")} />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {errors.category_id && <p className="text-sm text-red-500">{errors.category_id}</p>}
                </div>

                <div className="flex w-1/2 flex-col space-y-1">
                  <Label htmlFor="brand">Brand</Label>
                  <Popover open={openBrand} onOpenChange={setOpenBrand}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" role="combobox" aria-expanded={openBrand} className="w-[200px] justify-between">
                        {brandValues ? brandValues : "Select brand..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search brand..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>No brand found.</CommandEmpty>
                          <CommandGroup>
                            {brands.map((brand: any) => (
                              <CommandItem
                                key={brand.name}
                                value={brand.name}
                                onSelect={(currentValue) => {
                                  setBrandInput(currentValue === brandInput ? "" : currentValue);
                                  setBrandValues((prev) => (prev !== currentValue ? currentValue : ""));
                                  setOpenBrand(false);
                                  setData("brand_id", brand.id);
                                  if (errors.brand_id) clearErrors("brand_id");
                                }}
                              >
                                {brand.name}
                                <Check className={cn("ml-auto", brandInput === brand.name ? "opacity-100" : "opacity-0")} />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {errors.brand_id && <p className="text-sm text-red-500">{errors.brand_id}</p>}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="col-span-6 rounded-sm border border-gray-200 p-4">
              <h3 className="mb-2 text-lg font-semibold tracking-tight">Pricing</h3>
              <div>
                <Label htmlFor="price" className="text-right">
                  Price*
                </Label>
                <Input id="price" type="number" name="price" value={data.price} className={errors.price ? "border-red-500" : ""} onChange={handleChange("price")} />
                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
              </div>
              <div>
                <Label htmlFor="sale_price" className="text-right">
                  Sale price (discount price)
                </Label>
                <Input id="sale_price" type="number" name="sale_price" value={data.sale_price} className={errors.sale_price ? "border-red-500" : ""} onChange={handleChange("sale_price")} />
                {errors.sale_price && <p className="text-sm text-red-500">{errors.sale_price}</p>}
              </div>
              <div className="my-4">
                <Label htmlFor="sale_start" className="text-right">
                  Sale start date
                </Label>
                <Popover open={openStartDate} onOpenChange={setOpenStartDate}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" id="date" className="w-48 justify-between font-normal">
                      {startDate ? startDate.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setStartDate(date);
                        setOpenStartDate(false);
                        setData("sale_start", date ? date.toISOString() : "");
                        if (errors.sale_start) clearErrors("sale_start");
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {errors.sale_start && <p className="text-sm text-red-500">{errors.sale_start}</p>}
              </div>
              <div className="my-4">
                <Label htmlFor="sale_end" className="text-right">
                  Sale end date
                </Label>
                <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" id="date" className="w-48 justify-between font-normal">
                      {endDate ? endDate.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setEndDate(date);
                        setOpenEndDate(false);
                        setData("sale_end", date ? date.toISOString() : "");
                        if (errors.sale_end) clearErrors("sale_end");
                      }}
                    />
                  </PopoverContent>
                </Popover>
                {errors.sale_end && <p className="text-sm text-red-500">{errors.sale_end}</p>}
              </div>
            </div>

            {/* Stock & SKU */}
            <div className="col-span-6 rounded-sm border border-gray-200 p-4">
              <h3 className="mb-2 text-lg font-semibold tracking-tight">Stock & SKU</h3>
              <div>
                <Label htmlFor="sku" className="text-right">
                  SKU*
                </Label>
                <Input id="sku" type="text" value={data.sku} className={errors.sku ? "border-red-500" : ""} onChange={handleChange("sku")} />
                {errors.sku && <p className="text-sm text-red-500">{errors.sku}</p>}
              </div>
              <div>
                <Label htmlFor="stock" className="text-right">
                  Stock Quantity*
                </Label>
                <Input id="stock" type="number" value={data.stock} className={errors.stock ? "border-red-500" : ""} onChange={handleChange("stock")} />
                {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
              </div>
              <div>
                <Label htmlFor="stock_status" className="text-right">
                  Stock Status*
                </Label>
                <Select
                  value={data.stock_status}
                  onValueChange={(value) => {
                    setData("stock_status", value);
                    if (errors.stock_status) clearErrors("stock_status");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select stock status" />
                  </SelectTrigger>
                  <SelectContent>
                    {stockStatusEnum.map((status: any) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.stock_status && <p className="text-sm text-red-500">{errors.stock_status}</p>}
              </div>
            </div>

            {/* Media */}
            <div className="col-span-6 rounded-sm border border-gray-200 p-4">
              <h3 className="mb-2 text-lg font-semibold tracking-tight">Media</h3>
              <div className="my-6">
                <Label htmlFor="thumbnail" className="text-right">
                  Thumbnail*
                </Label>
                <Input id="thumbnail" type="file" name="thumbnail" className={errors.thumbnail ? "border-red-500" : ""} onChange={handleFile("thumbnail")} />
                {errors.thumbnail && <p className="text-sm text-red-500">{errors.thumbnail}</p>}
              </div>
              <div>
                <Label htmlFor="images" className="text-right">
                  Images
                </Label>
                <Input
                  id="images"
                  type="file"
                  name="images"
                  multiple
                  className={errors.images ? "border-red-500" : ""}
                  onChange={handleFiles("images", true)}
                />
                {errors.images && <p className="text-sm text-red-500">{errors.images}</p>}
                {data.images && (data.images as File[]).length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {(data.images as File[]).map((file, index) => (
                      <li key={index} className="flex items-center justify-between text-sm text-gray-700">
                        <span>
                          {file.name} ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                        <button
                          type="button"
                          className="ml-4 text-red-500 hover:text-red-700"
                          onClick={() => {
                            const newFiles = [...(data.images as File[])];
                            newFiles.splice(index, 1);
                            setData("images", newFiles as any);
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Shipping */}
            <div className="col-span-6 rounded-sm border border-gray-200 p-4">
              <h3 className="mb-2 text-lg font-semibold tracking-tight">Shipping</h3>
              <div>
                <Label htmlFor="weight" className="text-right">
                  Weight
                </Label>
                <Input id="weight" type="number" className={errors.weight ? "border-red-500" : ""} value={data.weight} onChange={handleChange("weight")} />
                {errors.weight && <p className="text-sm text-red-500">{errors.weight}</p>}
              </div>
              <div>
                <Label htmlFor="length" className="text-right">
                  Length
                </Label>
                <Input id="length" type="number" className={errors.length ? "border-red-500" : ""} value={data.length} onChange={handleChange("length")} />
                {errors.length && <p className="text-sm text-red-500">{errors.length}</p>}
              </div>
              <div>
                <Label htmlFor="width" className="text-right">
                  Width
                </Label>
                <Input id="width" type="number" className={errors.width ? "border-red-500" : ""} value={data.width} onChange={handleChange("width")} />
                {errors.width && <p className="text-sm text-red-500">{errors.width}</p>}
              </div>
              <div>
                <Label htmlFor="height" className="text-right">
                  Height
                </Label>
                <Input id="height" type="number" className={errors.height ? "border-red-500" : ""} value={data.height} onChange={handleChange("height")} />
                {errors.height && <p className="text-sm text-red-500">{errors.height}</p>}
              </div>
            </div>

            {/* SEO & Marketing */}
            <div className="col-span-6 rounded-sm border border-gray-200 p-4">
              <h3 className="mb-2 text-lg font-semibold tracking-tight">SEO & Marketing</h3>
              <div>
                <Label htmlFor="meta_title" className="text-right">
                  Meta Title
                </Label>
                <Input id="meta_title" type="text" className={errors.meta_title ? "border-red-500" : ""} value={data.meta_title} onChange={handleChange("meta_title")} />
                {errors.meta_title && <p className="text-sm text-red-500">{errors.meta_title}</p>}
              </div>
              <div>
                <Label htmlFor="meta_description" className="text-right">
                  Meta Description
                </Label>
                <Textarea id="meta_description" className={errors.meta_description ? "border-red-500" : ""} value={data.meta_description} onChange={handleChange("meta_description")} />
                {errors.meta_description && <p className="text-sm text-red-500">{errors.meta_description}</p>}
              </div>
              <div>
                <Label htmlFor="tags" className="text-right">
                  Tags (comma separated)
                </Label>
                <Input id="tags" type="text" className={errors.tags ? "border-red-500" : ""} value={data.tags} onChange={handleChange("tags")} />
                {errors.tags && <p className="text-sm text-red-500">{errors.tags}</p>}
              </div>
            </div>

            {/* Return & Warranty */}
            <div className="col-span-6 rounded-sm border border-gray-200 p-4">
              <h3 className="mb-2 text-lg font-semibold tracking-tight">Return & Warranty</h3>
              <div>
                <Label htmlFor="return_days" className="text-right">
                  Return Days*
                </Label>
                <Input id="return_days" type="number" className={errors.return_days ? "border-red-500" : ""} value={data.return_days} onChange={handleChange("return_days")} />
                {errors.return_days && <p className="text-sm text-red-500">{errors.return_days}</p>}
              </div>
              <div>
                <Label htmlFor="warranty_type" className="text-right">
                  Warranty Type*
                </Label>
                <Select
                  value={data.warranty_type}
                  onValueChange={(value) => {
                    setData("warranty_type", value);
                    if (errors.warranty_type) clearErrors("warranty_type");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select warranty type" />
                  </SelectTrigger>
                  <SelectContent>
                    {warrentTypeEnum.map((type: any) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.warranty_type && <p className="text-sm text-red-500">{errors.warranty_type}</p>}
              </div>
              <div>
                <Label htmlFor="warranty_period" className="text-right">
                  Warranty Period* (in month)
                </Label>
                <Input id="warranty_period" type="number" className={errors.warranty_period ? "border-red-500" : ""} value={data.warranty_period} onChange={handleChange("warranty_period")} />
                {errors.warranty_period && <p className="text-sm text-red-500">{errors.warranty_period}</p>}
              </div>
            </div>
          </section>
          <DialogFooter className="mb-4">
            <Button disabled={processing} type="submit">
              Create Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
