"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AssetTypeSelector from "./AssetTypeSelector";
import { Input } from "@/components/ui/input";
import { SupabaseClient } from "@supabase/supabase-js";
import { handleAddAsset } from "@/app/api/assets/route";

export default function AddAssetForm() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          <Plus />
          자산추가
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>자산 추가</DrawerTitle>
            <DrawerDescription>
              은행/카드/저축 원하는 자산을 추가해주세요.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <AssetTypeSelector />
            </div>
            <div className="mt-3 h-[50px]">
              <Input placeholder="금액" type="number" />
            </div>
            <div className=" h-[50px]">
              <Input placeholder="계좌명" type="text" />
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleAddAsset}>추가</Button>
            <DrawerClose asChild>
              <Button variant="outline">취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
