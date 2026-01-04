import ProductCard from "./header/ProductCard";

const products = [
  {
    name: "Green Detox",
    price: 8.50,
    image: "/assets/green_detox.png",
  },
  {
    name: "Berry Blast",
    price: 7.50,
    image: "/assets/Berry_Blast.png",
  },
    {
    name: "Mango Tango",
    price: 7.50,
    image: "/assets/Mango_Tango.png",
  },
  {
    name: "Acai Bowl",
    price: 7.50,
    image: "/assets/Acai_Bowl.png",
  },
    {
    name: "Iced Latte",
    price: 5.50,
    image: "/assets/Iced_Latte.png",
  },
    {
    name: "Fig & Mixed Berry",
    price: 3.75,
    image: "/assets/Fig&MixedBerry.png",
  },
    {
    name: "Orange Smoothies Bowl",
    price: 5.50,
    image: "/assets/Orange_SmoothiesBowl.png",
  },
  {
    name: "Smoothies Chocolate",
    price: 5.50,
    image: "/assets/Smoothier_Choco.png",
  },
];

const ProductSection = () => {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold mb-4">Popular Smoothies</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((item, index) => (
          <ProductCard
            key={index}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
