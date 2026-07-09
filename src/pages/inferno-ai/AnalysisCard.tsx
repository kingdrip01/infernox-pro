import React from 'react';
import { observer } from 'mobx-react-lite';
import { Localize } from '@deriv-com/translations';

export type MarketTrend = 'bullish' | 'bearish' | 'neutral';

export interface AnalysisCardProps {
    market: string;
    trend: MarketTrend;
    confidence: number;
    price: string;
    change: string;
    changePercent: string;
    timeframe: string;
}

const trendConfig = {
    bullish: {
        label: 'Bullish',
        className: 'inferno-ai__analysis-card--bullish',
        changeClass: 'inferno-ai__analysis-card-change--positive',
    },
    bearish: {
        label: 'Bearish',
        className: 'inferno-ai__analysis-card--bearish',
        changeClass: 'inferno-ai__analysis-card-change--negative',
    },
    neutral: {
        label: 'Neutral',
        className: 'inferno-ai__analysis-card--neutral',
        changeClass: '',
    },
};

const AnalysisCard = observer(({
    market,
    trend,
    confidence,
    price,
    change,
    changePercent,
    timeframe,
}: AnalysisCardProps) => {
    const config = trendConfig[trend];
    const isPositive = trend === 'bullish';
    const isNegative = trend === 'bearish';

    return (
        <div className={`inferno-ai__analysis-card ${config.className}`}>
            <div className='inferno-ai__analysis-card-header'>
                <span className='inferno-ai__analysis-card-market'>{market}</span>
                <span className='inferno-ai__analysis-card-timeframe'>{timeframe}</span>
            </div>

            <div className='inferno-ai__analysis-card-price-row'>
                <span className='inferno-ai__analysis-card-price'>{price}</span>

                <span
                    className={`inferno-ai__analysis-card-change ${config.changeClass}`}
                >
                    {change} ({changePercent})
                </span>
            </div>

            <div className='inferno-ai__analysis-card-footer'>
                <div className='inferno-ai__analysis-card-trend'>
                    <span
                        className={`inferno-ai__analysis-card-trend-arrow ${
                            isPositive
                                ? 'inferno-ai__analysis-card-trend-arrow--up'
                                : isNegative
                                ? 'inferno-ai__analysis-card-trend-arrow--down'
                                : 'inferno-ai__analysis-card-trend-arrow--flat'
                        }`}
                    >
                        {isPositive ? '↗' : isNegative ? '↘' : '—'}
                    </span>

                    <Localize i18n_default_text={config.label} />
                </div>

                <div className='inferno-ai__analysis-card-confidence'>
                    <Localize i18n_default_text='Confidence' />

                    <div className='inferno-ai__analysis-card-confidence-bar'>
                        <div
                            className='inferno-ai__analysis-card-confidence-fill'
                            style={{ width: `${confidence}%` }}
                        />
                    </div>

                    <span>{confidence}%</span>
                </div>
            </div>
        </div>
    );
});

export default AnalysisCard;
