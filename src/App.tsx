import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, FavoritesPage, SpellDetailPage, ErrorPage } from "./pages";
import Navbar from "./components/shared/Navbar";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <main className="container mx-auto p-4">
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomePage />
              </>
            }
          />
          <Route
            path="/spells/:index"
            element={
              <>
                <Navbar />
                <SpellDetailPage />
              </>
            }
          />
          <Route
            path="/favorites"
            element={
              <>
                <Navbar />
                <FavoritesPage />
              </>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
