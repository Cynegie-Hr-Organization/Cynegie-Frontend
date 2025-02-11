import React, { useLayoutEffect, useRef, useState } from "react";

interface Tab {
  label: string;
  onClick: () => void;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
  tabHorizontalPadding?: string;
}

const AppTabs: React.FC<TabsProps> = ({
  tabs,
  className,
  tabHorizontalPadding,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [indicatorStyles, setIndicatorStyles] = useState({ width: 0, left: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useLayoutEffect(() => {
    if (tabRefs.current[activeTab]) {
      const { offsetWidth, offsetLeft } = tabRefs.current[activeTab]!;
      setIndicatorStyles({ width: offsetWidth, left: offsetLeft });
    }
  }, [activeTab]);

  return (
    <div className={`relative w-max ${className ?? ""}`}>
      <div className="flex justify-center border-b border-gray-300 text-sm">
        {tabs.map((tab, index) => (
          <button
            key={index}
            type="button"
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            className={`transition-all duration-300 relative p-2 text-sm ${tabHorizontalPadding ?? "px-2"} ${
              activeTab === index
                ? "text-primary font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => {
              setActiveTab(index);
              tab.onClick();
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className="absolute bottom-0 left-0 h-0.5 rounded-full bg-primary transition-all duration-300"
        style={{
          width: `${indicatorStyles.width}px`,
          transform: `translateX(${indicatorStyles.left}px)`,
        }}
      />
    </div>
  );
};

export default AppTabs;
