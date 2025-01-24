import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";
import * as d3 from "d3";
import { convertGraphData } from "../../data/convertGraphData";

const MainGraph = forwardRef(
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
    const simulationRef = useRef();

    const [viewport, setViewport] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const dfs = useCallback(
      (node, currentDepth, visited) => {
        visited.add(node.id);
        if (currentDepth >= depthRef.current) return;

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

    const setCursorPointer = (event) => {
      d3.select(event.target).style("cursor", "pointer");
    };

    const highlightNode = useCallback(
      (selectedNode) => {
        const visited = new Set();
        dfs(selectedNode, 0, visited);

        // 연결된 노드들을 페이드 인 애니메이션으로 표시
        nodesRef.current
          .transition()
          .duration(500)
          .attr("opacity", (d) => {
            if (d.type === "titleNode") {
              return visited.has(d.id) ? 1 : 0.1; // 선택되지 않은 titleNode만 0.3으로 변경
            }
            return visited.has(d.id) ? 1 : 0;
          })
          .attr("stroke", (d) =>
            d.id === selectedNode.id ? "#f1d2d1" : "none"
          )
          .attr("stroke-width", (d) =>
            d.id === selectedNode.id ? (d.type === "titleNode" ? 10 : 6) : 0
          );

        linksRef.current
          .transition()
          .duration(500)
          .attr("opacity", (d) =>
            visited.has(d.source.id) && visited.has(d.target.id) ? 1 : 0
          );

        textsRef.current
          .transition()
          .duration(500)
          .attr("opacity", (d) => {
            if (d.type === "titleNode") {
              return visited.has(d.id) ? 1 : 0.1; // 선택되지 않은 titleNode만 0.3으로 변경
            }
            return visited.has(d.id) ? 1 : 0;
          });

        rectsRef.current
          .transition()
          .duration(500)
          .attr("opacity", (d) => {
            if (d.type === "titleNode") {
              return visited.has(d.id) ? 1 : 0.1; // 선택되지 않은 titleNode만 0.3으로 변경
            }
            return visited.has(d.id) ? 1 : 0;
          });
      },
      [dfs]
    );
    const handleNodeClick = useCallback(
      (event, d) => {
        selectedNodeRef.current = d;
        highlightNode(d);

        const simulation = simulationRef.current;
        if (simulation) {
          console.log("simulation");
          const visited = new Set();
          dfs(d, 0, visited);

          // depth가 2 이상일 때는 시뮬레이션 효과를 적용하지 않음
          if (depthRef.current >= 2) {
            // 하이라이트 효과만 적용
            highlightNode(d);
            onNodeSelect(d);
            return;
          }

          // 링크 거리 조정
          simulation
            .force("link")
            .distance((link) => {
              if (link.source.id === d.id || link.target.id === d.id) {
                return 5;
              }
              if (visited.has(link.source.id) && visited.has(link.target.id)) {
                return 8;
              }
              return 200;
            })
            .strength((link) => {
              if (link.source.id === d.id || link.target.id === d.id) {
                return 3;
              }
              return 0.1;
            });

          // 중심 힘 설정
          simulation.force("center", null); // 기존 중심력 제거
          simulation.force(
            "x",
            d3.forceX(d.x).strength((n) => (visited.has(n.id) ? 1.2 : 0.01)) // 더 강하게 (0.7 → 1.2)
          );
          simulation.force(
            "y",
            d3.forceY(d.y).strength((n) => (visited.has(n.id) ? 1.2 : 0.01)) // 더 강하게 (0.7 → 1.2)
          );

          // 반발력 조정
          simulation.force(
            "charge",
            d3
              .forceManyBody()
              .strength((n) => {
                if (n.id === d.id) return -100; // 반발력 감소 (-200 → -100)
                if (visited.has(n.id)) return -30; // 연결된 노드 반발력 감소 (-50 → -30)
                return -10; // 기타 노드 반발력 감소 (-30 → -10)
              })
              .distanceMax(150) // 영향 거리 감소 (200 → 150)
          );

          // 충돌 방지 force 추가
          simulation.force(
            "collide",
            d3
              .forceCollide()
              .radius((d) => (d.type === "titleNode" ? 60 : 40))
              .strength(0.5) // 충돌 강도 적절히 설정
              .iterations(2) // 충돌 계산 반복 횟수
          );

          // 시뮬레이션 재시작
          // 시뮬레이션 재시작 - 더 빠르게 안정화되도록 조정
          simulation
            .alpha(0.3) // 초기 알파값 더 감소 (0.5 → 0.3)
            .alphaTarget(0)
            .alphaDecay(0.1) // 알파 감소율 감소 (0.2 → 0.1)
            .velocityDecay(0.4) // 속도 감소율 감소 (0.6 → 0.4)
            .restart();

          // // 노드 위치 고정 해제
          graphData.nodes.forEach((node) => {
            if (node !== d && visited.has(node.id)) {
              // 클릭한 노드와 연결된 노드들만 위치 고정 해제
              node.fx = null;
              node.fy = null;
            }
          });

          // 클릭한 노드 위치 고정
          d.fx = d.x;
          d.fy = d.y;
        }

        onNodeSelect(d);
      },
      [onNodeSelect, highlightNode, dfs]
    );

    //외부에서 호출할 수 있는 zoomIn, zoomOut 함수 정의
    useImperativeHandle(ref, () => ({
      zoomIn: () => {
        const svg = d3.select(svgRef.current);
        const { width, height } = viewport;

        // 화면 중심을 기준으로 확대
        svg
          .transition()
          .duration(300)
          .call(zoomRef.current.scaleBy, 1.5, [width / 2, height / 2]);
      },
      zoomOut: () => {
        const svg = d3.select(svgRef.current);
        const { width, height } = viewport;

        svg
          .transition()
          .duration(300)
          .call(zoomRef.current.scaleBy, 0.5, [width / 2, height / 2]);
      },
      selectNodeById: (id) => {
        const node = graphData.nodes.find((n) => n.id === id);
        if (node) {
          const svg = d3.select(svgRef.current);
          const currentTransform = d3.zoomTransform(svg.node());

          // 현재 zoom scale을 유지
          const currentScale = currentTransform.k;

          // 노드 위치로 이동만 하고 scale은 변경하지 않음
          svg
            .transition()
            .duration(500)
            .call(
              zoomRef.current.transform,
              d3.zoomIdentity
                .translate(
                  viewport.width / 2 - node.x * currentScale,
                  viewport.height / 2 - node.y * currentScale
                )
                .scale(currentScale) // 현재 scale 유지
            );

          // 노드 선택 효과 적용
          handleNodeClick(null, node);
        }
      },
      updateDepth: (newDepth) => {
        depthRef.current = newDepth;
      },
    }));

    const focusOnNode = useCallback(
      (node) => {
        const svg = d3.select(svgRef.current);
        const svgElement = svgRef.current;

        // 현재 viewport 크기 사용
        const { width, height } = viewport;

        const desiredScale = 2.0;

        // viewport 중앙으로부터의 노드까지의 거리 계산
        const dx = width / 2 - node.x * desiredScale;
        const dy = height / 2 - node.y * desiredScale;

        // 새로운 transform 적용
        svg
          .transition()
          .duration(750)
          .call(
            zoomRef.current.transform,
            d3.zoomIdentity.translate(dx, dy).scale(desiredScale)
          );
      },
      [viewport]
    );

    useEffect(() => {
      const { width, height } = viewport;

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

      //초기 zoom 상태 저장하고 zoom 객체를 ref에 저장
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
            .distance((link) => {
              if (
                link.source.type === "titleNode" &&
                link.target.type === "titleNode"
              ) {
                return 600;
              }
              if (
                link.source.type === "titleNode" ||
                link.target.type === "titleNode"
              ) {
                return 200;
              }
              return 300;
            })
            .strength(0.3)
        )
        .force(
          "charge",
          d3
            .forceManyBody()
            .strength((d) => (d.type === "titleNode" ? -1000 : -500))
            .distanceMax(500)
        )
        .force(
          "collide",
          d3
            .forceCollide()
            .radius((d) => (d.type === "titleNode" ? 100 : 70))
            .strength(1)
        )
        .force("center", d3.forceCenter(width / 2, height / 2))
        .alphaDecay(0.3)
        .velocityDecay(0.4)
        .alpha(0.3)
        .on("tick", ticked);

      // simulation을 ref에 저장
      simulationRef.current = simulation;

      const applyDragBehavior = (selection) => {
        selection.call(
          d3
            .drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragended)
        );
      };

      const link = svgGroup
        .append("g")
        .selectAll("path")
        .data(graphData.links)
        .join("path")
        .attr("fill", "none")
        .attr("stroke", "#FFB097")
        .attr("stroke-width", 1)
        .attr("opacity", 0) // 초기에는 모든 링크를 숨김
        .attr(
          "d",
          d3
            .linkHorizontal()
            .x((d) => d.x)
            .y((d) => d.y)
        );

      const circle = svgGroup
        .selectAll("circle")
        .data(graphData.nodes)
        .join("circle")
        .attr("r", (d) => {
          if (d.type === "titleNode") return 50;
          return 30;
        })
        .attr("fill", (d) => {
          if (d.type === "titleNode") return "#D10D00";
          if (d.type === "yearNode") return "#EE5E54";
          if (d.type === "publisherNode") return "#EB3E33";
          if (d.type === "placeNode") return "#FFAEAA";
          return "#FFD9D7";
        })
        .attr("opacity", (d) => (d.type === "titleNode" ? 1 : 0)) // titleNode만 보이게 설정
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .on("mouseover", function (event, d) {
          if (!selectedNodeRef.current || selectedNodeRef.current.id !== d.id) {
            d3.select(this)
              .attr("stroke", "#f1d2d1")
              .attr("stroke-width", d.type === "titleNode" ? 10 : 6);
            setCursorPointer(event);
          }
        })
        .on("mouseout", function (event, d) {
          if (!selectedNodeRef.current || selectedNodeRef.current.id !== d.id) {
            d3.select(this).attr("stroke", "none").attr("stroke-width", 0);
          }
        })
        .on("click", handleNodeClick);

      applyDragBehavior(circle);
      nodesRef.current = circle;

      const text = svgGroup
        .selectAll("text")
        .data(graphData.nodes, (d) => `${d.type}-${d.id}`)
        .join("text")
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .attr("opacity", (d) => (d.type === "titleNode" ? 1 : 0)) // titleNode만 보이게 설정
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .text((d) => {
          // if (d.type === "categoryNode") {
          //   return `${d.id} (분류)`;
          // }
          // if (d.type === "tagNode") {
          //   return `#${d.id}`;
          // }
          return d.id;
        })
        .each(function (d) {
          const bbox = this.getBBox();
          d.bbox = bbox;
        })
        .on("mouseover", function (event, d) {
          if (!selectedNodeRef.current || selectedNodeRef.current.id !== d.id) {
            d3.select(circle.nodes()[d.index])
              .attr("stroke", "#f1d2d1")
              .attr("stroke-width", d.type === "titleNode" ? 10 : 6);
            setCursorPointer(event);
          }
        })
        .on("click", handleNodeClick)
        .on("mouseout", function (event, d) {
          if (!selectedNodeRef.current || selectedNodeRef.current.id !== d.id) {
            d3.select(circle.nodes()[d.index])
              .attr("stroke", "none")
              .attr("stroke-width", 0);
          }
        });

      applyDragBehavior(text);
      textsRef.current = text;

      const rect = svgGroup
        .selectAll("rect")
        .data(graphData.nodes)
        .enter()
        .insert("rect", "text")
        .attr("opacity", (d) => (d.type === "titleNode" ? 1 : 0)) // titleNode만 보이게 설정
        .attr("x", (d) => d.x - d.bbox.width / 2 - 5)
        .attr("y", (d) => d.y - d.bbox.height / 2 - 5)
        .attr("width", (d) => d.bbox.width + 10)
        .attr("height", (d) => d.bbox.height + 10)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .on("mouseover", function (event, d) {
          if (!selectedNodeRef.current || selectedNodeRef.current.id !== d.id) {
            d3.select(circle.nodes()[d.index])
              .attr("stroke", "#f1d2d1")
              .attr("stroke-width", d.type === "titleNode" ? 10 : 6);
            setCursorPointer(event);
          }
        })
        .on("click", handleNodeClick)
        .on("mouseout", function (event, d) {
          if (!selectedNodeRef.current || selectedNodeRef.current.id !== d.id) {
            d3.select(circle.nodes()[d.index])
              .attr("stroke", "none")
              .attr("stroke-width", 0);
          }
        });

      applyDragBehavior(rect);
      rectsRef.current = rect;

      linksRef.current = link;

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
        simulationRef.current = null;
      };
    }, [graphData, handleNodeClick, viewport]);

    //렌더링 시 렉 걸리는 문제 해결 하면 도입
    useEffect(() => {
      const handleResize = () => {
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <div className="font-notosans ">
        <svg ref={svgRef}></svg>
      </div>
    );
  }
);

export default React.memo(MainGraph);
