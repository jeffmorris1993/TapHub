import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/theme';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { PublicLanding } from '@/pages/PublicLanding';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PublicLanding />} />
            {/* Additional routes will be added as features are built */}
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
