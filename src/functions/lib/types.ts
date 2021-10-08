export type LinkInput = {
  url: string;
  domain: string;
  alias?: string;
  tags?: Array<string>;
};

export type LinkResponse = {
  data: LinkContent;
  code: number;
  errors?: Array<string>;
};

export type LinkContent = {
  url: string;
  domain: string;
  alias: string;
  tags: Array<string>;
  tiny_url: string;
};
