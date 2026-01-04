import withAuth from "@/components/withAuth";
import Image from "next/image";
import { useState } from "react";

const Profile = () => {
  const [userName, setUserName] = useState<string>(" John Doe");
  const changeUserName = (userData: string) => {
    console.log("user", userData);
    setUserName(userData);
  };

  const arrayNama = ["Gilang", "Budi", "Siti", "Ani", "Rina"];

  return (
    <>


      <div
        className={` flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
      >
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={70}
            priority
          />
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              INI ADALAH PAGE PROFILE {userName}.
            </h1>
            <div>List Nama User</div>
            <div>
              {arrayNama.map((nama: string, key: number) => {
                return (
                  <span
                    key={key}
                    className="cursor-pointer bg-green-400 p-4 mr-4"
                    onClick={() => changeUserName(nama)}
                  >
                    {nama},
                  </span>
                );
              })}
            </div>
            <div
              className="cursor-pointer bg-red-900 p-4 hover:bg-red-400"
              onClick={() => changeUserName("Gilang parameter")}
            >
              Ganti username dong
            </div>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Temukan paduan sempurna antara kesegaran smoothies buah asli dan
              lembutnya homemade cake kami.Cek menu lengkapnya di bio ya!{" "}
              <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Smoothies
              </a>{" "}
              or the{" "}
              <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Cakes
              </a>{" "}
              .
            </p>
          </div>
        </main>
      </div>
    </>
  );
};

export default withAuth(Profile);
