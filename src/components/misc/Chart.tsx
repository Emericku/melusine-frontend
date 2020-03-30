import React, { FunctionComponent } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, LineChart, Line, Label } from 'recharts'
import { ChartType, ChartResponse } from '../../models/chart.models';
import './Chart.scss';

interface RevenuesChartProps {
    title: string;
    type: ChartType;
    data: ChartResponse;
    abscissaName: string;
    ordinateName: string
}

const Chart: FunctionComponent<RevenuesChartProps> = (props) => {
    return (
        <div className="chart">
            <h3> {props.title} </h3>
            {
                props.type === ChartType.BAR && <BarChart
                    width={700}
                    height={475}
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
            {
                props.type === ChartType.PIE && <PieChart
                    width={700}
                    height={475}
                    margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                >
                    <Tooltip />
                    <Pie
                        data={props.data.points.map(point => {
                            return {
                                [props.ordinateName]: parseFloat(point.ordinate.toFixed(2)),
                                [props.abscissaName]: point.abscissa
                            };
                        })}
                        dataKey={props.ordinateName}
                        nameKey={props.abscissaName}
                        cx="50%"
                        cy="50%"
                        outerRadius={200}
                        fill="#cd435f" 
                        label={(entry) => entry.name}/>
                </PieChart>
            }
            {
                props.type === ChartType.LINE && <LineChart
                    width={700}
                    height={475}
                    margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
                    data={props.data.points.map(point => {
                        return {
                            [props.ordinateName]: parseFloat(point.ordinate.toFixed(2)),
                            [props.abscissaName]: point.abscissa
                        };
                    })}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={props.abscissaName} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey={props.ordinateName} stroke="#cd435f" />
                </LineChart>
            }
        </div >
    );
}

export default Chart;
