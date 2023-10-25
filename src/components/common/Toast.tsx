const BG_COLOR = {
  danger: 'bg-warning',
  success: 'bg-success',
};

type ToastProps = {
  variant: 'danger' | 'success';
  children: React.ReactNode;
};

function Toast({ variant, children }: ToastProps) {
  const bgColor = BG_COLOR[variant];
  return (
    <div className={`rounded-md px-6 py-4 text-white shadow-md ${bgColor}`}>
      {children}
    </div>
  );
}

export default Toast;
