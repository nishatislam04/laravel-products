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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useInertiaForm } from "@/hooks/useInertiaForm";
import { CreateFormProduct } from "../types/CreateProductTypes";
import { TextField } from "@/components/form/TextField";
import { TextAreaField } from "@/components/form/TextAreaField";
import { SelectField } from "@/components/form/SelectField";
import { FileField } from "@/components/form/FileField";

export interface CreateProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: any[];
  brands: any[];
  stockStatusEnum: { value: string; label: string }[];
  warrentTypeEnum: { value: string; label: string }[];
}

export const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
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
  } = useInertiaForm<CreateFormProduct>({
    name: "",
    slug: "",
    description: "",
    thumbnail: undefined,
    images: [],
    category_id: "",
    sale_price: "",
    sale_start: "",
    sale_end: "",
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
              <TextField
                id="name"
                name="name"
                label="Name*"
                value={data.name}
                onChange={handleChange("name")}
                error={errors.name}
              />
              <TextField
                id="slug"
                name="slug"
                label="slug*"
                value={data.slug}
                onChange={handleChange("slug")}
                error={errors.slug}
              />
              <TextAreaField
                id="description"
                name="description"
                label="Description"
                value={data.description}
                onChange={handleChange("description")}
                error={errors.description}
              />

              {/* Category & Brand (complex) */}
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
              <TextField
                id="price"
                name="price"
                type="number"
                label="Price*"
                value={data.price}
                onChange={handleChange("price")}
                error={errors.price}
              />
              <TextField
                id="sale_price"
                name="sale_price"
                type="number"
                label="Sale price (discount price)"
                value={data.sale_price}
                onChange={handleChange("sale_price")}
                error={errors.sale_price}
              />
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
              <TextField id="sku" type="text" label="SKU*" value={data.sku} onChange={handleChange("sku")} error={errors.sku} />
              <TextField id="stock" type="number" label="Stock Quantity*" value={data.stock} onChange={handleChange("stock")} error={errors.stock} />
              <SelectField
                label="Stock Status*"
                value={data.stock_status}
                onValueChange={(value) => {
                  setData("stock_status", value);
                  if (errors.stock_status) clearErrors("stock_status");
                }}
                options={stockStatusEnum}
                error={errors.stock_status}
              />
            </div>

            {/* Media */}
            <div className="col-span-6 rounded-sm border border-gray-200 p-4">
              <h3 className="mb-2 text-lg font-semibold tracking-tight">Media</h3>
              <FileField id="thumbnail" label="Thumbnail*" onChange={handleFile("thumbnail")} error={errors.thumbnail} />
              <div>
                <FileField id="images" label="Images" multiple onChange={handleFiles("images", true)} error={errors.images} />
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
              <TextField id="weight" type="number" label="Weight" value={data.weight} onChange={handleChange("weight")} error={errors.weight} />
              <TextField id="length" type="number" label="Length" value={data.length} onChange={handleChange("length")} error={errors.length} />
              <TextField id="width" type="number" label="Width" value={data.width} onChange={handleChange("width")} error={errors.width} />
              <TextField id="height" type="number" label="Height" value={data.height} onChange={handleChange("height")} error={errors.height} />
            </div>

            {/* SEO & Marketing */}
            <div className="col-span-6 rounded-sm border border-gray-200 p-4">
              <h3 className="mb-2 text-lg font-semibold tracking-tight">SEO & Marketing</h3>
              <TextField id="meta_title" type="text" label="Meta Title" value={data.meta_title} onChange={handleChange("meta_title")} error={errors.meta_title} />
              <TextAreaField id="meta_description" label="Meta Description" value={data.meta_description} onChange={handleChange("meta_description")} error={errors.meta_description} />
              <TextField id="tags" type="text" label="Tags (comma separated)" value={data.tags} onChange={handleChange("tags")} error={errors.tags} />
            </div>

            {/* Return & Warranty */}
            <div className="col-span-6 rounded-sm border border-gray-200 p-4">
              <h3 className="mb-2 text-lg font-semibold tracking-tight">Return & Warranty</h3>
              <TextField id="return_days" type="number" label="Return Days*" value={data.return_days} onChange={handleChange("return_days")} error={errors.return_days} />
              <SelectField
                label="Warranty Type*"
                value={data.warranty_type}
                onValueChange={(value) => {
                  setData("warranty_type", value);
                  if (errors.warranty_type) clearErrors("warranty_type");
                }}
                options={warrentTypeEnum}
                error={errors.warranty_type}
              />
              <TextField
                id="warranty_period"
                type="number"
                label="Warranty Period* (in month)"
                value={data.warranty_period}
                onChange={handleChange("warranty_period")}
                error={errors.warranty_period}
              />
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

export default CreateProductDialog;
