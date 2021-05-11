import { forwardRef } from 'react';

const Component = forwardRef<HTMLLinkElement, any>(({ children, ...props }, ref) => (
  <a className="font-bold cursor-pointer border-b-2 border-main" ref={ref} {...props}>
    {children}
  </a>
));

Component.displayName = 'PrimaryLink';

export const PrimaryLink = Component;

