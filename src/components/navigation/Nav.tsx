import NavLink from './NavLink';

type NavProps = {
  children: React.ReactNode;
};

function Nav({ children }: NavProps) {
  return <ul className="ml-6 flex space-x-4">{children}</ul>;
}

Nav.Link = NavLink;

export default Nav;
