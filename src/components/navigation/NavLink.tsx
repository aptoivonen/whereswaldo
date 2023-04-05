import { NavLink as RRNavLink } from 'react-router-dom';

type LinkProps = {
  to: string;
  children: React.ReactNode;
};

function NavLink({ to, children }: LinkProps) {
  return (
    <li>
      <RRNavLink
        className={({ isActive }) => (isActive ? 'bg-dark text-red' : '')}
        to={to}
      >
        {children}
      </RRNavLink>
    </li>
  );
}

export default NavLink;
