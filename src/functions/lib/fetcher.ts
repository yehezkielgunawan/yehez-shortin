import { LinkResponse } from "./types";

import { API_KEY, BASE_URL } from "@/constants/config";

export const submitUrl = async (
  url: string,
  domain: string,
  alias?: string
) => {
  const response = await fetch(`${BASE_URL}create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + API_KEY,
    },
    body: JSON.stringify({
      url,
      domain,
      alias,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: LinkResponse = await response.json();
  return data.data;
};
