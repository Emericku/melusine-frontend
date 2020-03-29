export class ChartRequest {
    constructor(
        public interval: string,
        public type: string,
    ) {}
}

export interface ChartResponse {
    points: ChartPoint[];
}

export interface ChartPoint {
    abscissa: string;
    ordinate: number;
}
