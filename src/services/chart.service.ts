import axios from "axios";
import config from "../config";
import { ChartRequest, ChartResponse, ChartTopic, } from "../models/chart.models";

class ChartService {

    async findChart(request: ChartRequest, topic: ChartTopic): Promise<ChartResponse> {
        const { data: response } = await axios.post<ChartResponse>(`${config.backendUrl}/charts/${topic.toString()}`, request);
        return response;
    }

}

export default new ChartService();
