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
        url: "https://yehez-og-image.yehezgun.com/**shortin**.yehezgun.com.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fres.cloudinary.com%2Fyehez%2Fimage%2Fupload%2Fv1636202181%2Fpeep_amkhuu.svg&widths=300&heights=300",
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
