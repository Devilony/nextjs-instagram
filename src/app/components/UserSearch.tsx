'use client';

import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import { SearchUser } from '../model/user';
import GridSpinner from './GridSpinner';
import UserCard from './UserCard';
import useDebounce from '../util/hooks/debounce';

export default function UserSearch() {
  const [keyword, setKeyword] = useState('');
  const debouncedSearch = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedSearch}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form className="w-full mb-4" onSubmit={onSubmit}>
        <input
          className="w-full text-xl p-3 outline-none border border-gray-400"
          type="text"
          value={keyword}
          autoFocus
          placeholder="Search for a Username or name"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>{error.message}</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && !users?.length && <p>No user!</p>}
      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
