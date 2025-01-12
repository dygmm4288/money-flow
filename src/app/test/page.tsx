import { get } from "@/lib/supabase/server/get";
import { TotalAmount } from "../api/pay_total/route";

export default async function TestPage() {
  const data = await get("pay");
  const response = await fetch("http://localhost:3000/api/pay_total", {
    method: "GET",
  });

  const total = (await response.json()) as {
    expense: TotalAmount[];
    income: TotalAmount[];
  };

  return (
    <div>
      {/* {_.map(data, (value) =>
        _.map(value, (value, key) => (
          <div>
            <p>key : {key}</p>
            <p>value: {value}</p>
          </div>
        )),
      )}
      <PostBtn />
      <PutBtn /> */}

      <h1>expense</h1>
      <ul>
        {total.expense.map((item) => (
          <>
            <p>{item.category}</p>
            <p>{item.total_amount}</p>
          </>
        ))}
      </ul>

      <h1>income</h1>
      <ul>
        {total.income.map((item) => (
          <>
            <p>{item.category}</p>
            <p>{item.total_amount}</p>
          </>
        ))}
      </ul>
    </div>
  );
}
