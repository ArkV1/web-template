import React from 'react';

interface AuthFormContainerProps {
  children: React.ReactNode;
}

export default function AuthFormContainer({ children }: AuthFormContainerProps) {
  return (
    <div className="w-full max-w-md p-8 bg-secondary rounded-lg shadow-md">
      <div className="h-full flex flex-col justify-between space-y-6">
        {children}
      </div>
    </div>
  );
}

