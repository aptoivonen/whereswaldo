import NavLink from './NavLink';

type NavProps = {
  children: React.ReactNode;
};

function Nav({ children }: NavProps) {
  return <ul className="ml-20 flex space-x-8">{children}</ul>;
}

Nav.Link = NavLink;

export default Nav;
