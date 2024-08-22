import { api as index } from "..";

const api = index.injectEndpoints({
	endpoints: (builder) => ({
		uploadFile: builder.mutation<
			TODO.UploadFileResponse,
			TODO.UploadFileRequest
		>({
			query: (data) => ({
				url: "/upload/file",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useUploadFileMutation } = api;
