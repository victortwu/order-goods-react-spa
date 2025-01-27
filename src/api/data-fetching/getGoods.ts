import { get } from "aws-amplify/api";
// https://docs.amplify.aws/gen1/react/build-a-backend/restapi/restapi-v5-to-v6-migration-guide/
// to test connection for now
export const getGoods = async () => {
  try {
    const res = get({
      path: "/goods",
      apiName: "OrderGoodsApi",
    });
    const data = await (await res.response).body.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
