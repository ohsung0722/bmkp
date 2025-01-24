import logo from "./logo.svg";
import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoadingPage from "./pages/LoadingPage";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <Helmet>
        <title>BMKP</title>
        <link rel="icon" href="data:," />
      </Helmet>
      <BrowserRouter>
        <RecoilRoot>
          <div className="App">
            <Suspense fallback={<LoadingPage />}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/origin" element={<MainPage />} />
              </Routes>
            </Suspense>
          </div>
        </RecoilRoot>
      </BrowserRouter>
    </>
  );
}

export default App;
