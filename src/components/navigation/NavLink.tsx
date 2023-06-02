import { NavLink as RRNavLink } from 'react-router-dom';

type LinkProps = {
  to: string;
  children: React.ReactNode;
};

function NavLink({ to, children }: LinkProps) {
  return (
    <li>
      <RRNavLink
        className={({ isActive }) =>
          isActive
            ? 'relative text-red before:absolute before:bottom-[-0.5rem] before:block before:h-1 before:w-full before:bg-red'
            : 'text-red-light'
        }
        to={to}
      >
        {children}
      </RRNavLink>
    </li>
  );
}

export default NavLink;
