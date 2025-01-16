"use client";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const assetTypeValues = ["은행", "카드", "저축"] as const;
const formSchema = z.object({
  name: z
    .string()
    .min(2, "자산명은 최소 2글자 이상이어야 합니다.")
    .max(20, "자산명은 최대 20글자까지 가능합니다."),
  amount: z.preprocess((val) => Number(val), z.number()),
  type: z.enum(assetTypeValues),
});

export default function AddAssetForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      type: undefined,
    },
  });

  // 자산추가 폼 열기/닫기 상태
  const [isOpen, setIsOpen] = React.useState(false);

  const addAssetHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      const model = "assets_duplicate";
      const data = {
        id: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
        created_at: new Date(),
        updated_at: new Date(),
        type: values.type,
        amount: values.amount,
        name: values.name,
        // card: 10,
        // user: uuid
      };

      const res = await fetch("/api/assets", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setIsOpen(false);

      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button>
          <Plus />
          자산추가
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto w-full max-w-sm py-10'>
          <DrawerHeader>
            <DrawerTitle>자산 추가</DrawerTitle>
            <DrawerDescription>원하는 자산을 추가해주세요.</DrawerDescription>
          </DrawerHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(addAssetHandler)}
              className='space-y-6 p-4 pb-5'>
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자산타입</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='자산 타입을 선택해주세요.' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {assetTypeValues.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자산명</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='자산명을 입력해주세요. (2-20자 내외)'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자산금액</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        value={field.value.toLocaleString()}
                        placeholder='금액을 입력해주세요'
                        onChange={(e) => {
                          const inputValue = e.target.value.replace(/,/g, ""); // 기존 콤마 제거
                          if (/^\d*$/.test(inputValue)) {
                            // 숫자만 허용
                            field.onChange(Number(inputValue)); // 상태에 숫자 저장
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>저장</Button>
            </form>
          </Form>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant='outline'>취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
