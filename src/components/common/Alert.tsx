import { twMerge } from 'tailwind-merge';

type Variant = 'warning' | 'success';

export type AlertProps = {
  children: React.ReactNode;
  className?: string;
  variant: Variant;
};

const variants = {
  warning: 'bg-warning',
  success: 'bg-success',
};

function Alert({ children, variant, className = '' }: AlertProps) {
  return (
    <div
      className={twMerge(`${variants[variant]} p-4 text-white`, className)}
      role="alert"
    >
      {children}
    </div>
  );
}

export default Alert;
