import { LoaderIcon } from "lucide-react"

import { cn } from "../utils"

function Spinner({
  className,
  ...props
}) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-10 animate-spin", className)}
      {...props} />
  );
}

export { Spinner }
