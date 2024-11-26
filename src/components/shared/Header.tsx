import { ThemeToggle } from "../Theme/ThemeToggle";

function Header({ heading }: { heading: string }) {
  return (
    <div className="flex flxe-row items-center justify-between px-8 mt-4">
      <h1 className="text-3xl font-bold uppercase tracking-wide">{heading}</h1>
      <ThemeToggle />
    </div>
  );
}

export default Header;
