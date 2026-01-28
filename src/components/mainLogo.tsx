import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

type LogoProps = {
  size?: number;
  showText?: boolean;
  className?: string;
};

export default function MainLogo({
  size = 32,
  showText = true,
  className,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={clsx("flex items-center gap-2 font-bold", className)}
    >
      <Image
        src="/medix.png"
        alt="Medix logo"
        width={size}
        height={size}
        priority
      />
      {showText && (
        <span className="text-xl" style={{ color: "hsl(168 50% 50%)" }}>
          Medix
        </span>
      )}
    </Link>
  );
}
