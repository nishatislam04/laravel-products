<?php

namespace App\Http\Controllers\Page;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Vendor;
use App\Models\Category;

class SuperAdminPageController extends Controller {
  public function overviewSection() {
    return Inertia::render("super-admin/overview");
  }

  public function vendorSection() {
    $vendors = Vendor::where("status", "Pending")->get();

    return Inertia::render("super-admin/vendors", [
      "vendors" => $vendors
    ]);
  }

  public function userSection() {
    return Inertia::render("super-admin/users");
  }

  public function orderSection() {
    return Inertia::render("super-admin/orders");
  }

  public function categorySection() {
    // Get top-level categories with children recursively
    $categories = Category::whereNull("parent_id")
      ->with([
        "children" => function ($query) {
          $query->orderBy("name");
        },
        "children.children" => function ($query) {
          $query->orderBy("name");
        }
      ]) // load 2-level deep; you can chain more for deeper nesting
      ->orderBy("name")
      ->get();

    $formattedCategories = $this->getIndentedCategories($categories);

    return Inertia::render("super-admin/categories", [
      "categories" => $formattedCategories
    ]);
  }

  private function getIndentedCategories($categories, $prefix = "") {
    $result = [];

    foreach ($categories as $category) {
      $result[] = [
        "id" => $category->id,
        "label" => $prefix . $category->name
      ];

      if ($category->children && $category->children->isNotEmpty()) {
        $result = array_merge(
          $result,
          $this->getIndentedCategories($category->children, $prefix . "— ")
        );
      }
    }

    return $result;
  }

  public function productSection() {
    return Inertia::render("super-admin/products");
  }

  public function marketingSection() {
    return Inertia::render("super-admin/marketing");
  }

  public function analyticsSection() {
    return Inertia::render("super-admin/analytics");
  }

  public function settingsSection() {
    return Inertia::render("super-admin/settings");
  }
}
