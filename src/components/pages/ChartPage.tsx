import React, { FunctionComponent, useEffect, useState, useCallback } from 'react';
import { useToast } from '../../hooks';
import Spinner from '../misc/Spinner';
import chartService from '../../services/chart.service';
import { ChartResponse } from '../../models/chart.models';
import Chart from '../misc/Chart';
import './ChartPage.scss';

const ClientPage: FunctionComponent = () => {
    const createToast = useToast();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<ChartResponse>();
    const [interval, setInterval] = useState<string>("MONTH");

    const selectInterval = useCallback((interval: string) => {
        setInterval(interval);
    }, []);

    useEffect(() => {
        chartService.findChart({ interval: interval, type: "BAR" })
            .then((r: ChartResponse) => {
                setData(r);
                setLoading(false);
            })
            .catch(e => createToast('error', e.response ? e.response.data.message : ""));
    }, [createToast, interval]);

    return (
        <div className="chart-main">
            {(interval !== "DECADE") && <button
                type="button"
                onClick={() => selectInterval("DECADE")}>Décennie</button>
            }
            {(interval !== "YEAR") && <button
                type="button"
                onClick={() => selectInterval("YEAR")}>Année</button>
            }
            {(interval !== "MONTH") && <button
                type="button"
                onClick={() => selectInterval("MONTH")}>Mois</button>
            }
            {(interval !== "WEEK") && <button
                type="button"
                onClick={() => selectInterval("WEEK")}>Semaine</button>
            }
            {(interval !== "DAY") && <button
                type="button"
                onClick={() => selectInterval("DAY")}>Jour</button>
            }
            {isLoading ?
                <Spinner /> :
                data && <Chart data={data}
                    abscissaName="Temps"
                    ordinateName="Chiffre d'affaire"
                />
            }
        </div>
    );
}
export default ClientPage;