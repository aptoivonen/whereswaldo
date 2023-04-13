import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/common';

function RootLayout() {
  return (
    <div className="flex h-full flex-col">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
        }}
      />
      <Outlet />
    </div>
  );
}

export default RootLayout;
