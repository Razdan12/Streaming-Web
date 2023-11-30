import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./component/Loading";
import ProtectedRoute from "./config/Config";

// Mengimpor komponen-komponen yang akan diimpor secara dinamis
const About = lazy(() => import("./pages/About"));
const SyaratDanKetentuan = lazy(() => import("./pages/SyaratDanKetentuan"));
const Home = lazy(() => import("./pages/Home"));
const PilihAkun = lazy(() => import("./pages/PilihAkun"));
const Register = lazy(() => import("./pages/Register/Register"));
const CaraPembayaran = lazy(() => import("./pages/Register/CaraPembayaran"));
const KategoriMusic = lazy(() => import("./pages/Music/KategoriMusic"));
const KategoriVideo = lazy(() => import("./pages/Video/KategoriVideo"));
const Detail = lazy(() => import("./pages/Detail"));
const MusicHome = lazy(() => import("./pages/Music/MusicHome"));
const VideoHome = lazy(() => import("./pages/Video/VideoHome"));
const PlayVideo = lazy(() => import("./pages/Video/PlayVideo"));
const PlayMusic = lazy(() => import("./pages/Music/PlayMusic"));
const Search = lazy(() => import("./pages/Search"));
const KonfirmBayar = lazy(() => import("./pages/Register/KonfirmBayar"));
const PilihMetode = lazy(() => import("./pages/Register/PilihMetode"));
const PilihPaket = lazy(() => import("./pages/Register/PilihPaket"));
const Konfirmasi = lazy(() => import("./pages/Register/KonfirmasiPaket"));
const InformasiAkun = lazy(() => import("./pages/Profile/InformasiAkun"));
const PusatBantuan = lazy(() => import("./pages/Profile/PusatBantuan"));
const Perpustakaan = lazy(() => import("./pages/Profile/Perpustakaan"));
const PerbaruiPaket = lazy(() => import("./pages/PerbaruiPaket"));
const Invoice = lazy(() => import("./pages/Profile/Invoice"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />

          <Route
            path="/pilihakun"
            element={
              <Suspense fallback={<Loading />}>
                <PilihAkun />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/Cara-Bayar"
            element={
              <Suspense fallback={<Loading />}>
                <CaraPembayaran />
              </Suspense>
            }
          />

          <Route
            path="/kategorimusik"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <KategoriMusic />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/kategorivideo"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <KategoriVideo />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/detail"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <Detail />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/musik"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <MusicHome />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/video"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <VideoHome />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/video/play"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <PlayVideo />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/musik/play"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <PlayMusic />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/search"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              </Suspense>
            }
          />

          <Route
            path="/Konfirmasi-Pembayaran"
            element={
              <Suspense fallback={<Loading />}>
                <KonfirmBayar />
              </Suspense>
            }
          />
          <Route
            path="/Pilih-Metode"
            element={
              <Suspense fallback={<Loading />}>
                <PilihMetode />
              </Suspense>
            }
          />
          <Route
            path="/Pilih-Paket"
            element={
              <Suspense fallback={<Loading />}>
                <PilihPaket />
              </Suspense>
            }
          />
          <Route
            path="/konfirmasi-paket"
            element={
              <Suspense fallback={<Loading />}>
                <Konfirmasi />
              </Suspense>
            }
          />
          <Route
            path="/informasiakun"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <InformasiAkun />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/pusatbantuan"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <PusatBantuan />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/perpustakaan"
            element={
              <Suspense fallback={<Loading />}>
                <ProtectedRoute>
                  <Perpustakaan />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            path="/perbaruipaket"
            element={
              <Suspense fallback={<Loading />}>
                <PerbaruiPaket />
              </Suspense>
            }
          />

          <Route
            path="/about"
            element={
              <Suspense fallback={<Loading />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/s&k"
            element={
              <Suspense fallback={<Loading />}>
                <SyaratDanKetentuan />
              </Suspense>
            }
          />
          <Route
            path="/invoice"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loading />}>
                  <Invoice />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route path="/loading" element={<Loading />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
