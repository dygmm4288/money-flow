"use client";

import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { PayData } from "@/types/dashboard/type";
import { Drawer as DrawerPrimitive } from "vaul";

export default function Page() {
  const [payData, setPayData] = React.useState<PayData[]>([]);
  const [status, setStatus] = React.useState<"" | "posting" | "posted">("");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const { watch, setValue, reset } = useForm<PayData>({
    defaultValues: {
      amount: 0,
      category: "",
      created_at: new Date().toISOString(),
      date: "",
      id: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
      location: "",
      riskLevel: "", // 여기서 정하는 게 아님
      tags: [],
      type: "expense", // 해당 컴포넌트에 맞게 수정
    },
  });

  const formProperties = {
    amount: {
      label: "금액",
      value: watch("amount"),
      required: true,
      onChange: (value: number) => setValue("amount", value),
    },
    category: {
      label: "분류",
      value: watch("category"),
      required: true,
      onChange: (value: string) => setValue("category", value),
    },
    date: {
      label: "날짜",
      value: watch("date"),
      required: true,
      onChange: (value: string) => setValue("date", value),
    },
    location: {
      label: "장소",
      value: watch("location"),
      required: false,
      onChange: (value: string) => setValue("location", value),
    },
    tags: {
      label: "태그",
      value: watch("tags"),
      required: false,
      onChange: (value: string[]) => setValue("tags", value),
    },
  };

  // const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   const key = e.key;

  //   if (key === "Enter") {
  //     const value = e.currentTarget.value;
  //   }
  // };

  const addPayHandler = async (values: PayData) => {
    try {
      setStatus("posting");
      const data = watch();

      const res = await fetch("/api/pay", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setStatus("posted");
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setStatus("");
      setIsDrawerOpen(false);
    }
  };

  const getPay = async () => {
    try {
      const res = await fetch("/api/pay", { method: "GET" });
      const data = await res.json();

      setPayData(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (status === "" || status === "posted") {
      getPay();
    }
  }, [status]);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <table className="table-fixed w-full text-center">
        <thead>
          <tr>
            <td className="border-2">분류</td>
            <td className="border-2">금액</td>
            <td className="border-2">장소</td>
            <td className="border-2">날짜</td>
            <td className="border-2">태그</td>
          </tr>
        </thead>
        <tbody>
          {(payData.filter((item) => item.type === "expense") || []).map(
            (item) => {
              return (
                <tr key={item.id} className="animate-slideIn">
                  <td className="border-2 p-2">{item.category}</td>
                  <td className="border-2 p-2 text-right">{item.amount}</td>
                  <td className="border-2 p-2">{item.location}</td>
                  <td className="border-2 p-2">{item.date}</td>
                  <td className="border-2 p-2">{item.tags.join(", ")}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <DrawerTrigger asChild className="fixed bottom-4 right-4">
        <Button
          variant="outline"
          className=" hover: bg-slate-200 text-slate-800"
          onClick={() => setIsDrawerOpen(true)}>
          수익 추가
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center">수입 기록</DrawerTitle>
          </DrawerHeader>
          <div className="w-full">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-4">
                <label className="text-nowrap">
                  {formProperties.amount.label}
                </label>
                <input
                  className="w-full h-full"
                  type="text"
                  value={formProperties.amount.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;
                    formProperties.amount.onChange(Number(value));
                  }}
                />
              </div>
              <div className="flex gap-4">
                <label className="text-nowrap">
                  {formProperties.category.label}
                </label>
                <input
                  className="w-full h-full"
                  type="text"
                  value={formProperties.category.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;
                    formProperties.category.onChange(value);
                  }}
                />
              </div>
              <div className="flex gap-4">
                <label className="text-nowrap">
                  {formProperties.date.label}
                </label>
                <input
                  className="w-full h-full"
                  type="date"
                  value={formProperties.date.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;
                    formProperties.date.onChange(value);
                  }}
                />
              </div>
              <div className="flex gap-4">
                <label className="text-nowrap">
                  {formProperties.location.label}
                </label>
                <input
                  className="w-full h-full"
                  type="text"
                  value={formProperties.location.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;
                    formProperties.location.onChange(value);
                  }}
                />
              </div>
              <div className="flex gap-4">
                <label className="text-nowrap">
                  {formProperties.tags.label}
                </label>
                <input
                  className="w-full h-full"
                  type="text"
                  value={formProperties.tags.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target;
                    formProperties.tags.onChange([value]);
                  }}
                />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={() => addPayHandler(watch())}>등록</Button>
            <DrawerClose asChild>
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                취소
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
