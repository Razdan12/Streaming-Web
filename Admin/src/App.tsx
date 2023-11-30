import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./config/Auth";
import Loading from "./componen/Loading";
// import Faq from "./page/Faq";
// import Crop from "./componen/Crop";
// import CropImage from "./componen/croping/CropImage";

// import CropImage from "./componen/CropImage";


// Lazy load your components
const Home = lazy(() => import("./page/Home"));
const User = lazy(() => import("./page/User"));
const Kategori = lazy(() => import("./page/Kategori"));
const Paket = lazy(() => import("./page/Paket"));
const Login = lazy(() => import("./page/Login"));
const UploadVideo = lazy(() => import("./page/Video"));
const UploadMusik = lazy(() => import("./page/Musik"));
const KelolaBanner = lazy(() => import("./page/Banner"));
const HistoryPayment = lazy(() => import("./page/HistoryPayment"));
const HistorySiplah = lazy(() => import("./page/HistorySiplah"));
const Voucher = lazy(() => import("./page/Voucher"));
const PaketVideo = lazy(() => import("./page/PaketVideo"));
const PaketMusik = lazy(() => import("./page/PaketMusik"));
const Faq = lazy(() => import("./page/Faq"))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading/>}>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/user"
          element={
            <Suspense fallback={<Loading/>}>
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/kategori"
          element={
            <Suspense fallback={<Loading/>}>
              <ProtectedRoute>
                <Kategori />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/paket"
          element={
            <Suspense fallback={<Loading/>}>
              <ProtectedRoute>
                <Paket />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/video"
          element={
            <Suspense fallback={<Loading/>}>
              <ProtectedRoute>
                <UploadVideo />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/musik"
          element={
            <Suspense fallback={<Loading/>}>
              <ProtectedRoute>
                <UploadMusik />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/banner"
          element={
            <Suspense fallback={<Loading/>}>
              <ProtectedRoute>
                <KelolaBanner />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/payment"
          element={
            <Suspense fallback={<Loading/>}>
              <ProtectedRoute>
                <HistoryPayment />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/siplah"
          element={
            <Suspense fallback={<Loading/>}>
              <ProtectedRoute>
                <HistorySiplah />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/voucher"
          element={
            <Suspense fallback={<Loading/>}>
              <ProtectedRoute>
                <Voucher />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/paket-video"
          element={
            <Suspense fallback={<Loading/>}>
              <ProtectedRoute>
                <PaketVideo />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/paket-musik"
          element={
            <Suspense fallback={<Loading/>}>
              <ProtectedRoute>
                <PaketMusik />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="/faq"
          element={
            <Suspense fallback={<Loading/>}>
              <ProtectedRoute>
                <Faq />
              </ProtectedRoute>
            </Suspense>
          }
        />
        
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
