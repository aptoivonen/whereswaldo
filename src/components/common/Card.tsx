import { twMerge } from 'tailwind-merge';
import CardImg from './CardImg';
import CardTitle from './CardTitle';

export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

function Card({ children, className = '' }: CardProps) {
  return (
    <div className={twMerge('flex flex-col shadow-xl', className)}>
      {children}
    </div>
  );
}

Card.Img = CardImg;
Card.Title = CardTitle;

export default Card;
