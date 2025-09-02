import { Link } from "react-router-dom";
// import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgLogo from "@/assets/images/kderma.jpg";

interface LogoProps {
  className?: string;
  size?: "small" | "medium" | "large";
  showText?: boolean;
  linkTo?: string;
}

export const Logo = ({
  className = "",
  size = "large",
  showText = true,
  linkTo = "/",
}: LogoProps) => {
  // Size mapping for logo dimensions
  const sizeMap = {
    small: { width: 24, height: 24 },
    medium: { width: 36, height: 36 },
    large: { width: 48, height: 48 },
  };

  const { width, height } = sizeMap[size];

  const content = (
    <div className={`flex items-center ${className}`}>
      {/* <ImageWithFallback
        src="https://scontent.fmnl25-6.fna.fbcdn.net/v/t39.30808-6/289655119_105745682182299_299380258728884950_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF_f63xfYlTCXJIcjqyN0HwU_SECeEdQs1T9IQJ4R1CzaUUCtXQ7gdICllP2jf9LbqSoYh74hOunttpeiNZE2kk&_nc_ohc=fr-QNgA5xCIQ7kNvwFO1lk9&_nc_oc=AdlJ8FbBivhwsfiFjsQLhNKXT6Dg7gz7e2XD_cyV4YlLrAyJAiZkIR5Rg0AfyzMKSfI&_nc_zt=23&_nc_ht=scontent.fmnl25-6.fna&_nc_gid=FfakwagmK0yRo1AQUUNfYw&oh=00_AfJUgheqgrZQJGcQqPCx9GsaCkT-wuc5ESmi8BmhnPUJzg&oe=682713AD"
        alt="K DERMA Logo"
        width={width}
        height={height}
        className="object-contain"
      /> */}
      <img src={imgLogo}
        alt="K DERMA Logo"
        width={width}
        height={height}
        className="object-contain"
      />
      {showText && (
        <span className="ml-2 font-medium text-[rgba(72,66,68,1)]">
          K DERMA
        </span>
      )}
    </div>
  );

  // If a link is provided, wrap the content in a Link component
  if (linkTo) {
    return <Link to={linkTo}>{content}</Link>;
  }

  return content;
};