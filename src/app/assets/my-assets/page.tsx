import AssetList from "@/_components/assets/AssetList";
import { get } from "@/lib/supabase/server/get";
import { Banknote, CreditCard, PiggyBankIcon } from "lucide-react";

interface AssetType {
  id: string;
  created_at: string;
  updated_at: string;
  type: string;
  amount: number;
  name: string;
  card: string | null;
}

export default async function Page() {
  const { data } = await get("assets");
  const filterByAssetTypes = {
    banks: data?.filter((item: AssetType) => item.type === "은행") || [],
    cards: data?.filter((item: AssetType) => item.type === "카드") || [],
    savings: data?.filter((item: AssetType) => item.type === "저축") || [],
  };

  const calculateTotal = (items: AssetType[]) =>
    items.reduce((total, item) => total + item.amount, 0);

  return (
    <div className='flex flex-col gap-10 mr-1'>
      <div>
        <AssetList
          icon={<Banknote />}
          categoryName='은행'
          totalAmount={calculateTotal(filterByAssetTypes.banks)}
        />
        <ul className='flex flex-col gap-2'>
          {filterByAssetTypes.banks.map((item) => (
            <li key={item.id} className='flex items-center justify-between'>
              <span>{item.name}</span>
              <span>{item.amount.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <AssetList
          icon={<CreditCard />}
          categoryName='카드'
          totalAmount={calculateTotal(filterByAssetTypes.cards)}
        />
        <ul className='flex flex-col gap-2'>
          {filterByAssetTypes.cards.map((item) => (
            <li key={item.id} className='flex items-center justify-between'>
              <span>{item.name}</span>
              <span>{item.amount.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <AssetList
          icon={<PiggyBankIcon />}
          categoryName='저축'
          totalAmount={calculateTotal(filterByAssetTypes.savings)}
        />
        <ul className='flex flex-col gap-2'>
          {filterByAssetTypes.savings.map((item) => (
            <li key={item.id} className='flex items-center justify-between'>
              <span>{item.name}</span>
              <span>{item.amount.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
