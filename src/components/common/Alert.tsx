import { twMerge } from 'tailwind-merge';

type Variant = 'warning' | 'success';

export type AlertProps = {
  children: React.ReactNode;
  className?: string;
  variant: Variant;
};

type BgVariant = `bg-${Variant}`;

function Alert({ children, variant, className = '' }: AlertProps) {
  const bgVariant: BgVariant = `bg-${variant}`;
  return (
    <div
      className={twMerge(`${bgVariant} p-4 text-dark`, className)}
      role="alert"
    >
      {children}
    </div>
  );
}

export default Alert;
