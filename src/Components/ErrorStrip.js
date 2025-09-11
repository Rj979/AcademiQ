const ErrorStrip = ({ error }) => {
  // Extract error message from various possible error formats
  const getErrorMessage = (error) => {
    if (!error) return "";
    
    // Handle our custom error format
    if (error.message) return error.message;
    
    // Handle axios error formats
    if (error.response?.data?.error) return error.response.data.error;
    if (error.response?.data?.message) return error.response.data.message;
    if (error.response?.data) {
      if (typeof error.response.data === 'string') return error.response.data;
    }
    if (error.data?.message) return error.data.message;
    
    // Fallback for unknown error formats
    return "An error occurred. Please try again.";
  };

  const errorMessage = getErrorMessage(error);
  
  if (!errorMessage) return null;
  
  return (
    <div className="mt-2 mb-1 p-2 rounded-md bg-red-100 border border-red-300 dark:bg-red-900/20 dark:border-red-600">
      <p className="text-sm font-medium text-red-700 dark:text-red-400 text-center">
        {errorMessage}
      </p>
    </div>
  );
};

export default ErrorStrip;
