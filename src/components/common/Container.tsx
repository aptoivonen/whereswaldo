import { twMerge } from 'tailwind-merge';

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      className={twMerge(
        'mx-auto w-full px-4 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl',
        className
      )}
    >
      {children}
    </div>
  );
}

export default Container;
