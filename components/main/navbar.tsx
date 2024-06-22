import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";

import { ModeToggle } from "../theme";
import { Button } from "../ui/button";
import { Star } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full flex items-center justify-between py-4 pad-x">
      <Link
        href={"/"}
        className="flex w-fit items-center justify-center gap-x-1"
      >
        <Image src={Logo} alt="Logo" className="h-8 w-auto aspect-square" />
        <h1 className="text-xl font-bold">zap</h1>
      </Link>
      <nav>
        <ul className="flex items-center justify-center w-full gap-x-3 font-medium">
          <ModeToggle />
          <Button asChild size={"sm"} className="w-9 h-9 md:w-fit p-0 md:px-3">
            <Link href="/about" className="gap-x-2">
              <Star size={16} />
              <span className="hidden md:inline-block">Star on GitHub</span>
            </Link>
          </Button>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
