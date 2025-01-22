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
import { Edit3, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as React from "react";

const assetTypeValues = ["은행", "카드", "저축"] as const;
const formSchema = z
  .object({
    name: z
      .string()
      .min(2, "자산명은 최소 2글자 이상이어야 합니다.")
      .max(20, "자산명은 최대 20글자까지 가능합니다."),
    amount: z.preprocess((val) => Number(val), z.number()),
    card: z
      .preprocess((val) => Number(val), z.number())
      .nullable()
      .optional(),
    type: z.enum(assetTypeValues),
  })
  .refine(
    (data) => {
      // 카드 타입일 경우, card 필드가 존재해야 함
      if (data.type === "카드" && !data.card) {
        return false;
      }
      return true;
    },
    {
      message: "카드 타입을 선택했을 경우, 연동된 계좌를 선택해야 합니다.",
      path: ["card"], // card 필드에 대한 오류 메시지 표시
    }
  );

interface AssetFormProps {
  isEditMode?: boolean;
  assetData?: {
    id?: number | undefined;
    name: string;
    amount: number;
    type: "은행" | "카드" | "저축";
    card?: number | undefined;
  };
}

interface BankAssetType {
  id: number;
  name: string;
  amount: number;
  type: "은행" | "카드" | "저축";
  card?: number | undefined;
}

export default function AssetForm({
  isEditMode = false,
  assetData,
}: AssetFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: assetData
      ? {
          name: assetData.name,
          amount: assetData.amount,
          card: assetData.card,
          type: assetData.type,
        }
      : {
          name: "",
          amount: 0,
          card: undefined,
          type: undefined,
        },
  });

  // 자산추가 폼 열기/닫기 상태
  const [isOpen, setIsOpen] = React.useState(false);

  // 카드 자산 선택시, 은행 선택 옵션
  const [bankAssets, setBankAssets] = React.useState<BankAssetType[]>([]);

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
        id: Math.floor(Math.random() * (1000000 - 1 + 1)) + 1,
        created_at: new Date(),
        updated_at: new Date(),
        type: values.type,
        amount: values.amount,
        name: values.name,
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

  const editAssetHandler = (id: number) => {
    try {
      const newData = {};
    } catch (error) {
      throw new Error();
    }
  };

  async function fetchBankAssets() {
    const response = await fetch("/api/assets"); // 은행 데이터 가져오기
    const data = await response.json();
    return data.filter((item: BankAssetType) => item.type === "은행");
  }

  // 자산 타입이 카드일 때 은행 데이터 가져오기
  React.useEffect(() => {
    if (form.watch("type") === "카드") {
      fetchBankAssets()
        .then((banks) => {
          setBankAssets(banks);
        })
        .catch(() => {});
    }
  }, [form.watch("type")]);

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
                      defaultValue={field.value}>
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
                        defaultValue={String(field.value)}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="은행을 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bankAssets?.map((bank) => (
                            <SelectItem
                              key={bank.id}
                              value={bank.id.toString()}>
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
                <Button type="button">수정</Button>
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
