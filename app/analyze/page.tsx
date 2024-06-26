import Pagespeed from "@/components/main/pagespeed";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoveLeft, Share } from "lucide-react";
import Link from "next/link";

export default async function Analyze({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const tweet = 
  `🚀 Check out my website's performance here: https://zap.msaf.tech/analyze?url=${searchParams.url}`;

  return (
    <main className="flex flex-col items-center justify-center h-auto grow w-full py-8 pad-x">
      <div className="flex flex-col w-full max-w-2xl gap-y-3">
        <div className="flex items-end justify-between gap-x-3">
          <h3 className="text-sm md:text-base font-semibold font-mono leading-tight">
            {searchParams.url}
          </h3>

          <Button size={"icon"} variant={"outline"} asChild className="ml-auto">
            <Link href="/">
              <MoveLeft size={16} />
            </Link>
          </Button>
          <Button size={"icon"} variant={"outline"} asChild>
            <Link
              href={`https://twitter.com/intent/tweet?text=${tweet}`}
              target="_blank"
            >
              <Share size={16} />
            </Link>
          </Button>
        </div>

        <div className="w-full flex flex-col border rounded-md overflow-hidden bg-background">
          <Tabs
            defaultValue="desktop"
            className="w-full pt-4 flex flex-col gap-y-5 items-center"
          >
            <TabsList className="w-fit">
              <TabsTrigger value="desktop">Desktop</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
            </TabsList>
            <TabsContent className="w-full" value="desktop">
              <Pagespeed url={searchParams.url as string} strategy="desktop" />
            </TabsContent>
            <TabsContent className="w-full" value="mobile">
              <Pagespeed url={searchParams.url as string} strategy="mobile" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
