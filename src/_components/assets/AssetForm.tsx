"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit3, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface AssetFormProps {
  isEditMode?: boolean;
  bankData?: {
    id: number;
    name: string;
    amount: number;
    type: "은행" | "카드" | "저축";
    card: number | null;
  }[];
  assetData?: {
    id?: number | undefined;
    name: string;
    amount: number;
    type: "은행" | "카드" | "저축";
    card?: number | null;
  };
}

const assetTypeValues = ["은행", "카드", "저축"] as const;
const formSchema = z.object({
  name: z
    .string()
    .min(2, "자산명은 최소 2글자 이상이어야 합니다.")
    .max(20, "자산명은 최대 20글자까지 가능합니다."),
  amount: z.preprocess((val) => Number(val), z.number()),
  type: z.enum(assetTypeValues),
  card: z
    .preprocess((val) => Number(val), z.number())
    .nullable()
    .optional(),
});

export default function AssetForm({
  isEditMode = false,
  bankData,
  assetData,
}: AssetFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: assetData
      ? {
          name: assetData.name,
          amount: assetData.amount,
          type: assetData.type,
          card: assetData.card,
        }
      : {
          name: "",
          amount: 0,
          card: null,
          type: undefined,
        },
  });

  // 자산추가 폼 열기/닫기
  const [isOpen, setIsOpen] = React.useState(false);

  // 자산 추가 핸들러
  const addAssetHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      let cardId = null;

      if (values.type === "카드" && values.card) {
        const cardRes = await fetch("/api/cards", {
          method: "POST",
          body: JSON.stringify({ name: values.name, asset: values.card }),
        });
        const cardData = await cardRes.json();

        cardId = cardData.card.id;

        if (!cardRes.ok) {
          throw new Error("카드 데이터 생성 중 오류가 발생했습니다.");
        }
      }

      const data = {
        name: values.name,
        amount: values.amount,
        type: values.type,
        card: cardId,
      };

      const assetRes = await fetch("/api/assets", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setIsOpen(false);
      console.log(assetRes);

      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const editAssetHandler = async (id: number) => {
    if (!assetData) return;

    try {
      const updateData = {
        id,
        name: form.getValues("name"),
        amount: form.getValues("amount"),
        type: form.getValues("type"),
        card: form.getValues("card") || null,
      };
      const res = fetch(`/api/assets/`, {
        method: "PUT",
        body: JSON.stringify(updateData),
      });

      setIsOpen(false);
    } catch (error) {
      throw new Error();
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        {isEditMode ? (
          <Edit3
            className="cursor-pointer"
            onClick={() => editAssetHandler(Number(assetData?.id))}
          />
        ) : (
          <Button>
            <Plus />
            자산추가
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm py-10">
          <DrawerHeader>
            <DrawerTitle>자산 추가</DrawerTitle>
            <DrawerDescription>원하는 자산을 추가해주세요.</DrawerDescription>
          </DrawerHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(addAssetHandler)}
              className="space-y-6 p-4 pb-5">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자산타입</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ? String(field.value) : ""}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="자산 타입을 선택해주세요." />
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

              {form.watch("type") === "카드" && (
                <FormField
                  control={form.control}
                  name="card"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연동계좌(은행)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ? String(field.value) : ""}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="은행을 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bankData?.map((bank) => (
                            <SelectItem key={bank.id} value={String(bank.id)}>
                              {bank.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자산명</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="자산명을 입력해주세요. (2-20자 내외)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자산금액</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        value={field.value.toLocaleString()}
                        placeholder="금액을 입력해주세요"
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
              {isEditMode ? (
                <Button
                  type="button"
                  onClick={() => editAssetHandler(Number(assetData?.id))}>
                  수정
                </Button>
              ) : (
                <Button type="submit">저장</Button>
              )}
            </form>
          </Form>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
