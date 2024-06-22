import Pagespeed from "@/components/main/pagespeed";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Analyze({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const url = searchParams.url as string;
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
              <Pagespeed url={url} strategy="desktop" />
            </TabsContent>
            <TabsContent className="w-full" value="mobile">
              <Pagespeed url={url} strategy="mobile" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
