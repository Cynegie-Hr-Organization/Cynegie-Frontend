<<<<<<< HEAD
import * as React from "react";

import { cn } from "@/lib/utils";
=======
import * as React from "react"

import { cn } from "@/lib/utils"
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
<<<<<<< HEAD
));
Table.displayName = "Table";
=======
))
Table.displayName = "Table"
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
<<<<<<< HEAD
));
TableHeader.displayName = "TableHeader";
=======
))
TableHeader.displayName = "TableHeader"
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
<<<<<<< HEAD
));
TableBody.displayName = "TableBody";
=======
))
TableBody.displayName = "TableBody"
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
<<<<<<< HEAD
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";
=======
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
<<<<<<< HEAD
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";
=======
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
<<<<<<< HEAD
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";
=======
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
<<<<<<< HEAD
));
TableCell.displayName = "TableCell";
=======
))
TableCell.displayName = "TableCell"
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
<<<<<<< HEAD
));
TableCaption.displayName = "TableCaption";
=======
))
TableCaption.displayName = "TableCaption"
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
<<<<<<< HEAD
};
=======
}
>>>>>>> babe6fecba49bf1e0980f00ba744544d1ad7ccfd
