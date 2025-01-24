import React, {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import * as d3 from "d3";
import { convertGraphData } from "../../data/convertGraphData";

const TestGraph = forwardRef(
  ({ data, initialDepth = 1, onNodeSelect }, ref) => {
    const svgRef = useRef();
    const depthRef = useRef(initialDepth);
    const graphData = useMemo(() => convertGraphData(data), [data]);

    const nodesRef = useRef();
    const linksRef = useRef();
    const textsRef = useRef();
    const rectsRef = useRef();
    const selectedNodeRef = useRef();
    const isDragStarted = useRef();
    const zoomRef = useRef();

    const dfs = useCallback(
      (node, currentDepth, visited) => {
        if (currentDepth > depthRef.current || visited.has(node.id)) return;
        visited.add(node.id);

        const neighbors = graphData.links
          .filter(
            (link) => link.source.id === node.id || link.target.id === node.id
          )
          .map((link) =>
            link.source.id === node.id ? link.target : link.source
          );

        neighbors.forEach((neighbor) =>
          dfs(neighbor, currentDepth + 1, visited)
        );
      },
      [graphData.links]
    );

    const highlightNode = useCallback(
      (selectedNode) => {
        const visited = new Set();
        dfs(selectedNode, 0, visited);

        nodesRef.current
          .attr("opacity", (d) => (visited.has(d.id) ? 1 : 0.1))
          .attr("stroke", (d) =>
            d.id === selectedNode.id ? "#f1d2d1" : "none"
          )
          .attr("stroke-width", (d) =>
            d.id === selectedNode.id ? (d.type === "titleNode" ? 10 : 6) : 0
          );
        linksRef.current.attr("opacity", (d) =>
          visited.has(d.source.id) && visited.has(d.target.id) ? 1 : 0.1
        );
        textsRef.current.attr("opacity", (d) => (visited.has(d.id) ? 1 : 0.1));
        rectsRef.current.attr("opacity", (d) => (visited.has(d.id) ? 1 : 0.1));
      },
      [dfs]
    );

    const handleNodeClick = useCallback(
      (event, d) => {
        highlightNode(d);
        onNodeSelect(d);
      },
      [onNodeSelect, highlightNode]
    );

    // 외부에서 호출할 수 있는 zoomIn, zoomOut 함수 정의
    useImperativeHandle(ref, () => ({
      zoomIn: () => {
        const svg = d3.select(svgRef.current);
        const width = window.innerWidth;
        const height = document.body.scrollTop + window.innerHeight / 2;

        // 화면 중심을 기준으로 확대
        svg
          .transition()
          .duration(300)
          .call(zoomRef.current.scaleBy, 1.5, [width / 2, height / 2]);
      },
      zoomOut: () => {
        const svg = d3.select(svgRef.current);
        const width = window.innerWidth;
        const height = document.body.scrollTop + window.innerHeight / 2;

        svg
          .transition()
          .duration(300)
          .call(zoomRef.current.scaleBy, 0.5, [width / 2, height / 2]);
      },
      selectNodeById: (nodeId) => {
        const node = graphData.nodes.find((n) => n.id === nodeId);
        if (node) {
          highlightNode(node);
          focusOnNode(node); // 노드를 화면 중앙으로 이동
          onNodeSelect(node); // 선택된 노드의 정보를 전달
        }
      },
      updateDepth: (newDepth) => {
        depthRef.current = newDepth;
      },
    }));

    const focusOnNode = (node) => {
      const svg = d3.select(svgRef.current);
      const width = window.innerWidth;
      const height = document.body.scrollTop + window.innerHeight / 2;

      // 현재 zoom 수준 을 유지하면서 노드를 중앙으로 이동시키는 transform 계산
      const currentTransform = d3.zoomTransform(svgRef.current); // 현재 트랜스폼 가져오기
      const scale = currentTransform.k; // 현재 확대 비율 가져오기

      // 새로운 트랜스폼 적용 (노드를 화면 중앙에 맞춤)
      svg
        .transition()
        .duration(750)
        .call(
          zoomRef.current.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(scale) // 기존의 확대 비율 유지
            .translate(-node.x, -node.y) // 노드의 좌표를 기준으로 이동
        );
    };

    useEffect(() => {
      const width = 1300;
      const height = 800;

      const zoom = d3.zoom().on("zoom", (event) => {
        svgGroup.attr("transform", event.transform);
      });

      const svg = d3
        .select(svgRef.current)
        .attr(
          "viewBox",
          `-${width / 2} -${height / 2} ${width * 2} ${height * 2}`
        )
        .style("overflow", "visible")
        .call(zoom);

      // 초기 zoom 상태 저장하고 zoom 객체를 ref에 저장
      svgRef.current.__zoom = d3.zoomIdentity;
      zoomRef.current = zoom;

      const svgGroup = svg.append("g");

      const simulation = d3
        .forceSimulation(graphData.nodes)
        .force(
          "link",
          d3
            .forceLink(graphData.links)
            .id((d) => d.id)
            .distance(200)
        )
        .force(
          "collide",
          d3
            .forceCollide()
            .radius((d) => {
              return d.type === "titleNode" ? 80 : 50;
            })
            .iterations(2)
        )
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .alphaDecay(0.05)
        .on("tick", ticked);

      simulation.alphaTarget(0);

      simulation.on("end", simulation.stop);

      // 링크 설정: 타이틀 노드와 연관된 링크만 보이게
      const link = svgGroup
        .append("g")
        .selectAll("path")
        .data(graphData.links)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#ff8a66")
        .attr("stroke-width", 1)
        .style("display", (d) =>
          d.source.type === "titleNode" || d.target.type === "titleNode"
            ? "block"
            : "none"
        ) // titleNode와 연관된 링크만 보이도록 설정
        .attr(
          "d",
          d3
            .linkHorizontal()
            .x((d) => d.x)
            .y((d) => d.y)
        );

      // 원형 노드 설정: 타이틀 노드만 보이도록 설정
      const circle = svgGroup
        .selectAll("circle")
        .data(graphData.nodes)
        .enter()
        .append("circle")
        .attr("r", (d) => {
          if (d.type === "titleNode") return 50;
          return 30;
        })
        .attr("fill", (d) => {
          if (d.type === "titleNode") return "#F74E3F";
          return "#FF8A66";
        })
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .style("display", (d) => (d.type === "titleNode" ? "block" : "none")) // titleNode 외에는 display: none
        .call(
          d3
            .drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragended)
        )
        .on("mouseover", function (event, d) {
          if (!selectedNodeRef.current || selectedNodeRef.current.id !== d.id) {
            d3.select(this)
              .attr("stroke", "#f1d2d1")
              .attr("stroke-width", d.type === "titleNode" ? 10 : 6);
          }
        })
        .on("mouseout", function (event, d) {
          if (!selectedNodeRef.current || selectedNodeRef.current.id !== d.id) {
            d3.select(this).attr("stroke", "none").attr("stroke-width", 0);
          }
        })
        .on("click", handleNodeClick);

      // 텍스트 설정: 타이틀 노드에만 텍스트 표시
      const text = svgGroup
        .selectAll("text")
        .data(graphData.nodes)
        .enter()
        .append("text")
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .text((d) => d.id)
        .style("display", (d) => (d.type === "titleNode" ? "block" : "none")) // titleNode에만 텍스트 보이도록 설정
        .each(function (d) {
          const bbox = this.getBBox();
          d.bbox = bbox;
        });

      // 사각형(rect) 설정: 타이틀 노드의 텍스트에만 사각형 배경 표시
      const rect = svgGroup
        .selectAll("rect")
        .data(graphData.nodes)
        .enter()
        .insert("rect", "text")
        .attr("x", (d) => d.x - d.bbox.width / 2 - 5)
        .attr("y", (d) => d.y - d.bbox.height / 2 - 5)
        .attr("width", (d) => d.bbox.width + 10)
        .attr("height", (d) => d.bbox.height + 10)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .style("display", (d) => (d.type === "titleNode" ? "block" : "none")); // titleNode에만 사각형 표시

      nodesRef.current = circle;
      linksRef.current = link;
      textsRef.current = text;
      rectsRef.current = rect;

      let tickCounter = 0;
      const tickSkip = 1;

      function ticked() {
        if (tickCounter++ % tickSkip === 0) {
          circle.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

          text.attr("x", (d) => d.x).attr("y", (d) => d.y);

          rect
            .attr("x", (d) => d.x - d.bbox.width / 2 - 5)
            .attr("y", (d) => d.y - d.bbox.height / 2 - 5)
            .attr("width", (d) => d.bbox.width + 10)
            .attr("height", (d) => d.bbox.height + 10);

          linksRef.current.attr("d", (d) =>
            d3
              .linkHorizontal()
              .x((d) => d.x)
              .y((d) => d.y)({ source: d.source, target: d.target })
          );
        }
      }

      function dragStarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        graphData.nodes.forEach((node) => {
          node.fx = node.x;
          node.fy = node.y;
        });

        selectedNodeRef.current = d;
        isDragStarted.current = true;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = event.x;
        d.fy = event.y;

        isDragStarted.current = false;
      }

      return () => {
        svg.selectAll("*").remove();
      };
    }, [graphData, handleNodeClick]);

    return (
      <div>
        <svg ref={svgRef}></svg>
      </div>
    );
  }
);

export default React.memo(TestGraph);
