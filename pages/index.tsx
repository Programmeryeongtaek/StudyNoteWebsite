import { Inter } from 'next/font/google'
import CreateCardNews from '@/components/CreateCard/CreateCardNews'
import CardNews from './CardNews'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <CardNews />
    </>
  )
}
