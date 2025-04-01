import { ReviewsList } from '@/containers/reviewsList';
import { Statistics } from '@/containers/statistics';

export default function Home() {
  return (
    <main className='container mx-auto space-y-6 px-2 py-5 sm:px-4 sm:py-10'>
      <Statistics />
      <ReviewsList />
    </main>
  );
}
