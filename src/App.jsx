import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { RepositoryAnalyzer } from './pages/RepositoryAnalyzer';
import { Contributors } from './pages/Contributors';
import { Reports } from './pages/Reports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/repository" element={<RepositoryAnalyzer />} />
          <Route path="/contributors" element={<Contributors />} />
          <Route path="/reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
