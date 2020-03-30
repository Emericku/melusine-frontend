import React, { FunctionComponent, useEffect, useState, useCallback } from 'react';
import { useToast } from '../../hooks';
import Spinner from '../misc/Spinner';
import chartService from '../../services/chart.service';
import { ChartRequest, ChartResponse, ChartInterval, ChartType, ChartTopic, intervalMapping, typeMapping } from '../../models/chart.models';
import { Category, categoryMapping } from '../../models/product.model';
import Chart from '../misc/Chart';
import './ChartPage.scss';

const ClientPage: FunctionComponent = () => {
    const createToast = useToast();
    const [isLoading, setLoading] = useState(true);
    const [revenuesData, setRevenuesData] = useState<ChartResponse>();
    const [consumptionsData, setComsuptionsData] = useState<ChartResponse>();
    const [interval, setInterval] = useState<ChartInterval>(ChartInterval.MONTH);
    const [requestedCategory, setRequestedCategory] = useState<Category[]>([]);
    const [chartTypeRevenues, setChartTypeRevenues] = useState<ChartType>(ChartType.BAR);
    const [chartTypeConsumptions, setChartTypeConsumptions] = useState<ChartType>(ChartType.PIE);

    const findRevenuesChart = useCallback((interval: ChartInterval) => {
        const request: ChartRequest = { interval: interval };
        chartService.findChart(request, ChartTopic.REVENUES)
            .then((r: ChartResponse) => {
                setRevenuesData(r);
                setLoading(false);
            })
            .catch((e) => createToast('error', e.response ? e.response.data.message : ""));
    }, [createToast])

    const findConsumptionsChart = useCallback((interval: ChartInterval, categories?: Category[]) => {
        const request: ChartRequest = { interval: interval, categories: categories };
        chartService.findChart(request, ChartTopic.CONSUMPTIONS)
            .then((r: ChartResponse) => {
                setComsuptionsData(r);
                setLoading(false);
            })
            .catch((e) => createToast('error', e.response ? e.response.data.message : ""));
    }, [createToast])

    const cleanCategories = useCallback(() => {
        setRequestedCategory([]);
        findConsumptionsChart(interval);
    }, [interval, findConsumptionsChart]);

    const selectInterval = useCallback((selectedInterval: ChartInterval) => {
        setInterval(selectedInterval);
        findConsumptionsChart(selectedInterval);
        findRevenuesChart(selectedInterval);
    }, [findRevenuesChart, findConsumptionsChart]);

    const selectCategory = useCallback((selectedCategory: Category) => {
        console.log(selectedCategory)
        setRequestedCategory([selectedCategory])
        findConsumptionsChart(interval, [selectedCategory]);
    }, [interval, findConsumptionsChart]);

    useEffect(() => {
        findRevenuesChart(interval)
        findConsumptionsChart(interval)
    }, [findRevenuesChart, findConsumptionsChart, interval]);

    return (
        <div className="chart-main">
            <div className="nav-button">
                {
                    intervalMapping.map((mapValue) => (
                        interval === mapValue.value ?
                            <button
                                key={mapValue.value}
                                className="secondary disabled"
                                type="button"
                                onClick={() => selectInterval(mapValue.value)}
                                disabled>{mapValue.label}</button> :
                            <button
                                key={mapValue.value}
                                className="secondary"
                                type="button"
                                onClick={() => selectInterval(mapValue.value)}>{mapValue.label}</button>
                    ))
                }
            </div>

            {isLoading ?
                <Spinner /> :
                <div className="chart-items">
                    {revenuesData && revenuesData.points.length > 0 && <div className="chart-item">
                        <div>
                            <div className="select-chart-type-button">
                                {
                                    typeMapping.map((mapValue) => (
                                        chartTypeRevenues === mapValue.value ?
                                            <button
                                                key={mapValue.value}
                                                className="secondary disabled chart-type-button"
                                                type="button"
                                                onClick={() => setChartTypeRevenues(mapValue.value)}
                                                disabled>
                                                <img width="15em" src={mapValue.img} alt={mapValue.label} />
                                            </button> :
                                            <button
                                                key={mapValue.value}
                                                className="secondary chart-type-button"
                                                type="button"
                                                onClick={() => setChartTypeRevenues(mapValue.value)}>
                                                <img width="15em" src={mapValue.img} alt={mapValue.label} />
                                            </button>
                                    ))
                                }
                            </div>
                            {
                                chartTypeRevenues === ChartType.BAR && <Chart
                                    type={ChartType.BAR}
                                    title="Chiffre d'affaire"
                                    data={revenuesData}
                                    abscissaName="Temps"
                                    ordinateName="Euros"
                                />
                            }
                            {
                                chartTypeRevenues === ChartType.LINE && <Chart
                                    type={ChartType.LINE}
                                    title="Chiffre d'affaire"
                                    data={revenuesData}
                                    abscissaName="Temps"
                                    ordinateName="Euros"
                                />}
                            {
                                chartTypeRevenues === ChartType.PIE && <Chart
                                    type={ChartType.PIE}
                                    title="Chiffre d'affaire"
                                    data={revenuesData}
                                    abscissaName="Temps"
                                    ordinateName="Euros"
                                />
                            }
                            {
                                revenuesData.points.length === 0 &&
                                <h3>Aucune données trouvées</h3>
                            }
                        </div>
                    </div>
                    }

                    {
                        consumptionsData && <div className="chart-item">
                            <div className="nav-button">
                                {
                                    categoryMapping.map((category) => (
                                        requestedCategory.includes(category.value) ?
                                            <button
                                                key={category.value}
                                                className="secondary disabled"
                                                type="button"
                                                onClick={() => selectCategory(category.value)}
                                                disabled>{category.label}</button> :
                                            <button
                                                key={category.value}
                                                className="secondary"
                                                type="button"
                                                onClick={() => selectCategory(category.value)}>{category.label}</button>
                                    ))
                                }
                                <button
                                    type="button"
                                    className="secondary trash-button"
                                    onClick={() => cleanCategories()}>
                                    <img width="20em" src="/assets/icons/trash.svg" alt="Enlever les filtres" />
                                </button>
                            </div>
                            <div>
                                <div className="select-chart-type-button">
                                    {
                                        typeMapping.map((mapValue) => (
                                            chartTypeConsumptions === mapValue.value ?
                                                <button
                                                    key={mapValue.value}
                                                    className="secondary disabled chart-type-button"
                                                    type="button"
                                                    onClick={() => setChartTypeConsumptions(mapValue.value)}
                                                    disabled>
                                                    <img width="20em" src={mapValue.img} alt={mapValue.label} />
                                                </button> :
                                                <button
                                                    key={mapValue.value}
                                                    className="secondary chart-type-button"
                                                    type="button"
                                                    onClick={() => setChartTypeConsumptions(mapValue.value)}>
                                                    <img width="20em" src={mapValue.img} alt={mapValue.label} />
                                                </button>
                                        ))
                                    }
                                </div>

                                {
                                    chartTypeConsumptions === ChartType.BAR && consumptionsData.points.length > 0 && <Chart
                                        type={ChartType.BAR}
                                        title="Consommation de produits"
                                        data={consumptionsData}
                                        abscissaName="Produit"
                                        ordinateName="Nombre"
                                    />
                                }
                                {
                                    chartTypeConsumptions === ChartType.LINE && consumptionsData.points.length > 0 && <Chart
                                        type={ChartType.LINE}
                                        title="Consommation de produits"
                                        data={consumptionsData}
                                        abscissaName="Produit"
                                        ordinateName="Nombre"
                                    />
                                }
                                {
                                    chartTypeConsumptions === ChartType.PIE && consumptionsData.points.length > 0 && <Chart
                                        type={ChartType.PIE}
                                        title="Consommation de produits"
                                        data={consumptionsData}
                                        abscissaName="Produit"
                                        ordinateName="Nombre"
                                    />
                                }
                                {
                                    consumptionsData.points.length === 0 && <h3>Aucune données trouvées</h3>
                                }
                            </div>
                        </div>
                    }
                </div>

            }
        </div>
    );
}
export default ClientPage;