"use client";

import { Audits, Categories } from "@/lib/types";
import useSWR from "swr";
import GaugeCircle from "../ui/gauge-circle";
import { Clock } from "lucide-react";
import Loading from "@/app/analyze/loading";

const Pagespeed = ({
  url,
  strategy,
}: {
  url: string;
  strategy: string;
}) => {
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

  const getColor = (value: number) => {
    if (value < 50) {
      return "rgb(239 68 68)";
    } else if (value >= 50 && value < 87) {
      return "rgb(234 179 8)";
    } else {
      return "rgb(34 197 94)";
    }
  };

  const fetcher = async (url: string) => {
    const res = await fetch(url)

    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      throw error
    }

    const data = await res.json()
    const categories: Categories = data.lighthouseResult.categories;
    const audits: Audits = pickAudits(data.lighthouseResult.audits);
    const fetchTime: string = formatDateTime(data.lighthouseResult.fetchTime);

    return {
      categories,
      audits,
      fetchTime
    }
  }

  const { data, isLoading, error } = useSWR(
    `${process.env.NEXT_PUBLIC_GOOGLE_PAGESPEED_URL}&key=${process.env.NEXT_PUBLIC_GOOGLE_PAGESPEED_API_KEY}&url=${url}&strategy=${strategy}`,
    fetcher
  );

  if (isLoading) return <Loading />;

  return (
    <>
      {/* Charts */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 px-4 pb-6 border-b">
        {Object.entries(data?.categories ?? {}).map(
          ([category, { score, title }], index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-y-2"
            >
              <GaugeCircle
                max={100}
                min={0}
                value={score * 100} // Assuming the score is between 0 and 1
                gaugePrimaryColor={getColor(score * 100)}
                gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                className="w-16 h-16 text-sm"
              />
              <span className="text-xs font-semibold text-muted-foreground">
                {title}
              </span>
            </div>
          )
        )}
      </div>

      {/* Metrics */}
      <div className="flex flex-col p-4 md:py-5 md:px-8 gap-y-4 border-b">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground text-left">
          Metrics
        </h3>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {Object.entries(data?.audits ?? {}).map(
            ([audit, { title, score, displayValue }], index) => (
              <div key={index} className="flex gap-x-3">
                <div
                  className="w-2 h-2 rounded-full mt-2"
                  style={{ backgroundColor: getColor(score * 100) }}
                />
                <div className="flex flex-col items-start justify-start gap-y-0.5">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {title}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-foreground">
                    {displayValue}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Time */}
      <div className="w-full py-4 flex items-center justify-center bg-muted gap-x-3">
        <Clock size={12} className="text-muted-foreground" />
        <p className="text-xs sm:text-sm text-muted-foreground text-left">
          {data?.fetchTime ?? ""}
        </p>
      </div>
    </>
  )
};

export default Pagespeed;
