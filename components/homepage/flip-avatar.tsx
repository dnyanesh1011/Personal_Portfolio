"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type FlipAvatarProps = React.ComponentProps<"div">;

export function FlipAvatar({
  className,
  style,
  ...props
}: FlipAvatarProps): React.ReactElement {
  return (
      <button
        type="button"
        aria-label="flip avatar"
        className={cn(
          "group relative h-24 w-24 cursor-pointer rounded-full outline-none [perspective:600px]",
          "blur-fade focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
        style={style}
      >
      <div
        className="
          relative h-full w-full
          [transform-style:preserve-3d]
          transition-transform duration-600
          group-hover:[transform:rotateY(180deg)]
        "
      >
        <div
          className="
            absolute inset-0 overflow-hidden rounded-full
            [backface-visibility:hidden]
          "
        >
          <Image
            src="/assets/avatar/avatar_me_1.jpg"
            alt="Dnyanesh Fulsundar"
            width={96}
            height={96}
            sizes="96px"
            className="h-full w-full scale-[1.1] object-cover object-[100%_55%]"
            draggable={false}
            priority
          />
        </div>

        <div
          aria-hidden="true"
          className="
            absolute inset-0 overflow-hidden rounded-full
            [backface-visibility:hidden]
            [transform:rotateY(180deg)]
          "
        >
          <Image
            src="/assets/avatar/kakashi.webp"
            alt=""
            width={96}
            height={96}
            sizes="96px"
            className="h-full w-full object-cover"
            draggable={false}
            priority
          />
        </div>
      </div>
    </button>
  );
}