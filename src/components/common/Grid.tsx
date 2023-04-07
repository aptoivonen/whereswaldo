import { twMerge } from 'tailwind-merge';

export type GridProps = {
  children: React.ReactNode;
  min?: React.CSSProperties['width'];
  className?: string;
};

function Grid({ min = '0', children, className = '' }: GridProps) {
  return (
    <div
      className={twMerge(
        `grid grid-cols-[repeat(auto-fit,_minmax(${min},_1fr))]`,
        className
      )}
    >
      {children}
    </div>
  );
}

export default Grid;
