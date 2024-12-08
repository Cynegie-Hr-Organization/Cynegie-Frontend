import { DivProp, ImageProp } from "@/utils/ElemProp";
import { FC, ReactNode } from "react";

interface props extends DivProp {
  icon?: ReactNode;
  headerText?: string | ReactNode;
  paragraphText?: string | ReactNode;
  image?: {
    src: string;
    alt: string;
    width?: string | number;
  };
}

const Cards: FC<props> = ({
  icon,
  headerText,
  paragraphText,
  image,
  children,
  ...props
}) => {
  return (
    <>
      <div className={"shadow-xl px-5 py-8 rounded-md"} {...props}>
        {icon}
        <h1 className={"text-xl text-PennBlue font-bold mb-2 lg:text-2xl"}>
          {headerText}
        </h1>
        <p className={"text-Charcoal leading-normal"}>{paragraphText}</p>
        <figure>
          {image && (
            <Image src={image.src} alt={image.alt} width={image.width} />
          )}
        </figure>
        {children}
      </div>
    </>
  );
};

interface ImageProps extends ImageProp {
  src: string;
  alt: string;
  width?: string | number;
}
export const Image: FC<ImageProps> = ({ src, alt, width, ...props }) => {
  return <img src={src} alt={alt} width={width} {...props} />;
};

export default Cards;
