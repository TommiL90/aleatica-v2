import { cva } from "class-variance-authority";


export const titleVariants = cva(
  "scroll-m-20 tracking-tight",
  {
    variants: {
      variant: {
        h1: "text-4xl font-extrabold lg:text-5xl",
        h2:
          "border-b pb-2 text-3xl font-semibold first:mt-0",
        h3:
          "text-2xl font-semibold",
        h4:
          "text-xl font-semibold",
        h5: "text-l font-semibold",
      },
    },
    defaultVariants: {
      variant: "h2",
    },
  }
)

export const textVariants = cva(
  "text-foreground",
  {
    variants: {
      variant: {
        default: "leading-7 [&:not(:first-child)]:mt-6",
        blockquote:
          "mt-6 border-l-2 pl-6 italic",
        list:
          "my-6 ml-6 list-disc [&>li]:mt-2",
        strong:
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        lead: "text-xl text-muted-foreground",
        large: "text-lg font-semibold",
        small: "text-sm font-medium leading-none",
        muted: "text-sm text-muted-foreground"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)