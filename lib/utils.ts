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
  try {
    const response = await fetch(
      `${process.env.GOOGLE_PAGESPEED_URL}?strategy=${strategy}&category=performance&category=best-practices&category=seo&category=accessibility&url=${url}`
    );

    if (!response.ok) {
      throw new Error("Network response is not ok.");
    }

    const data: ApiResponse = await response.json();

    return {
      categories: data.lighthouseResult.categories,
      fetchTime: formatDateTime(data.lighthouseResult.fetchTime),
      audits: pickAudits(data.lighthouseResult.audits),
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      categories: {
        performance: { score: 0, title: "N/A" },
        accessibility: { score: 0, title: "N/A" },
        seo: { score: 0, title: "N/A" },
        "best-practices": { score: 0, title: "N/A" },
      },
      fetchTime: "N/A",
      audits: {
        "first-contentful-paint": {
          id: "N/A",
          title: "N/A",
          description: "N/A",
          score: 0,
          displayValue: "N/A",
        },
        "first-meaningful-paint": {
          id: "N/A",
          title: "N/A",
          description: "N/A",
          score: 0,
          displayValue: "N/A",
        },
        "speed-index": {
          id: "N/A",
          title: "N/A",
          description: "N/A",
          score: 0,
          displayValue: "N/A",
        },
        "largest-contentful-paint": {
          id: "N/A",
          title: "N/A",
          description: "N/A",
          score: 0,
          displayValue: "N/A",
        },
        "cumulative-layout-shift": {
          id: "N/A",
          title: "N/A",
          description: "N/A",
          score: 0,
          displayValue: "N/A",
        },
      },
    };
  }
};

export const fetchDesktop = async (
  url: string
): Promise<{
  desktopCategories: Categories;
  desktopFetchTime: string;
  desktopAudits: Audits;
}> => {
  try {
    const { categories, fetchTime, audits } = await fetchData(url, "desktop");

    return {
      desktopCategories: categories,
      desktopFetchTime: fetchTime,
      desktopAudits: audits,
    };
  } catch (error) {
    console.error("Error fetching desktop data:", error);
    throw error;
  }
};

export const fetchMobile = async (
  url: string
): Promise<{
  mobileCategories: Categories;
  mobileFetchTime: string;
  mobileAudits: Audits;
}> => {
  try {
    const { categories, fetchTime, audits } = await fetchData(url, "mobile");

    return {
      mobileCategories: categories,
      mobileFetchTime: fetchTime,
      mobileAudits: audits,
    };
  } catch (error) {
    console.error("Error fetching mobile data:", error);
    throw error;
  }
};
