
import { useEffect, useState } from "react";
import withAuth from "@/components/withAuth";
import Head from "next/head";

const Profile = () => {
  const [name, setName] = useState("-");
  const [email, setEmail] = useState("");
  const [nohp, setNohp] = useState("");

  function getDataFromLocalStorage() {
    const loggedInUser = localStorage.getItem("userData");
    if (!loggedInUser) return;

    try {
        const parsed = JSON.parse(loggedInUser);
        if (parsed.email) setEmail(parsed.email);
        setName(parsed.email.split("@")[0]); 
    } catch (e) {
        console.error("Error parsing user data", e);
    }
    
    const customUser = localStorage.getItem("loggedInUser");
    if (customUser) {
         try {
            const { name, email, nohp } = JSON.parse(customUser);
            if (name) setName(name);
            if (email) setEmail(email);
            if (nohp) setNohp(nohp);
         } catch (e) {}
    }
  }

  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  return (
    <>
      <Head>
        <title>Ubah Profil</title>
      </Head>
      <main className="min-h-screen bg-gray-50 dark:bg-background-dark py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <section className="md:col-span-1 space-y-4">
             <div className="mb-6">
                <h5 className="text-xl font-bold text-gray-900 dark:text-white">Ubah Profil</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ubah data diri Anda</p>
             </div>

             <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-yellow-400/10 text-yellow-700 rounded-lg cursor-pointer border-l-4 border-yellow-400">
                   <div className="w-8 h-8 flex items-center justify-center bg-yellow-100 rounded-full">
                      <span className="material-symbols-outlined text-lg">person</span>
                   </div>
                   <span className="font-semibold text-sm">Profil Saya</span>
                </div>

                <div className="flex items-center gap-3 p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                </div>

                <div className="flex items-center gap-3 p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                   <div className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full">
                      <span className="material-symbols-outlined text-lg">shopping_basket</span>
                   </div>
                   <span className="font-medium text-sm">Pesanan Saya</span>
                </div>
             </div>
          </section>

          {/* Main Content Form */}
          <section className="md:col-span-3 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 p-8">
            {/* Header Profile Info */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
               <div className="relative">
                 <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white dark:border-white/10 shadow-md">
                    <img 
                      src="/images/Avatarprofile.png" 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + name;
                      }}
                    />
                 </div>
               </div>
               <div className="flex-1 text-center md:text-left">
                  <h5 className="text-xl font-bold text-gray-900 dark:text-white capitalize">{name}</h5>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">{email}</p>
                  {nohp && <p className="text-gray-500 text-sm">{nohp}</p>}
                  <button className="text-primary hover:text-primary-dark text-sm font-semibold mt-1">
                    Ganti Foto Profil
                  </button>
               </div>
            </div>

            <div className="h-px w-full bg-gray-100 dark:bg-white/5 mb-8"></div>

            {/* Form */}
            <form className="space-y-6 max-w-2xl">
              
              {/* Nama Lengkap */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Nama Lengkap</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 dark:bg-white/5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    placeholder="Nama Lengkap"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">E-mail</label>
                <div className="relative">
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 dark:bg-white/5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                    </div>
                </div>
              </div>

              {/* Phone */}
              <div>
                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">No. Hp</label>
                 <div className="flex gap-3">
                    <div className="w-24 shrink-0">
                       <select className="w-full px-3 py-3 rounded-lg border border-gray-300 dark:border-white/10 dark:bg-white/5 bg-transparent outline-none">
                          <option value="+62">+62</option>
                       </select>
                    </div>
                    <input 
                      type="tel"
                      value={nohp}
                      onChange={(e) => setNohp(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 dark:bg-white/5 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      placeholder="812-3456-7890"
                    />
                 </div>
              </div>

              <div className="pt-4">
                 <button 
                   type="button" 
                   className="px-8 py-3 bg-primary hover:bg-primary-dark text-black font-bold rounded-lg shadow-lg shadow-primary/20 transition-all transform active:scale-95"
                 >
                   Simpan
                 </button>
              </div>

            </form>
          </section>
        </div>
      </main>
    </>
  );
};

export default withAuth(Profile);

