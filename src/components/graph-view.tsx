"use client";
import { forceCollide, forceLink, forceManyBody } from "d3-force";
import { useRouter } from "fumadocs-core/framework";
import {
  lazy,
  type RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ForceGraphMethods,
  ForceGraphProps,
  LinkObject,
  NodeObject,
} from "react-force-graph-2d";

const FORCE_LINK_DISTANCE = 200;
const FORCE_CHARGE_STRENGTH = 1;
const COLLISION_RADIUS = 60;
const TOOLTIP_OFFSET = 4;
const NODE_FONT_SIZE = 14;
const NODE_RADIUS = 5;
const DEFAULT_LINK_WIDTH = 2;
const DEFAULT_LINK_COLOR = "#999";

export type Graph = {
  links: Link[];
  nodes: Node[];
};

export type Node = NodeObject<NodeType>;
export type Link = LinkObject<NodeType, LinkType>;

export type NodeType = {
  text: string;
  description?: string;
  neighbors?: string[];
  url: string;
};
export type LinkType = Record<string, unknown>;

export type GraphViewProps = {
  graph: Graph;
};

const ForceGraph2D = lazy(
  () => import("react-force-graph-2d")
) as typeof import("react-force-graph-2d").default;

export function GraphView(props: GraphViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <div
      className="relative h-[600px] overflow-hidden rounded-xl border [&_canvas]:size-full"
      ref={ref}
    >
      {mount && <ClientOnly {...props} containerRef={ref} />}
    </div>
  );
}

function ClientOnly({
  containerRef,
  graph: { nodes, links },
}: GraphViewProps & { containerRef: RefObject<HTMLDivElement | null> }) {
  const fgRef = useRef<ForceGraphMethods<Node, Link> | undefined>(undefined);
  const hoveredRef = useRef<Node | null>(null);
  const readyRef = useRef(false);
  const router = useRouter();
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    content: string;
  } | null>(null);

  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) {
      return;
    }

    if (readyRef.current) {
      return;
    }
    readyRef.current = true;

    fg.d3Force("link", forceLink().distance(FORCE_LINK_DISTANCE));
    fg.d3Force("charge", forceManyBody().strength(FORCE_CHARGE_STRENGTH));
    fg.d3Force("collision", forceCollide(COLLISION_RADIUS));
  });

  const handleNodeHover = (node: Node | null) => {
    const graph = fgRef.current;
    if (!graph) {
      return;
    }
    hoveredRef.current = node;

    if (!node || node.x == null || node.y == null) {
      setTooltip(null);
      return;
    }

    const coords = graph.graph2ScreenCoords(node.x, node.y);
    setTooltip({
      x: coords.x + TOOLTIP_OFFSET,
      y: coords.y + TOOLTIP_OFFSET,
      content: node.description ?? "No description",
    });
  };

  // Custom node rendering: circle with text label below
  const nodeCanvasObject: ForceGraphProps["nodeCanvasObject"] = (node, ctx) => {
    const container = containerRef.current;
    if (!container || node.x == null || node.y == null) {
      return;
    }
    const style = getComputedStyle(container);
    const { x, y } = node;

    // Draw circle
    ctx.beginPath();
    ctx.arc(x, y, NODE_RADIUS, 0, 2 * Math.PI, false);

    const hoverNode = hoveredRef.current;
    const isActive =
      hoverNode?.id === node.id ||
      hoverNode?.neighbors?.includes(node.id as string);

    ctx.fillStyle = isActive
      ? style.getPropertyValue("--color-fd-primary")
      : style.getPropertyValue("--color-purple-300");
    ctx.fill();

    // Draw text below the node
    ctx.font = `${NODE_FONT_SIZE}px Sans-Serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = style.getPropertyValue("color");
    ctx.fillText(node.text, x, y + NODE_RADIUS + NODE_FONT_SIZE);
  };

  const linkColor = (link: Link) => {
    const container = containerRef.current;
    if (!container) {
      return DEFAULT_LINK_COLOR;
    }
    const style = getComputedStyle(container);
    const hoverNode = hoveredRef.current;

    if (
      hoverNode &&
      typeof link.source === "object" &&
      typeof link.target === "object" &&
      (hoverNode.id === link.source.id || hoverNode.id === link.target.id)
    ) {
      return style.getPropertyValue("--color-fd-primary");
    }

    return `color-mix(in oklab, ${style.getPropertyValue("--color-fd-muted-foreground")} 50%, transparent)`;
  };

  // Enrich nodes with neighbors for hover effects
  // Precompute neighbor references so hover/highlight logic stays O(1) at render time.
  const enrichedGraphData = useMemo(() => {
    const nodesWithNeighbors = nodes.map((node) => ({
      ...node,
      neighbors: links.flatMap((link) => {
        if (link.source === node.id) {
          return link.target;
        }
        if (link.target === node.id) {
          return link.source;
        }
        return [];
      }),
    }));

    return { nodes: nodesWithNeighbors as NodeType[], links };
  }, [nodes, links]);

  return (
    <>
      <ForceGraph2D<NodeType, LinkType>
        enableNodeDrag
        enableZoomInteraction
        graphData={enrichedGraphData}
        linkColor={linkColor}
        linkWidth={DEFAULT_LINK_WIDTH}
        nodeCanvasObject={nodeCanvasObject}
        onNodeClick={(node) => {
          router.push(node.url);
        }}
        onNodeHover={handleNodeHover}
        ref={fgRef}
      />
      {tooltip && (
        <div
          className="absolute size-fit max-w-xs rounded-xl border bg-fd-popover p-2 text-fd-popover-foreground text-sm shadow-lg"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          {tooltip.content}
        </div>
      )}
    </>
  );
}
