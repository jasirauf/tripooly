import React, { useMemo, Suspense } from 'react';
// ... existing imports ...

const HomeContent = () => {
  const searchParams = useSearchParams();
  // ... rest of the existing Home component logic ...
  return (
     // ... existing JSX ...
  );
};

const Home = () => {
  return (
    <Suspense fallback={<div className="loading-state">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
};

export default Home;
