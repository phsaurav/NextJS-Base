import React from 'react';
import SignupPage from './components/SignupPage';

interface PageProps {}

const Page: React.FC<PageProps> = () => {
  return (
    <div>
      <SignupPage />
    </div>
  );
};

export default Page;
