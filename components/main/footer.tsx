import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex w-full pad-x py-4 items-center">
      <p className="text-sm text-muted-foreground">
        Made with ❤️ by{" "}
        <Link
          href="https://github.com/msafdev"
          target="_blank"
          className="text-primary hover:underline underline-offset-4"
        >
          @msafdev
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
