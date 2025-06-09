import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryProvider } from "./common/providers/QueryProvider";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { MainLayout } from "./components/Layout/MainLayout";
import { HomePage } from "./pages/Home/HomePage";

function App() {
  return (
    <QueryProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </QueryProvider>
  );
}

export default App;
