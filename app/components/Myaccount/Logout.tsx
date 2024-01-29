import directus from '@/app/api/directus/clients';
import { logout } from '@directus/sdk';
import { useRouter } from 'next/navigation';
import React from 'react';

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const result = await directus.logout();
      router.push('/login');
      console.log(result)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className="absolute bg-pink-100 text-pink-500 font-medium px-3 py-1 text-sm rounded-full"
        onClick={handleLogout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 float-left mr-1 relative top-[2px]"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
        </svg>{' '}
        Log out
      </button>
    </div>
  );
};

export default Logout;