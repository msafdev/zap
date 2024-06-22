import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Categories, ApiResponse, Audits } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const pickAudits = (audits: Audits): Audits => ({
  "first-contentful-paint": audits["first-contentful-paint"],
  "first-meaningful-paint": audits["first-meaningful-paint"],
  "speed-index": audits["speed-index"],
  "largest-contentful-paint": audits["largest-contentful-paint"],
  "cumulative-layout-shift": audits["cumulative-layout-shift"],
});

const formatDateTime = (dateTimeStr: string): string => {
  const date = new Date(dateTimeStr);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  }).format(date);
};

const fetchData = async (
  url: string,
  strategy: string
): Promise<{
  categories: Categories;
  fetchTime: string;
  audits: Audits;
}> => {
  const res = await fetch(
    `${process.env.GOOGLE_PAGESPEED_URL}?strategy=${strategy}&category=performance&category=best-practices&category=seo&category=accessibility&url=${url}&key=${process.env.GOOGLE_PAGESPEED_API_KEY}`
  );

  if (!res.ok) {
    return {
      categories: {
        performance: { score: 0, title: "N/A" },
        accessibility: { score: 0, title: "N/A" },
        seo: { score: 0, title: "N/A" },
        "best-practices": { score: 0, title: "N/A" },
      },
      fetchTime: "",
      audits: {
        "first-contentful-paint": {
          id: "",
          title: "",
          description: "",
          score: 0,
          displayValue: "",
        },
        "first-meaningful-paint": {
          id: "",
          title: "",
          description: "",
          score: 0,
          displayValue: "",
        },
        "speed-index": {
          id: "",
          title: "",
          description: "",
          score: 0,
          displayValue: "",
        },
        "largest-contentful-paint": {
          id: "",
          title: "",
          description: "",
          score: 0,
          displayValue: "",
        },
        "cumulative-layout-shift": {
          id: "",
          title: "",
          description: "",
          score: 0,
          displayValue: "",
        },
      },
    };
  }

  const data: ApiResponse = await res.json();
  const categories: Categories = data.lighthouseResult.categories;
  const fetchTime: string = formatDateTime(data.lighthouseResult.fetchTime);
  const audits: Audits = pickAudits(data.lighthouseResult.audits);

  return { categories, fetchTime, audits };
};

export const fetchDesktop = async (
  url: string
): Promise<{
  desktopCategories: Categories;
  desktopFetchTime: string;
  desktopAudits: Audits;
}> => {
  const { categories, fetchTime, audits } = await fetchData(url, "desktop");
  return {
    desktopCategories: categories,
    desktopFetchTime: fetchTime,
    desktopAudits: audits,
  };
};

export const fetchMobile = async (
  url: string
): Promise<{
  mobileCategories: Categories;
  mobileFetchTime: string;
  mobileAudits: Audits;
}> => {
  const { categories, fetchTime, audits } = await fetchData(url, "mobile");
  return {
    mobileCategories: categories,
    mobileFetchTime: fetchTime,
    mobileAudits: audits,
  };
};
