import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type AssetType = "은행" | "카드" | "저축";
const assets: AssetType[] = ["은행", "카드", "저축"];

export default function AssetTypeSelector() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="자산 종류 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>추가할 자산 종류 선택</SelectLabel>
          {assets.map((asset) => (
            <SelectItem value={asset} key={asset}>
              {asset}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
