/* eslint-disable arrow-body-style */
import { rootApi } from "@/shared/lib/root-api";

export interface IGetTokenPriceRes {
  token: string;
  price: string;
  currency: string;
}

export interface IGetTokenPriceReq {
  query: {
    token: string;
  };
}

const pricesApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getTokenPrice: builder.query<IGetTokenPriceRes, IGetTokenPriceReq>({
      query: ({ query }) => ({
        url: "/prices",
        method: "GET",
        params: query,
      }),
      providesTags: ["prices"],
    }),
  }),
});

export const { useGetTokenPriceQuery } = pricesApi;
export default pricesApi.reducer;
