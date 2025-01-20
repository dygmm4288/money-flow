"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export const BreadCrumb = () => {
  const pathName = usePathname();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className='hidden md:block'>
          <BreadcrumbLink href='#'>DashBoard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className='hidden md:block' />
        <BreadcrumbItem>
          <BreadcrumbPage>
            {pathName.includes("/history") ||
            pathName.includes("income") ||
            pathName.includes("expense")
              ? pathName.split("/")[2].replaceAll("/", "")
              : ""}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
