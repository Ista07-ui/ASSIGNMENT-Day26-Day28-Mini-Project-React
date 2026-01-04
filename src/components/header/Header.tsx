import TopNav from "@/components/TopNav";
import MainNav from "@/components/MainNav";

interface HeaderProps {
  showMainNav?: boolean;
}

const Header = ({ showMainNav = true }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 shadow bg-white">
      <TopNav />
      {showMainNav && <MainNav />}
    </header>
  );
};
export default Header;
