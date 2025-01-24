export function convertGraphData(excelData) {
  const nodeSet = new Set();
  const nodes = [];
  const links = [];

  excelData.forEach((row) => {
    const titleNode = row.titleNode;

    if (!nodeSet.has(titleNode)) {
      nodeSet.add(titleNode);
      nodes.push({ id: titleNode, type: "titleNode" });
    }

    const properties = [
      { key: "yearNode", type: "yearNode" },
      { key: "publisherNode", type: "publisherNode" },
      { key: "placeNode", type: "placeNode" },
      { key: "categoryNode", type: "categoryNode" },
      { key: "tag1", type: "tagNode" },
      { key: "tag2", type: "tagNode" },
      { key: "tag3", type: "tagNode" },
      { key: "tag4", type: "tagNode" },
      { key: "tag5", type: "tagNode" },
      { key: "tag6", type: "tagNode" },
      { key: "tag7", type: "tagNode" },
      { key: "tag8", type: "tagNode" },
      { key: "tag9", type: "tagNode" },
    ];

    // properties.forEach(({ key, type }) => {
    //   const propertyValue = row[key];
    //   if (propertyValue) {
    //     if (!nodeSet.has(propertyValue)) {
    //       nodeSet.add(propertyValue);
    //       nodes.push({ id: propertyValue, type });
    //     }

    //     links.push({ source: titleNode, target: propertyValue });
    //   }
    // });

    properties.forEach(({ key, type }) => {
      let propertyValue = row[key];
      if (propertyValue) {
        // 값에 (분류) 또는 # 추가
        if (key === "categoryNode") {
          propertyValue = `${propertyValue} (분류)`;
        } else if (type === "tagNode") {
          propertyValue = `#${propertyValue}`;
        }

        // 중복 노드 추가 방지
        if (!nodeSet.has(propertyValue)) {
          nodeSet.add(propertyValue);
          nodes.push({ id: propertyValue, type });
        }

        // 항상 링크 추가
        links.push({ source: titleNode, target: propertyValue });
      }
    });
  });

  return {
    nodes,
    links,
  };
}
