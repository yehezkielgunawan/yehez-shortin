import axios, { AxiosResponse } from "axios";

import { LinkInput, LinkResponse } from "./types";

export const submitUrl = async (
  url: string,
  domain: string,
  alias?: string
) => {
  return await axios
    .post<LinkInput, AxiosResponse<LinkResponse>>(
      "https://api.tinyurl.com/create",
      {
        url,
        domain,
        alias,
      },
      {
        headers: {
          Authorization:
            "Bearer " +
            "eLLZlxJXW4g9eLT9i3HBCxky4lQUpr29Z5g4ItfMVcSvvtaK4mzkhVjrWLSl",
        },
      }
    )
    .then((res) => {
      return res.data.data;
    });
};
