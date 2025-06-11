type Props = {
    current: number;
    total: number;
  };
  
  export default function ProgressBar({ current, total }: Props) {
    const progressPercentage = (current / total) * 100;
  
    return (
      <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    );
  }
  