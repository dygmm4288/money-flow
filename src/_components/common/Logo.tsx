import Image from "next/image";
type Props = {
  width?: number;
  height?: number;
};

export default function Logo({ width = 24, height = 24 }: Props) {
  return (
    <Image
      alt='money flow logo'
      src='/logo.svg'
      width={width}
      height={height}
    />
  );
}
