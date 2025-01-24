import React, { forwardRef, useEffect, useState } from "react";
import { X, Search } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000]">
      <div className="relative w-auto h-[70vh] flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const DetailPanel = forwardRef(
  ({ node, isVisible, onClose, onTransitionEnd, onTagClick }, ref) => {
    const [isRendered, setIsRendered] = useState(isVisible);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
      if (isVisible) {
        setIsRendered(true);
      } else {
        const timer = setTimeout(() => {
          setIsRendered(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    }, [isVisible]);

    useEffect(() => {
      if (node?.properties?.titleId) {
        const newImageUrl = `${
          process.env.REACT_APP_IMAGE_BASE_URL
        }/${node.properties.titleId.padStart(4, "0")}.jpg`;
        console.log(node.properties);
        setImageUrl(newImageUrl);
      } else {
        setImageUrl(null);
      }
    }, [node?.properties?.titleId]);

    if (!isRendered || !node) {
      return null;
    }

    const { properties } = node || {};

    const handleClose = () => {
      setIsModalOpen(false); // 패널 닫기
    };

    return (
      <div
        ref={ref}
        className={`font-notosans  text-left fixed top-36 left-6 w-80 bg-white shadow-lg border border-gray-200 rounded-lg h-full
       ${isVisible ? "animate-fadeIn" : "animate-fadeOut"}
       transition-opacity duration-300 ease-in-out
       flex flex-col`}
        style={{
          maxHeight: "calc(100vh - 12rem)",
          paddingBottom: "10px",
        }}
        onTransitionEnd={() => {
          if (!isVisible) {
            onTransitionEnd();
          }
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          aria-label="Close detail panel"
        >
          <X size={24} />
        </button>
        <div className="p-4 flex-shrink-0">
          <h2 className="text-xl font-bold mb-4">{node.id}</h2>

          {properties && (
            <p>
              {[properties.e, properties.f, properties.g]
                .filter((value) => value && value !== "-")
                .join(", ")}
            </p>
          )}

          {imageUrl && (
            <div className="relative mt-4 w-full h-[165px]">
              <div className="relative bg-gray-300 w-full h-full mx-auto rounded-lg overflow-hidden flex items-center justify-center">
                {/* 배경 이미지 (흐림 효과) */}
                <img
                  src={imageUrl}
                  alt="Node"
                  className="absolute w-full h-full filter blur-sm object-cover object-center opacity-60"
                  onError={() => setImageUrl(null)}
                />

                {/* 작은 원본 이미지 */}
                <img
                  src={imageUrl}
                  alt="Node Small"
                  className="z-10 w-36 h-36 object-contain rounded-lg shadow-md"
                  onError={() => setImageUrl(null)}
                />

                {/* 모달 오픈 버튼 */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
                >
                  <Search size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {properties && (
          <div className="px-4 overflow-x-hidden overflow-y-auto flex-grow custom-scrollbar break-words">
            <div className="space-y-5">
              <div className="flex flex-col">
                <strong className="whitespace-nowrap">발간연도</strong>
                <span className="whitespace-normal break-words text-left">
                  {properties.c || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <strong className="whitespace-nowrap">편집자</strong>
                <span className="whitespace-normal break-words text-left">
                  {properties.k || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <strong className="whitespace-nowrap">발행인</strong>
                <span className="whitespace-normal break-words text-left">
                  {properties.m || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <strong className="whitespace-nowrap">언어</strong>
                <span className="whitespace-normal break-words text-left">
                  {properties.q || "N/A"}
                </span>
              </div>
              {properties.v && (
                <div className="flex flex-col">
                  <a
                    href={properties.v}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    <strong className="whitespace-nowrap">WorldCat Link</strong>
                  </a>
                </div>
              )}
              <div className="flex flex-col">
                <strong className="whitespace-nowrap">발행처</strong>
                <span className="whitespace-normal break-words text-left">
                  {properties.publisherNode || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <strong className="whitespace-nowrap">발행장소</strong>
                <span className="whitespace-normal break-words text-left">
                  {properties.placeNode || "N/A"}
                </span>
              </div>
              <div className="mt-2 whitespace-normal break-words">
                {properties.t || "N/A"}
              </div>
              <div className="flex flex-col">
                <strong className="whitespace-nowrap">번역제목</strong>
                <span className="whitespace-normal break-words text-left">
                  {properties.h || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <strong className="whitespace-nowrap">
                  Publishing Company
                </strong>
                <span className="whitespace-normal break-words text-left font-arial-unicode">
                  {properties.j || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <strong className="whitespace-nowrap">Editor</strong>
                <span className="whitespace-normal break-words text-left font-arial-unicode">
                  {properties.l || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <strong className="whitespace-nowrap">Publisher</strong>
                <span className="whitespace-normal break-words text-left font-arial-unicode">
                  {properties.n || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <strong className="whitespace-nowrap">Location</strong>
                <span className="whitespace-normal break-words text-left font-arial-unicode">
                  {properties.p || "N/A"}
                </span>
              </div>
              <div className="flex flex-col">
                <strong className="whitespace-nowrap">Language</strong>
                <span className="whitespace-normal break-words text-left font-arial-unicode">
                  {properties.r || "N/A"}
                </span>
              </div>
              <div className="mt-4 whitespace-normal break-words">
                {properties.s
                  ? properties.s.endsWith(".")
                    ? properties.s
                    : `${properties.s}.`
                  : "N/A"}
              </div>

              {/* 태그 섹션 추가 */}
              {node.type === "titleNode" && properties.relatedTags && (
                <div className="flex flex-col mt-6 pb-4">
                  <strong className="whitespace-nowrap mb-2">Tags</strong>
                  <div className="flex flex-wrap gap-2">
                    {properties.relatedTags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => onTagClick(tag)}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <img
            src={imageUrl}
            alt="Enlarged Node"
            className="h-full w-auto max-w-none object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='14' fill='%23666666'%3ENone Image%3C/text%3E%3C/svg%3E";
            }}
          />
        </Modal>
      </div>
    );
  }
);

DetailPanel.displayName = "DetailPanel";

export default React.memo(DetailPanel);
