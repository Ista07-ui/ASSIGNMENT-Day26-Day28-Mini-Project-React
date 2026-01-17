import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUser } from "@/utils/api";
import withAuth from "@/components/withAuth";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UserDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchUser = async (userId: string) => {
        try {
          const data = await getUser(parseInt(userId));
          setUser(data.data);
        } catch (error) {
          console.error("Failed to fetch user", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser(id as string);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background-light dark:bg-background-dark">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">
          progress_activity
        </span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-background-light dark:bg-background-dark text-text-main dark:text-white">
        <p>User not found.</p>
        <Link href="/" className="text-primary hover:underline mt-4">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark py-20 px-4">
      <div className="max-w-md mx-auto bg-white dark:bg-white/5 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-white/10 flex flex-col items-center text-center">
        <Link
          href="/"
          className="self-start mb-4 text-gray-400 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>

        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mb-6 shadow-lg">
          <img
            src={user.avatar}
            alt={`${user.first_name}`}
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold text-text-main dark:text-white mb-1">
          {user.first_name} {user.last_name}
        </h1>
        <p className="text-text-sub dark:text-gray-400 mb-6 font-medium">
          {user.email}
        </p>

        <div className="w-full pt-6 border-t border-gray-100 dark:border-white/10">
          <p className="text-sm text-gray-500 italic">
            "Member of our awesome community"
          </p>
        </div>
      </div>
    </div>
  );
};

export default withAuth(UserDetail);
