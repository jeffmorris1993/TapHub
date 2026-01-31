import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/theme';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { PublicLanding } from '@/pages/PublicLanding';
import { ImNewHerePage } from '@/pages/ImNewHere';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<PublicLanding />} />
            <Route path="/new-here" element={<ImNewHerePage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
