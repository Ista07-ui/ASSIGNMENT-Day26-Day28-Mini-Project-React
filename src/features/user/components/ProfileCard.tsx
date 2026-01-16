import Image from "next/image";
import { User } from "../types";

interface ProfileCardProps {
  user: User | null;
  loading: boolean;
  onLogout: () => void;
}

export const ProfileCard = ({ user, loading, onLogout }: ProfileCardProps) => {
  if (loading) {
    return (
      <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-white/5 p-6 shadow-xl animate-pulse">
        <div className="flex flex-col items-center gap-4">
          <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center text-red-500">Failed to load user data</div>;
  }

  return (
    <div className="w-full max-w-sm rounded-[2rem] bg-white dark:bg-[#1a1a1a] p-8 shadow-2xl border border-gray-100 dark:border-white/5 relative overflow-hidden group">
        {/* Background blobs for premium feel */}
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/30 transition-all duration-500"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all duration-500"></div>

      <div className="flex flex-col items-center relative z-10">
        <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-500 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
            <Image
            src={user.avatar || "/assets/default-avatar.png"} // Ensure this path exists or handle fallback
            alt="Profile Avatar"
            width={110}
            height={110}
            className="rounded-full border-4 border-white dark:border-[#2a2a2a] shadow-lg object-cover relative z-10"
            />
            <div className="absolute bottom-0 right-0 bg-green-500 border-2 border-white dark:border-[#2a2a2a] w-5 h-5 rounded-full z-20" title="Active"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {user.first_name} {user.last_name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
          {user.email}
        </p>

        <div className="px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary-dark dark:text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-8">
            {user.role || "Member"}
        </div>

        <div className="w-full grid grid-cols-2 gap-3">
          <button 
            className="px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200 font-semibold text-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Edit Profile
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-semibold text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
