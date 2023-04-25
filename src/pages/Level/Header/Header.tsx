import { Container } from '@/components/common';
import HeaderTime from './HeaderTime';
import HeaderQuit from './HeaderQuit';
import HeaderItemContainer from './HeaderItemContainer';
import HeaderTitle from './HeaderTitle';
import HeaderIconContainer from './HeaderIconContainer';
import HeaderIcon from './HeaderIcon';

type HeaderProps = {
  children: React.ReactNode;
};

function Header({ children }: HeaderProps) {
  return (
    <header className="bg-light">
      <Container>
        <div className="flex h-14 items-center justify-between sm:h-16">
          {children}
        </div>
      </Container>
    </header>
  );
}

Header.Time = HeaderTime;
Header.Quit = HeaderQuit;
Header.ItemContainer = HeaderItemContainer;
Header.Title = HeaderTitle;
Header.IconContainer = HeaderIconContainer;
Header.Icon = HeaderIcon;

export default Header;
