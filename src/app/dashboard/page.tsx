"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import History from "./history/page";
import Expense from "./expense/page";
import Income from "./income/page";

export default function Page() {
  const pathName = usePathname();

  const renderPage = (pathName: string) => {
    switch (pathName) {
      case "/dashboard":
        return <div>dashBoard</div>;
      case "/dashboard/income":
        return <Income />;
      case "/dashboard/expense":
        return <Expense />;
      case "/dashboard/history":
        return <History />;
    }
  };
  return <main className="px-4 py-4">dashboard Page</main>;
}
