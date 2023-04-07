import { twMerge } from 'tailwind-merge';

export type CardImgProps = {
  src: string;
  alt: string;
  className?: string;
};

function CardImg({ src, alt, className = '' }: CardImgProps) {
  return (
    <div className={twMerge('', className)}>
      <img className="block h-full w-full object-cover" src={src} alt={alt} />
    </div>
  );
}

export default CardImg;
