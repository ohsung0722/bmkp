import { Loader2 } from "lucide-react";

const LoadingPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
    <div className="text-center">
      <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Loading...
      </h2>
      <p className="text-gray-500 dark:text-gray-400">
        Please wait while we prepare your experience.
      </p>
    </div>
  </div>
);

export default LoadingPage;
