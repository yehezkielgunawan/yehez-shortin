/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Yehez Shortin",
  titleTemplate: "%s",
  defaultTitle: "Yehez Shortin",
  description:
    "Yehezkiel Gunawan's personalized link shortener. (Made using tinyurl API)",
  canonical: "https://shortin.yehezgun.com",
  openGraph: {
    url: "https://shortin.yehezgun.com",
    title: "Yehez Shortin | Personalized Link Shortener",
    description:
      "Yehezkiel Gunawan's personalized link shortener. (Made using tinyurl API)",
    type: "website",
    images: [
      {
        url: "https://og.yehezgun.com/api/base?description=A%20personalized%20link%20shortener%20by%20Yehezkiel%20Gunawan&logo=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F1242%2F1242462.png&siteName=shortin.yehezgun.com&templateTitle=Shortin&theme=dark",
        alt: "shortin.yehezgun.com og-image",
        width: 800,
        height: 600,
      },
    ],
    site_name: "yehez-shortin",
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "https://image.flaticon.com/icons/png/512/1242/1242462.png",
    },
  ],
};

export default defaultSEOConfig;
