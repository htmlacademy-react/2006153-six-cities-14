interface ImageComponentProps {
  classProp: string;
  image: string | undefined;
  widthProp?: string;
  heightProp?: string;
}
function ImageComponent({
  classProp,
  image,
  widthProp,
  heightProp,
}: ImageComponentProps) {
  return (
    <img
      width={widthProp}
      height={heightProp}
      className={classProp}
      src={image}
      alt="Photo"
    />
  );
}
export default ImageComponent;
