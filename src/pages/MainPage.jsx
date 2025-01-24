import React, { useState, useEffect } from "react";
import TestExcel from "../components/ui/TestExcel";
import Header from "../components/ui/Header";
import Popup from "../components/ui/Popup";
import Logo from "../components/ui/headerPopup/Logo";

const MainPage = () => {
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (hasVisited) {
      setShowLogo(false);
    } else {
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleSelectedTitle = (title) => {
    setSelectedTitle(title);
  };

  // PopUp이 10초 후에 꺼지도록 설정
  useEffect(() => {
    if (showLogo) {
      const timer = setTimeout(() => {
        setShowLogo(false);
      }, 10000); // 10초 (10000ms)

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [showLogo]);

  return (
    <div className="bg-[#f9f9f9] min-h-screen">
      {showLogo && (
        <Popup
          title="Project DH Bibliography of Modern Korean Periodicals (BMKP)"
          onClose={() => setShowLogo(false)}
          onSelectTitle={handleSelectedTitle}
        />
      )}
      <Header onSelectTitle={handleSelectedTitle}></Header>
      <TestExcel selectedTitle={selectedTitle} />
    </div>
  );
};

export default MainPage;
