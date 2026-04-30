import { put } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import { Product } from "../../constants/types/product";
import { API_PATHS } from "../../constants/types/apiPaths";
import { API_NAME } from "../../constants/globalConstants";

export type UpdateProductPayload = Pick<Product, "id"> &
  Partial<Omit<Product, "id">>;

export const updateProduct = async (payload: UpdateProductPayload) => {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();

  const { response } = put({
    path: API_PATHS.GOODS,
    apiName: API_NAME,
    options: {
      headers: {
        Authorization: token ?? "",
      },
      body: payload as unknown as string,
    },
  });

  const res = await response;
  return await res.body.json();
};
