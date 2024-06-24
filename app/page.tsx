import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submit } from "@/lib/actions";
import { BookText, Rss } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-auto grow w-full py-8 pad-x">
      <div className="flex flex-col w-full max-w-xl text-center gap-y-4">
        <h2 className="text-2xl md:text-4xl font-bold">
          Optimize Your Website with Personalized Insights
        </h2>
        <p className="text-sm md:text-lg font-medium text-muted-foreground">
          Get actionable insights to improve your website's performance with
          Zap. Share your results in a single click.
        </p>
      </div>

      <form
        action={submit}
        className="w-full max-w-xl flex items-center mt-4 md:mt-8 border-2 border-primary rounded-xl overflow-hidden"
      >
        <Input
          name="url"
          placeholder="Enter your website URL"
          type="url"
          required
          className="border-0 outline-none ring-0 peer"
        />
        <Button type="submit" className="rounded-s-none" variant={"default"}>
          Analyze
        </Button>
      </form>

      <div className="flex items-center justify-center gap-x-8 w-full max-w-xl mt-3">
        <Link href={"https://github.com/msafdev/zap"} target="_blank" className="text-xs md:text-sm font-medium hover:text-foreground text-muted-foreground flex items-center gap-x-2">
          <Rss size={14} className="text-foreground" />
          Contribute
        </Link>
        <Link href={"https://developers.google.com/speed/docs/insights/v5/get-started"} target="_blank" className="text-xs md:text-sm font-medium hover:text-foreground text-muted-foreground flex items-center gap-x-2">
          <BookText size={14} className="text-foreground" />
          Pagespeed API
        </Link>
      </div>
    </main>
  );
}
