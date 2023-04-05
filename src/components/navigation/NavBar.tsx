import NavBarBrand from './NavBarBrand';

type NavBarProps = {
  children: React.ReactNode;
};

function NavBar({ children }: NavBarProps) {
  return <nav className="flex">{children}</nav>;
}

NavBar.Brand = NavBarBrand;

export default NavBar;
