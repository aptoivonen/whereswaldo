import { twMerge } from 'tailwind-merge';

export type CardImgProps = {
  children: React.ReactNode;
  className?: string;
};

function CardTitle({ className = '', children }: CardImgProps) {
  return <div className={twMerge('p-2 text-xl', className)}>{children}</div>;
}

export default CardTitle;
