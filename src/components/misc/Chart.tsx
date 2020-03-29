import React, { FunctionComponent } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import { ChartResponse } from '../../models/chart.models';
import './Chart.scss';

interface RevenuesChartProps {
    data: ChartResponse;
    abscissaName: string;
    ordinateName: string
}

const Chart: FunctionComponent<RevenuesChartProps> = (props) => {
    return (
        <div>
            {
                <BarChart width={400}
                    height={400}
                    margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                    data={props.data.points.map(point => {
                        return {
                            [props.ordinateName]: parseFloat(point.ordinate.toFixed(2)),
                            [props.abscissaName]: point.abscissa
                        };
                    })}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={props.abscissaName} />
                    <YAxis label={{ value: props.ordinateName, angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey={props.ordinateName} stroke="#cd435f" fill="#cd435f" />
                </BarChart>
            }
        </div >
    );
}

export default Chart;
