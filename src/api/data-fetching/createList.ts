import { post } from "aws-amplify/api";
import { ListPayload } from "../../constants/types/list";
import { API_PATHS } from "../../constants/types/apiPaths";
import { API_NAME } from "../../constants/globalConstants";

export const createList = async (listPayload: ListPayload) => {
  try {
    return await post({
      path: API_PATHS.LISTS,
      apiName: API_NAME,
      options: {
        body: listPayload as unknown as string,
      },
    }).response;
  } catch (error) {
    console.log(error);
  }
};
