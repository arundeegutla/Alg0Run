import { twMerge } from 'tailwind-merge';
export interface AlertProps {
  alertType: 'good' | 'warning' | 'danger';
  children: React.ReactNode;
  className?: string;
}

export default function Alert({ alertType, children, className }: AlertProps) {
  return (
    <div
      className={twMerge(
        'w-fit flex flex-row items-center justify-center mt-3 text-black p-2 rounded-xl',
        className +
          ' ' +
          (alertType === 'good'
            ? 'bg-green-200'
            : alertType === 'warning'
            ? 'bg-orange-200'
            : alertType === 'danger'
            ? 'bg-red-200'
            : '')
      )}>
      {children}
    </div>
  );
}