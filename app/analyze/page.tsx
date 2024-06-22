import GaugeCircle from "@/components/ui/gauge-circle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Audits, Categories } from "@/lib/types";

import { fetchDesktop, fetchMobile } from "@/lib/utils";
import { Clock } from "lucide-react";

const TabPanel = ({
  audits,
  categories,
  fetchTime,
}: {
  audits: Audits;
  categories: Categories;
  fetchTime: string;
}) => {
  const getColor = (value: number) => {
    if (value < 50) {
      return "rgb(239 68 68)";
    } else if (value >= 50 && value < 87) {
      return "rgb(234 179 8)";
    } else {
      return "rgb(34 197 94)";
    }
  };

  return (
    <>
      {/* Charts */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 px-4 pb-6 border-b">
        {Object.entries(categories).map(
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
          {Object.entries(audits).map(
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
          {fetchTime}
        </p>
      </div>
    </>
  );
};

export default async function Analyze({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { desktopCategories, desktopFetchTime, desktopAudits } =
    await fetchDesktop(searchParams.url as string);
  const { mobileCategories, mobileFetchTime, mobileAudits } = await fetchMobile(
    searchParams.url as string
  );

  return (
    <main className="flex flex-col items-center justify-center h-auto grow w-full py-8 pad-x">
      <div className="flex flex-col w-full max-w-2xl text-center gap-y-4">
        <h3 className="text-sm md:text-base font-semibold">
          Report for <code className="">{searchParams.url}</code>
        </h3>

        <div className="w-full flex flex-col border rounded-xl overflow-hidden">
          <Tabs
            defaultValue="desktop"
            className="w-full pt-4 flex flex-col gap-y-5 items-center"
          >
            <TabsList className="w-fit">
              <TabsTrigger value="desktop">Desktop</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
            </TabsList>
            <TabsContent className="w-full" value="desktop">
              <TabPanel
                audits={desktopAudits}
                categories={desktopCategories}
                fetchTime={desktopFetchTime}
              />
            </TabsContent>
            <TabsContent className="w-full" value="mobile">
              <TabPanel
                audits={mobileAudits}
                categories={mobileCategories}
                fetchTime={mobileFetchTime}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
