import { getUsers } from "@/utils/api";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (page: number) => {
    setLoading(true);
    try {
      const data = await getUsers(page);
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Our Community</h2>
      
      {loading ? (
        <div className="flex justify-center py-10">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">
                progress_activity
            </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <Link key={user.id} href={`/users/${user.id}`}>
              <div className="bg-white dark:bg-white/5 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center group border border-gray-100 dark:border-white/10">
                <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg dark:text-white">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Previous
        </button>
        <span className="text-gray-600 dark:text-gray-400 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
