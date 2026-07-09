import React from 'react';
import { observer } from 'mobx-react-lite';
import { Localize } from '@deriv-com/translations';

export type SignalDirection = 'buy' | 'sell' | 'hold';

export interface SignalCardProps {
    asset: string;
    direction: SignalDirection;
    entryPrice: string;
    targetPrice: string;
    stopLoss: string;
    expiry: string;
    strength: number;
    isNew?: boolean;
}

const directionConfig = {
    buy: {
        label: 'BUY',
        className: 'inferno-ai__signal-card--buy',
        directionClass: 'inferno-ai__signal-card-direction--buy',
    },
    sell: {
        label: 'SELL',
        className: 'inferno-ai__signal-card--sell',
        directionClass: 'inferno-ai__signal-card-direction--sell',
    },
    hold: {
        label: 'HOLD',
        className: 'inferno-ai__signal-card--hold',
        directionClass: 'inferno-ai__signal-card-direction--hold',
    },
};

const SignalCard = observer(({
    asset,
    direction,
    entryPrice,
    targetPrice,
    stopLoss,
    expiry,
    strength,
    isNew = false,
}: SignalCardProps) => {
    const config = directionConfig[direction];

    return (
        <div className={`inferno-ai__signal-card ${config.className}`}>
            {isNew && (
                <span className='inferno-ai__signal-card-new-badge'>
                    <Localize i18n_default_text='NEW' />
                </span>
            )}

            <div className='inferno-ai__signal-card-header'>
                <div className='inferno-ai__signal-card-asset'>
                    <span
                        className={`inferno-ai__signal-card-asset-arrow ${
                            direction === 'buy'
                                ? 'inferno-ai__signal-card-asset-arrow--up'
                                : direction === 'sell'
                                ? 'inferno-ai__signal-card-asset-arrow--down'
                                : 'inferno-ai__signal-card-asset-arrow--flat'
                        }`}
                    >
                        {direction === 'buy' ? '↗' : direction === 'sell' ? '↘' : '—'}
                    </span>

                    <span>{asset}</span>
                </div>

                <span
                    className={`inferno-ai__signal-card-direction ${config.directionClass}`}
                >
                    {config.label}
                </span>
            </div>

            <div className='inferno-ai__signal-card-details'>
                <div className='inferno-ai__signal-card-detail'>
                    <span className='inferno-ai__signal-card-detail-label'>
                        <Localize i18n_default_text='Entry' />
                    </span>
                    <span className='inferno-ai__signal-card-detail-value'>
                        {entryPrice}
                    </span>
                </div>

                <div className='inferno-ai__signal-card-detail'>
                    <span className='inferno-ai__signal-card-detail-label'>
                        <Localize i18n_default_text='Target' />
                    </span>
                    <span className='inferno-ai__signal-card-detail-value inferno-ai__signal-card-detail-value--target'>
                        {targetPrice}
                    </span>
                </div>

                <div className='inferno-ai__signal-card-detail'>
                    <span className='inferno-ai__signal-card-detail-label'>
                        <Localize i18n_default_text='Stop Loss' />
                    </span>
                    <span className='inferno-ai__signal-card-detail-value inferno-ai__signal-card-detail-value--stop'>
                        {stopLoss}
                    </span>
                </div>
            </div>

            <div className='inferno-ai__signal-card-footer'>
                <div className='inferno-ai__signal-card-expiry'>
                    <span>⏱</span>
                    <span>{expiry}</span>
                </div>

                <div className='inferno-ai__signal-card-strength'>
                    <Localize i18n_default_text='Strength' />

                    <div className='inferno-ai__signal-card-strength-bar'>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className={`inferno-ai__signal-card-strength-segment ${
                                    i < strength
                                        ? 'inferno-ai__signal-card-strength-segment--active'
                                        : ''
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default SignalCard;
