/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "yehez-shortin",
  titleTemplate: "%s",
  defaultTitle: "yehez-shortin",
  description: "Yehezkiel Gunawan's personalized link shortener",
  canonical: "https://yehez-nextchakra-starter.yehezgun.com",
  openGraph: {
    url: "https://yehez-nextchakra-starter.yehezgun.com",
    title: "yehez-shortin",
    description: "Yehezkiel Gunawan's personalized link shortener.",
    type: "website",
    images: [
      {
        url: "https://yehez-og-image.yehezgun.com/**link**.yehezgun.com.png?theme=dark&md=1&fontSize=50px&images=https%3A%2F%2Fres.cloudinary.com%2Fyehez%2Fimage%2Fupload%2Fv1631970666%2Fyehez_avatar_vkv7pc.png&widths=200&heights=200",
        alt: "link.yehezgun.com og-image",
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
