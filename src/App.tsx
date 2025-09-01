import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, FavoritesPage, SpellDetailPage, ErrorPage } from "./pages";
import Navbar from "./components/shared/Navbar";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <main className="container mx-auto p-4">
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spells/:index" element={<SpellDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
