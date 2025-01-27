import { post } from "aws-amplify/api";

export const createList = (payload: any) => {
  try {
    post({
      path: "/lists",
      apiName: "OrderGoodsApi",
      options: {
        body: payload,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
