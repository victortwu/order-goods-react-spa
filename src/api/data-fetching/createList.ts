import { post } from "aws-amplify/api";
import { ListPayload } from "../../constants/types/list";
import { API_PATHS } from "../../constants/types/apiPaths";
import { API_NAME } from "../../constants/globalConstants";

export const createList = async (listPayload: ListPayload) => {
  const { response } = post({
    path: API_PATHS.LISTS,
    apiName: API_NAME,
    options: {
      body: listPayload as unknown as string,
    },
  });

  const res = await response;
  return await res.body.json();
};
