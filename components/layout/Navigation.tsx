'use client';

import { HomeIcon, BookOpenIcon, HeartIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { name: 'ダッシュボード', href: '/dashboard', icon: HomeIcon },
  { name: 'レッスン', href: '/lesson', icon: BookOpenIcon },
  { name: 'お気に入り', href: '/favorites', icon: HeartIcon },
  { name: '統計', href: '/stats', icon: ChartBarIcon },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* --- モバイル用ボトムナビゲーション --- */}
      {/* ★修正点: z-indexを z-50 に上げて最前面に表示 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link href={item.href} key={item.name} className="flex flex-col items-center justify-center w-full text-xs text-center hover:bg-gray-100 transition-colors">
                <item.icon className={`h-6 w-6 mb-1 ${isActive ? 'text-dutch-orange' : 'text-gray-400'}`} />
                <span className={isActive ? 'text-dutch-orange font-semibold' : 'text-gray-600'}>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* --- デスクトップ用サイドバー --- */}
      <aside className="hidden md:flex flex-col w-64 h-screen p-4 bg-white border-r border-gray-200">
        <div className="flex items-center gap-2 mb-10">
           {/* 将来的にここにロゴなどを配置 */}
        </div>
        <nav className="flex-1">
          <ul>
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.name}>
                  <Link href={item.href} className={`flex items-center gap-3 px-4 py-3 my-1 rounded-lg transition-colors ${isActive ? 'bg-dutch-orange text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    <item.icon className="h-6 w-6" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
