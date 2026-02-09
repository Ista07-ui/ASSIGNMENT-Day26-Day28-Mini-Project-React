type ProductCardProps = {
  name: string;
  price: number;
  image: string;
};

import Image from "next/image";

const ProductCard = ({ name, price, image }: ProductCardProps) => {
  return (
    <article className="p-3 rounded-xl bg-white shadow">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>

      <p className="font-bold mt-2">{name}</p>
      <p className="text-sm text-gray-500">${price}</p>
    </article>
  );
};

export default ProductCard;
