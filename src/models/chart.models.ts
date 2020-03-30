import { Category } from "./product.model";

export class ChartRequest {
  constructor(
    public interval: ChartInterval,
    public from?: string,
    public categories?: Category[]
  ) {}
}

export interface ChartResponse {
  points: ChartPoint[];
}

export interface ChartPoint {
  abscissa: string;
  ordinate: number;
}

export enum ChartInterval {
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
  YEAR = "YEAR",
  DECADE = "DECADE"
}

export enum ChartType {
  BAR,
  PIE,
  LINE
}

export enum ChartTopic {
  REVENUES = "revenues",
  CONSUMPTIONS = "consumptions"
}

export const intervalMapping = [
    { value: ChartInterval.DAY, label: 'Jour' },
    { value: ChartInterval.WEEK, label: 'Semaine' },
    { value: ChartInterval.MONTH, label: 'Mois' },
    { value: ChartInterval.YEAR, label: 'Année' },
    { value: ChartInterval.DECADE, label: 'Décennie' }
];

export const typeMapping = [
    { value: ChartType.BAR, label: 'Barre', img: '/assets/icons/barchart.svg' },
    { value: ChartType.PIE, label: 'Cercle', img: '/assets/icons/piechart.svg'  },
    { value: ChartType.LINE, label: 'Ligne', img: '/assets/icons/linechart.svg'  }
];

