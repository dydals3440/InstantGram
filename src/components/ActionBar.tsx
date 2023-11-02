import React, { useState } from 'react';
import { BookmarkIcon, HeartIcon } from './ui/icons';
import { parseDate } from '@/util/date';
import ToggleButton from './ToggleButton';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import BookMarkFillIcon from './ui/icons/BookMarkFillIcon';

type Props = {
  likes: string[];
  username: string;
  createdAt: string;
  text?: string;
};

export default function ActionBar({ likes, username, text, createdAt }: Props) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  return (
    <>
      <div className='flex justify-between my-2 px-4'>
        <ToggleButton
          toggled={liked}
          onToggle={setLiked}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookmarkIcon />}
          offIcon={<BookMarkFillIcon />}
        />
      </div>
      <div className='px-4 py-1'>
        {/* likes가 있고, length가 있다면 그걸쓰고, 없으면 0씀. */}
        <p className='text-sm font-bold mb-2'>{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {text && (
          <p>
            <span className='font-bold mr-1'>{username}</span>
            {text}
          </p>
        )}
        <p className='text-xs text-neutral-500 uppercase my-2'>
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
