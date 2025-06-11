export default function DashboardPage() {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ダッシュボード
        </h1>
        <p className="text-gray-600">
          ここに学習進捗やストリークが表示されます。
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* 仮のカード */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-bold text-lg">今日の目標</h2>
            <p className="text-sm text-gray-500 mt-1">XPを50獲得する</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-bold text-lg">連続記録</h2>
            <p className="text-sm text-gray-500 mt-1">🔥 0日</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-bold text-lg">次のレッスン</h2>
            <p className="text-sm text-gray-500 mt-1">挨拶の基本</p>
          </div>
        </div>
      </div>
    );
  }
  