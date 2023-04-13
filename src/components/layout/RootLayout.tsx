import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="flex h-full flex-col">
      <Outlet />
    </div>
  );
}

export default RootLayout;
