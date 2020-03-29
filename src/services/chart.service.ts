import axios from "axios";
import config from "../config";
import { ChartRequest, ChartResponse } from "../models/chart.models";

class ChartService {

    async findChart(request: ChartRequest): Promise<ChartResponse> {
        const { data: response } = await axios.post<ChartResponse>(`${config.backendUrl}/charts`, request);
        return response;
    }

}

export default new ChartService();
