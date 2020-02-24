import React, { FunctionComponent, useState, useCallback, FormEvent } from 'react';
import { useAppState } from '../../store';
import { priceFormatter } from '../../utils';

import './CreditCharger.scss';
import { useToast } from '../../hooks';
import userService from '../../services/user.service';
import { creditOrderUser } from '../../actions/order.actions';

const CreditCharger: FunctionComponent = () => {
    const [ { order }, dispatch ] = useAppState();
    const [ creditToAdd, setCreditToAdd ] = useState<number | ''>('');
    const createToast = useToast();

    const updateCreditToAdd = useCallback((e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.valueAsNumber;
        setCreditToAdd(isNaN(value) ? '': value);
    }, []);

    const isDisabled = useCallback(() => {
        return creditToAdd === '' || creditToAdd <= 0;
    }, [ creditToAdd ]);

    const creditUser = useCallback(async () => {
        if (!order.user || creditToAdd === '') {
            return;
        }

        try {
            const userUpdated = await userService.creditUser(order.user.id, creditToAdd);
            dispatch(creditOrderUser(userUpdated.credit));
            createToast('success', `Compte de ${order.name} chargé à ${priceFormatter.format(userUpdated.credit)}`);
            setCreditToAdd('');
        } catch (e) {
            createToast('error', `Impossible de recharger le compte de ${order.name}`);
        }
    }, [ order, creditToAdd, dispatch, createToast ]);

    return (
        <div className="credit-charger">
            <main>
                <span>Solde actuel : {order.user && priceFormatter.format(order.user.credit)}</span>
                <div className="credit-charger-input">
                    + <input type="number" min={0} onChange={updateCreditToAdd} value={creditToAdd} placeholder="50,00" /> €
                </div>
            </main>

            <footer className="columns space-around">
                <button
                    className="primary columns space-button"
                    type="button"
                    disabled={isDisabled()}
                    onClick={creditUser}
                >
                    <span>Charger</span>
                    <span><img width="20em" src="/assets/icons/left-arrow.svg" alt="Next" /></span>
                </button>
            </footer>
        </div>
    );
};

export default CreditCharger;
