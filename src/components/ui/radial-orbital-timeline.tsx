import { useState, useEffect, useRef } from "react";
import type { ElementType, KeyboardEvent, MouseEvent } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon?: ElementType;
  image?: string;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  statusLabels?: Record<TimelineItem["status"], string>;
  showEnergy?: boolean;
  energyLabel?: string;
  relatedLabel?: string;
  centerImage?: string;
  centerLabel?: string;
  theme?: "dark" | "light";
}

const DEFAULT_STATUS_LABELS: Record<TimelineItem["status"], string> = {
  completed: "COMPLETE",
  "in-progress": "IN PROGRESS",
  pending: "PENDING",
};

export default function RadialOrbitalTimeline({
  timelineData,
  statusLabels = DEFAULT_STATUS_LABELS,
  showEnergy = true,
  energyLabel = "Energy Level",
  relatedLabel = "Connected Nodes",
  centerImage,
  centerLabel,
  theme = "dark",
}: RadialOrbitalTimelineProps) {
  const light = theme === "light";
  const tone = {
    root: light ? "bg-transparent" : "bg-sf-navy",
    ring: light ? "border-sf-navy/10" : "border-white/10",
    ping: light ? "border-sf-brand/15" : "border-white/10",
    halo: light
      ? "bg-white ring-1 ring-sf-navy/5 shadow-[0_20px_60px_-10px_rgba(1,118,211,0.35)]"
      : "bg-white/[0.04] ring-1 ring-white/10 shadow-[0_0_80px_10px_rgba(27,150,255,0.25)]",
    label: light ? "text-sf-navy/60" : "text-white/70",
    labelActive: light ? "text-sf-navy" : "text-white",
    glow: light ? "rgba(1,118,211,0.16)" : "rgba(255,255,255,0.2)",
  };
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [radius, setRadius] = useState<number>(200);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setRadius(Math.round(Math.max(110, Math.min(200, width * 0.36))));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const resetView = () => {
    setExpandedItems({});
    setActiveNodeId(null);
    setPulseEffect({});
    setAutoRotate(true);
  };

  const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      resetView();
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  const handleNodeKeyDown = (e: KeyboardEvent<HTMLDivElement>, id: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleItem(id);
    } else if (e.key === "Escape") {
      resetView();
    }
  };

  useEffect(() => {
    if (!autoRotate || reducedMotion) return;

    const rotationTimer: ReturnType<typeof setInterval> = setInterval(() => {
      setRotationAngle((prev) => {
        const newAngle = (prev + 0.3) % 360;
        return Number(newAngle.toFixed(3));
      });
    }, 50);

    return () => clearInterval(rotationTimer);
  }, [autoRotate, reducedMotion]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-sf-navy border-white";
      case "in-progress":
        return "text-sf-navy bg-white border-sf-navy";
      case "pending":
        return "text-white bg-sf-navy/40 border-white/50";
      default:
        return "text-white bg-sf-navy/40 border-white/50";
    }
  };

  return (
    <div
      className={`w-full h-[100svh] min-h-[600px] max-h-[760px] flex flex-col items-center justify-center overflow-hidden ${tone.root}`}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {centerImage ? (
            <div className={`absolute z-10 flex w-28 h-28 items-center justify-center rounded-full ${tone.halo}`}>
              <div className={`absolute w-36 h-36 rounded-full border animate-ping opacity-30 [animation-duration:3s] ${tone.ping}`}></div>
              <img src={centerImage} alt={centerLabel ?? ""} className="w-20 drop-shadow-[0_6px_18px_rgba(0,161,224,0.45)]" draggable={false} />
            </div>
          ) : (
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-sf-brand via-sf-bright to-sf-sky animate-pulse flex items-center justify-center z-10">
              <div className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70"></div>
              <div
                className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md"></div>
            </div>
          )}

          <div
            className={`absolute rounded-full border ${tone.ring}`}
            style={{ width: radius * 2, height: radius * 2 }}
          ></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute transition-all duration-700 cursor-pointer outline-none"
                style={nodeStyle}
                role="button"
                tabIndex={0}
                aria-expanded={!!isExpanded}
                aria-label={`${item.title}, ${item.date}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
                onKeyDown={(e) => handleNodeKeyDown(e, item.id)}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, ${tone.glow} 0%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  ${item.image ? "w-12 h-12 -m-1" : "w-10 h-10"} rounded-full flex items-center justify-center
                  ${
                    item.image
                      ? "bg-white text-sf-navy shadow-[0_8px_24px_-6px_rgba(0,0,0,0.45)]"
                      : isExpanded
                      ? "bg-white text-sf-navy"
                      : isRelated
                      ? "bg-white/50 text-sf-navy"
                      : "bg-sf-navy text-white"
                  }
                  border-2
                  ${
                    isExpanded
                      ? "border-white shadow-lg shadow-white/30"
                      : isRelated
                      ? "border-sf-sky animate-pulse"
                      : item.image
                      ? "border-white/0"
                      : "border-white/40"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  {item.image ? (
                    <img src={item.image} alt="" className="w-[62%] h-[62%] object-contain" draggable={false} />
                  ) : Icon ? (
                    <Icon size={16} />
                  ) : null}
                </div>

                <div
                  className={`
                  absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? `${tone.labelActive} scale-125` : tone.label}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-sf-navy/95 backdrop-blur-lg border-white/30 shadow-xl shadow-white/10 overflow-visible text-white cursor-default">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-xs ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {statusLabels[item.status]}
                        </Badge>
                        <span className="text-xs font-mono text-white/60">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-white">
                        {item.title}
                      </CardTitle>
                      <span className="text-[11px] uppercase tracking-wider text-sf-sky">
                        {item.category}
                      </span>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80">
                      <p className="m-0 leading-relaxed">{item.content}</p>

                      {showEnergy && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className="flex items-center">
                              <Zap size={10} className="mr-1" />
                              {energyLabel}
                            </span>
                            <span className="font-mono">{item.energy}%</span>
                          </div>
                          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-sf-brand to-sf-sky"
                              style={{ width: `${item.energy}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-white/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/70">
                              {relatedLabel}
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-white/60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
