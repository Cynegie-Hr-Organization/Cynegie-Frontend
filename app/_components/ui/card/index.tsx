<<<<<<< HEAD
import * as React from "react";
import { cn } from "../../../../lib/utils";
=======
import * as React from "react"
import { cn } from "../../../../lib/utils"

>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
<<<<<<< HEAD
    className={cn("rounded-lg border bg-white  shadow-sm", className)}
    {...props}
  />
));
Card.displayName = "Card";
=======
    className={cn(
      "rounded-lg border bg-white  shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-4 md:p-6", className)}
    {...props}
  />
<<<<<<< HEAD
));
CardHeader.displayName = "CardHeader";
=======
))
CardHeader.displayName = "CardHeader"
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
<<<<<<< HEAD
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";
=======
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
<<<<<<< HEAD
));
CardDescription.displayName = "CardDescription";
=======
))
CardDescription.displayName = "CardDescription"
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-2 md:p-2 pt-0", className)} {...props} />
<<<<<<< HEAD
));
CardContent.displayName = "CardContent";
=======
))
CardContent.displayName = "CardContent"
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
<<<<<<< HEAD
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
=======
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
