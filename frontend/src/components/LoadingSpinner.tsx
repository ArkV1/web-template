import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', color = 'currentColor' }) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-6 w-6 border-2',
    large: 'h-8 w-8 border-3',
  };

  return (
    <div 
      className={`inline-block animate-spin rounded-full border-solid border-t-transparent ${sizeClasses[size]}`}
      style={{ borderColor: `${color} transparent transparent transparent` }}
    ></div>
  );
};

export default LoadingSpinner;
