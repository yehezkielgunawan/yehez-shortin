import axios, { AxiosResponse } from "axios";

import { LinkInput, LinkResponse } from "./types";

import { API_KEY, BASE_URL } from "@/constants/config";

export const submitUrl = async (
  url: string,
  domain: string,
  alias?: string
) => {
  return await axios
    .post<LinkInput, AxiosResponse<LinkResponse>>(
      `${BASE_URL}create`,
      {
        url,
        domain,
        alias,
      },
      {
        headers: {
          Authorization: "Bearer " + API_KEY,
        },
      }
    )
    .then((res: AxiosResponse<LinkResponse>) => {
      return res.data.data;
    });
};
