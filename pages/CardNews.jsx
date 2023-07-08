import React from 'react';
import CardNewsList from '@/components/CardNewsList';
import Link from 'next/link';
const CardNews = () => {
  return (
    <div>
      <div>
        <Link href={'/CreateCardNews'}>
          <button>카드 생성</button>
        </Link>
      </div>
      <hr />
      <div>
        <CardNewsList />
      </div>
    </div>
  )
}

export default CardNews;