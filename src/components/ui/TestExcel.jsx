import React, { useCallback, useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { excelDataState, locationPathState } from "../../hooks/excelDataState";
import SearchBox from "../form/SearchBox";
import GraphContainer from "./GraphContainer";
import { useLocation } from "react-router-dom";

const TestExcel = ({ selectedTitle }) => {
  const location = useLocation();
  const setLocationPath = useSetRecoilState(locationPathState);
  const data = useRecoilValue(excelDataState);

  //검색 결과로 받은 노드 ID
  const [searchedNodeId, setSearchedNodeId] = useState(null);
  const [activeTitle, setActiveTitle] = useState(selectedTitle || null); // 현재 활성화된 title 관리

  useEffect(() => {
    setLocationPath(location.pathname);
  }, [location.pathname, setLocationPath]);

  const [handleSearchBoxClick, setHandleSearchBoxClick] = useState(null);

  const onSearchBoxClick = useCallback((handler) => {
    setHandleSearchBoxClick(() => handler);
  }, []);

  //검색 결과 저장
  const handleSearchResult = useCallback((result) => {
    setSearchedNodeId(result);
    setActiveTitle(null);
  }, []);

  useEffect(() => {
    if (selectedTitle) {
      setActiveTitle(selectedTitle); // 새로운 title 설정
      setSearchedNodeId(null); // 검색 결과 초기화
    }
  }, [selectedTitle]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SearchBox
        data={data}
        onSearchBoxClick={handleSearchBoxClick}
        onSearchResult={handleSearchResult}
      />
      <GraphContainer
        data={data}
        onSearchBoxClick={onSearchBoxClick}
        searchedNodeId={searchedNodeId}
        selectedTitle={activeTitle}
      />
    </div>
  );
};

export default TestExcel;
