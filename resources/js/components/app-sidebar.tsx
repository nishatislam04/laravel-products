import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ScrollArea } from "./ui/scroll-area";

const items = [
    {
        title: "Women's fashion",
        containSubMenu: true,
        subMenu: [
            {
                title: "Women's fashion 1",
                url: "#",
            },
            {
                title: "Women's fashion 2",
                url: "#",
            },
            {
                title: "Women's fashion 3",
                url: "#",
            },
        ],
    },
    {
        title: "Man's fashion",
        containSubMenu: true,
        subMenu: [
            {
                title: "Man's fashion 1",
                url: "#",
            },
            {
                title: "Man's fashion 2",
                url: "#",
            },
            {
                title: "Man's fashion 3",
                url: "#",
            },
        ],
    },
    {
        title: "Electronics",
        url: "#",
    },
    {
        title: "Home & lifestyle",
        url: "#",
    },
    {
        title: "Medicine",
        url: "#",
    },
    {
        title: "Sports & outdoor",
        url: "#",
    },
    {
        title: "Baby & toys",
        url: "#",
    },
    {
        title: "Groceries & pets",
        url: "#",
    },
    {
        title: "Health & beauty",
        url: "#",
    },
];

export function AppSidebar() {
    return (
        <Sidebar className="ml-20">
            <ScrollArea className="h-100 w-full rounded-none border-r-2">
                <SidebarContent className="pt-4">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu className="pt-4">
                                {items.map((item) =>
                                    item.containSubMenu ? (
                                        <Collapsible key={item.title} className="group/collapsible">
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton className="flex w-full items-center justify-between rounded-none pl-0">
                                                        <span>{item.title}</span>
                                                        <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-180" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                {item.subMenu && (
                                                    <CollapsibleContent className="overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                                                        {item.subMenu.map((subItem) => (
                                                            <SidebarMenuSub key={subItem.title}>
                                                                <SidebarMenuSubItem>
                                                                    <Link href={subItem.url}>
                                                                        <span>{subItem.title}</span>
                                                                    </Link>
                                                                </SidebarMenuSubItem>
                                                            </SidebarMenuSub>
                                                        ))}
                                                    </CollapsibleContent>
                                                )}
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    ) : (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link href={item.url ?? "#"} className="rounded-none pl-0">
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ),
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </ScrollArea>
        </Sidebar>
    );
}
