import { SparklesIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <SparklesIcon className="h-8 w-8 text-dutch-orange" />
            <h1 className="text-xl font-bold text-gray-900">
              DutchLearn
            </h1>
          </div>
          {/* 将来的にユーザー情報などをここに配置 */}
        </div>
      </div>
    </header>
  );
}