import { get } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import { API_PATHS } from "../../constants/types/apiPaths";
import { API_NAME } from "../../constants/globalConstants";
import { OrderRecord } from "../../constants/types/orderRecord";

export const getListById = async (id: string): Promise<OrderRecord> => {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();

  const { response } = get({
    path: API_PATHS.LISTS,
    apiName: API_NAME,
    options: {
      headers: { Authorization: token ?? "" },
      queryParams: { id },
    },
  });

  const res = await response;
  return (await res.body.json()) as unknown as OrderRecord;
};
