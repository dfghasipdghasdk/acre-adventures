export type PlotVisualStatus = "vacant" | "booked" | "registered";

export interface AkulPlotShape {
  plotNumber: string;
  polygonPoints: string;
  center: { x: number; y: number };
}

export interface AkulRoadShape {
  id: string;
  d: string;
  label: string;
  labelX: number;
  labelY: number;
  labelRotate?: number;
}

interface GeneratedSlot {
  x: number;
  y: number;
  width: number;
  height: number;
  skew: number;
}

const makePolygon = ({ x, y, width, height, skew }: GeneratedSlot): string => {
  const p1 = `${x},${y}`;
  const p2 = `${x + width},${y + skew}`;
  const p3 = `${x + width - skew},${y + height + skew}`;
  const p4 = `${x - skew},${y + height}`;
  return `${p1} ${p2} ${p3} ${p4}`;
};

const rowSlots = (
  startX: number,
  startY: number,
  count: number,
  stepX: number,
  stepY: number,
  width: number,
  height: number,
  skew: number
): GeneratedSlot[] =>
  Array.from({ length: count }, (_, index) => ({
    x: startX + index * stepX,
    y: startY + index * stepY,
    width,
    height,
    skew,
  }));

const generateAkulSlots = (): GeneratedSlot[] => [
  // Left belt (upper to lower around Others Land)
  ...rowSlots(38, 84, 10, 30, -1, 24, 28, 4),
  ...rowSlots(48, 122, 10, 30, -1, 24, 28, 4),
  ...rowSlots(60, 160, 10, 30, -1, 24, 28, 4),
  ...rowSlots(72, 200, 9, 30, -1, 24, 28, 4),
  ...rowSlots(86, 242, 9, 30, -1, 24, 28, 4),
  ...rowSlots(100, 286, 8, 30, -1, 24, 28, 4),
  ...rowSlots(112, 332, 8, 30, -1, 24, 28, 4),
  // Connector
  ...rowSlots(360, 198, 7, 27, -9, 22, 26, 3),
  ...rowSlots(378, 236, 7, 27, -9, 22, 26, 3),
  ...rowSlots(396, 274, 6, 27, -9, 22, 26, 3),
  ...rowSlots(414, 312, 6, 27, -9, 22, 26, 3),
  ...rowSlots(432, 350, 5, 27, -9, 22, 26, 3),
  // Right wing
  ...rowSlots(632, 170, 9, 25, 10, 20, 28, -3),
  ...rowSlots(652, 208, 8, 25, 10, 20, 28, -3),
  ...rowSlots(672, 246, 8, 25, 10, 20, 28, -3),
  ...rowSlots(694, 286, 7, 25, 10, 20, 28, -3),
  ...rowSlots(716, 328, 6, 25, 10, 20, 28, -3),
  ...rowSlots(738, 372, 5, 25, 10, 20, 28, -3),
  ...rowSlots(760, 418, 5, 25, 10, 20, 28, -3),
];

const allSlots = generateAkulSlots().slice(0, 123);

export const akulPlotShapes: AkulPlotShape[] = allSlots.map((slot, index) => ({
  plotNumber: `${index + 1}`,
  polygonPoints: makePolygon(slot),
  center: {
    x: slot.x + slot.width / 2,
    y: slot.y + slot.height / 2,
  },
}));

export const akulLayout = {
  viewBox: "0 0 1024 581",
  boundaryPath:
    "M16 96 L304 64 L332 214 L292 276 L348 314 L434 278 L526 206 L578 244 L708 170 L1014 486 L750 556 L590 434 L502 456 L360 370 L208 426 L60 504 L16 96 Z",
  roads: [
    { id: "road-top-left", d: "M16 96 L304 64", label: "30 Ft Road", labelX: 220, labelY: 78, labelRotate: -14 },
    { id: "road-main-bottom", d: "M48 336 L500 456", label: "30 Ft Road", labelX: 336, labelY: 392, labelRotate: -20 },
    { id: "road-connector", d: "M430 278 L594 430", label: "20 Ft Road", labelX: 560, labelY: 250, labelRotate: -35 },
    { id: "road-right", d: "M620 256 L908 438", label: "20 Ft Road", labelX: 730, labelY: 330, labelRotate: 22 },
    { id: "road-left-vertical", d: "M26 196 L66 500", label: "60 Ft Road", labelX: 48, labelY: 292, labelRotate: -88 },
  ] as AkulRoadShape[],
  othersLand: {
    points: "154,224 302,206 266,350 122,336",
    labelX: 208,
    labelY: 282,
  },
  utilityBlocks: [
    { id: "guest-house", points: "614,424 668,424 668,462 614,462", label: "3 BHK Kerala Guest House" },
    { id: "worker-rooms", points: "690,424 744,424 744,462 690,462", label: "3 Worker Rooms" },
  ],
};

