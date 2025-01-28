import { get } from "aws-amplify/api";
import { Product } from "../../constants/types/product";
import { API_PATHS } from "../../constants/types/apiPaths";
import { API_NAME } from "../../constants/globalConstants";

// https://docs.amplify.aws/gen1/react/build-a-backend/restapi/restapi-v5-to-v6-migration-guide/
// to test connection for now
export const getGoods = async (): Promise<Product[] | undefined> => {
  try {
    const res = get({
      path: API_PATHS.GOODS,
      apiName: API_NAME,
    });
    const data = await (await res.response).body.json();
    return data as unknown as Product[];
  } catch (error) {
    console.log(error);
  }
};
