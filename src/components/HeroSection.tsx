import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="px-6 lg:px-20 py-10">
    <div className="relative w-full h-[260px]">
      <Image
        src="/assets/Acai_Bowl.png"
        alt="Acai Bowl"
        fill
        className="object-cover rounded-2xl"
        priority
      />
    </div>

      <div className="mt-8">
        <h1 className="text-3xl font-extrabold text-primary mb-4">
          THE PREMIUM QUALITY
        </h1>

        <p className="text-gray-500 mb-6">
          Cake kekinian & smoothies yang wajib kamu coba.
        </p>

        <button className="px-6 py-3 rounded-full bg-primary font-semibold">
          Read More
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
