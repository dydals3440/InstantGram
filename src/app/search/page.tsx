import UserSearch from '@/components/UserSearch';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'User Search',
  description: 'Search Users to Follow',
};

export default function SearchPage() {
  return (
    <>
      <UserSearch />
    </>
  );
}
