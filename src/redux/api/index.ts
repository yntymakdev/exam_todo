import {
	BaseQueryFn,
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: "https://api.elchocrud.pro/api/v1",
});

const baseQueryExtended: BaseQueryFn = async (args, api, extraOptions) => {
	const result = baseQuery(args, api, extraOptions);
	return result;
};

export const api = createApi({
	reducerPath: "api",
	baseQuery: baseQueryExtended,
	refetchOnFocus: true,
	refetchOnReconnect: true,
	tagTypes: ["todo"],
	endpoints: () => ({}),
});
