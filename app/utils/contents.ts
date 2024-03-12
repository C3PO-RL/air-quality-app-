import { ContentSection, HeroHeader } from '../types/contents'

/* ====================
[> CUSTOMIZING CONTENT <]
-- Setup image by typing `/image-name.file` (Example: `/header-image.jpg`)
-- Add images by adding files to /public folder
-- Leave blank `` if you don't want to put texts or images
 ==================== */

export const heroHeader: HeroHeader = {
  header: `Air Quality Index Checker`,
  subheader: `Check the air quality index of your location`,
  image: `/air-pollution.jpg`,
}

export const featureCards: ContentSection = {
  header: `Powered by`,
  subheader: `What makes Next Landing possible`,
  content: [
    {
      text: `Next.js`,
      subtext: `The React Framework`,
    },
    {
      text: `shadcn/ui`,
      subtext: `Beautifully designed components`,
    },
    {
      text: `Vercel`,
      subtext: `Develop. Preview. Ship.`,
    },
  ],
}

export const features: ContentSection = {
  header: `Features`,
  subheader: `Why use Next Landing?`,
  image: `/features-img.webp`,
  content: [
    {
      text: `SEO Optimized`,
      subtext: `Improved website visibility on search engines`,
    },
    {
      text: `Highly Performant`,
      subtext: `Fast loading times and smooth performance`,
    },
    {
      text: `Easy Customizability`,
      subtext: `Change your content and layout with little effort`,
    },
  ],
}
