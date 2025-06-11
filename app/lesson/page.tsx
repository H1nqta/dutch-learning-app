import { dummyLessons } from '@/lib/dummy-data';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

export default function LessonSelectionPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        レッスンを選択
      </h1>
      <div className="space-y-4">
        {dummyLessons.map((lesson) => (
          <Link
            href={`/lesson/${lesson.id}`}
            key={lesson.id}
            className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-transparent hover:border-dutch-orange"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-bold text-xl text-gray-800">{lesson.title}</h2>
                <p className="text-gray-500 mt-1">{lesson.description}</p>
              </div>
              <ChevronRightIcon className="h-6 w-6 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
