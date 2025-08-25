import ProgressDashboard from '@/components/progress/ProgressDashboard';

export default function ProgressPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-4">
          📊 Learning Progress
        </h1>
        <p className="text-purple-100 text-lg">
          Track your Tagalog learning journey with detailed statistics and insights.
        </p>
      </div>

      {/* Progress Dashboard */}
      <ProgressDashboard />
    </div>
  );
}