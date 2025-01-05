import { get } from "@/lib/supabase/get";
import _ from "lodash";

export default async function TestPage() {
  const data = await get("pay");

  return (
    <div>
      {_.map(data, (value) =>
        _.map(value, (value, key) => (
          <div>
            <p>key : {key}</p>
            <p>value: {value}</p>
          </div>
        )),
      )}
    </div>
  );
}
