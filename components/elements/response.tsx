'use client';

import { cn } from '@/lib/utils';
import { type ComponentProps, memo } from 'react';
import { Streamdown } from 'streamdown';

type ResponseProps = ComponentProps<typeof Streamdown>;

export const Response = memo(
  ({ className, children, ...props }: ResponseProps) => {
    // Process thinking tags and convert to markdown format
    const processedChildren = typeof children === 'string'
      ? children.replace(/<thinking>(.*?)<\/thinking>/gs, (match, content) => {
          return `\n\n> **💭 Thinking:** ${content.trim()}\n\n`;
        })
      : children;

    return (
      <Streamdown
        className={cn(
          'size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_code]:whitespace-pre-wrap [&_code]:break-words [&_pre]:max-w-full [&_pre]:overflow-x-auto',
          className,
        )}
        {...props}
      >
        {processedChildren}
      </Streamdown>
    );
  },
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);

Response.displayName = 'Response';
