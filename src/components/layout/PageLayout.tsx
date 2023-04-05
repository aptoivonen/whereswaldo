import { Outlet } from 'react-router-dom';
import NavBar from '@/components/navigation/NavBar';
import Nav from '@/components/navigation/Nav';

const brand = { route: '/', content: "Where's Waldo" };

const navLinks = [
  { id: 'home', route: '/', content: 'Home' },
  { id: 'scoreboard', route: '/scoreboard', content: 'Scoreboard' },
];

function PageLayout() {
  return (
    <>
      <NavBar>
        <NavBar.Brand to={brand.route}>{brand.content}</NavBar.Brand>
        <Nav>
          {navLinks.map((navLink) => (
            <Nav.Link key={navLink.id} to={navLink.route}>
              {navLink.content}
            </Nav.Link>
          ))}
        </Nav>
      </NavBar>
      <Outlet />
    </>
  );
}

export default PageLayout;
