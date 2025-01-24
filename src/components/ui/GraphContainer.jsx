import React, { useEffect, useState, useCallback, useRef } from "react";
import MainGraph from "./MainGraph";
import DetailPanel from "./DetailPanel";
import RemoteControl from "./RemoteControl";
import TestGraph from "./TestGraph";

const GraphContainer = ({
  data,
  onSearchBoxClick,
  searchedNodeId,
  selectedTitle,
}) => {
  const [nodeInfo, setNodeInfo] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const detailPanelRef = useRef(null);
  const mainGraphRef = useRef(null);

  const handleNodeSelect = useCallback(
    (node) => {
      setSelectedNode(node);
      if (node.type === "titleNode" && data) {
        const nodeData = data.find((row) => row.titleNode === node.id);
        setNodeInfo({
          ...node,
          properties: {
            ...nodeData,
            ...node.properties,
          },
        });
        setIsPanelVisible(true);
      } else {
        setIsPanelVisible(false);
      }
    },
    [data]
  );

  const handleSearchBoxClick = useCallback(() => {
    setIsPanelVisible(false);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (!isPanelVisible) {
      setNodeInfo(null);
    }
  }, [isPanelVisible]);

  useEffect(() => {
    if (onSearchBoxClick) {
      onSearchBoxClick(handleSearchBoxClick);
    }

    const nodeId = searchedNodeId || selectedTitle;
    if (nodeId && mainGraphRef.current) {
      mainGraphRef.current.selectNodeById(nodeId);
    }
  }, [onSearchBoxClick, handleSearchBoxClick, searchedNodeId, selectedTitle]);

  const handleZoomIn = () => {
    if (mainGraphRef.current) {
      mainGraphRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mainGraphRef.current) {
      mainGraphRef.current.zoomOut();
    }
  };

  const handleDepthChange = (depth) => {
    if (mainGraphRef.current) {
      mainGraphRef.current.updateDepth(depth);
      if (selectedNode) {
        mainGraphRef.current.selectNodeById(selectedNode.id);
      }
    }
  };

  const closeDetailPanel = () => {
    setIsPanelVisible(false); // 패널 닫기
  };

  const handleTagClick = useCallback((tagId) => {
    if (mainGraphRef.current) {
      mainGraphRef.current.selectNodeById(tagId);
    }
  }, []);

  return (
    <div>
      <MainGraph
        ref={mainGraphRef}
        data={data}
        initialDepth={1}
        onNodeSelect={handleNodeSelect}
      />
      <DetailPanel
        ref={detailPanelRef}
        node={nodeInfo}
        isVisible={isPanelVisible}
        onClose={closeDetailPanel}
        onTransitionEnd={handleTransitionEnd}
        onTagClick={handleTagClick}
      />
      <RemoteControl
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onDepthChange={handleDepthChange}
      />
    </div>
  );
};

export default GraphContainer;
