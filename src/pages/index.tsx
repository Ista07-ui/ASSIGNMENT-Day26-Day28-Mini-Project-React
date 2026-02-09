import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import dynamic from "next/dynamic";
import Head from "next/head";

const UserList = dynamic(() => import("@/components/UserList"), {
  loading: () => <p className="text-center py-10">Loading community...</p>,
  ssr: false, // UserList is client-side only anyway
});

const Home = () => {
  return (
    <>
      <Head>
        <title>Cakes & Smoothies - Premium Quality</title>
        <meta
          name="description"
          content="Delicious cakes and refreshing smoothies. The premium quality you deserve."
        />
        <meta property="og:title" content="Cakes & Smoothies" />
        <meta
          property="og:description"
          content="Delicious cakes and refreshing smoothies."
        />
      </Head>
      <HeroSection />
      <ProductSection />
      <UserList />
    </>
  );
};

export default Home;
