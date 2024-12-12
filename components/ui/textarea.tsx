<<<<<<< HEAD
import * as React from "react";

import { cn } from "@/lib/utils";
=======
import * as React from "react"

import { cn } from "@/lib/utils"
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
<<<<<<< HEAD
        className,
=======
        className
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
      )}
      ref={ref}
      {...props}
    />
<<<<<<< HEAD
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
=======
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
