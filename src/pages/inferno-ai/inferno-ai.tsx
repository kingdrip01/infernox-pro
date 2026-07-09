import React, { useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useDevice } from '@deriv-com/ui';
import ChunkLoader from '@/components/loader/chunk-loader';

import AIHeader from './AIHeader';
import AnalysisCard, { AnalysisCardProps } from './AnalysisCard';
import SignalCard, { SignalCardProps } from './SignalCard';
import ReasonCard from './ReasonCard';
import ActionButtons from './ActionButtons';

import './inferno-ai.scss';

const PLACEHOLDER_ANALYSIS: AnalysisCardProps[] = [
    {
        market: 'Volatility 100 Index',
        trend: 'bullish',
        confidence: 87,
        price: '1,024.56',
        change: '+12.34',
        changePercent: '+1.22%',
        timeframe: '1H',
    },
    {
        market: 'Volatility 75 Index',
        trend: 'bearish',
        confidence: 72,
        price: '845.23',
        change: '-8.91',
        changePercent: '-1.04%',
        timeframe: '1H',
    },
    {
        market: 'EUR/USD',
        trend: 'neutral',
        confidence: 45,
        price: '1.0847',
        change: '+0.0002',
        changePercent: '+0.02%',
        timeframe: '15M',
    },
];

const PLACEHOLDER_SIGNALS: SignalCardProps[] = [
    {
        asset: 'Volatility 100 Index',
        direction: 'buy',
        entryPrice: '1,024.56',
        targetPrice: '1,035.00',
        stopLoss: '1,015.00',
        expiry: '15 min',
        strength: 4,
        isNew: true,
    },
    {
        asset: 'EUR/USD',
        direction: 'sell',
        entryPrice: '1.0847',
        targetPrice: '1.0820',
        stopLoss: '1.0870',
        expiry: '30 min',
        strength: 3,
    },
];

const PLACEHOLDER_REASONS = [
    'RSI indicates bullish momentum.',
    'MACD crossover confirmed.',
    'Price is above the EMA.',
    'Support level remains strong.',
];

type TInfernoAIState = 'idle' | 'loading' | 'success' | 'error';

const InfernoAI = observer(() => {
    const { isDesktop } = useDevice();

    const [aiState, setAiState] = useState<TInfernoAIState>('idle');
    const [lastUpdated, setLastUpdated] = useState('Just now');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRun = useCallback(() => {
        setAiState('loading');
        setLastUpdated('Running...');
        setErrorMessage('');

        setTimeout(() => {
            setAiState('success');
            setLastUpdated(new Date().toLocaleTimeString());
        }, 2000);
    }, []);

    const handlePause = useCallback(() => {
        setAiState('idle');
        setLastUpdated('Paused');
    }, []);

    const handleRefresh = useCallback(() => {
        setAiState('loading');

        setTimeout(() => {
            setAiState('success');
            setLastUpdated(new Date().toLocaleTimeString());
        }, 1000);
    }, []);

    const handleSettings = useCallback(() => {
        console.log('Settings');
    }, []);

    return (
        <div className={`inferno-ai ${isDesktop ? 'inferno-ai--desktop' : 'inferno-ai--mobile'}`}>
            <AIHeader lastUpdated={lastUpdated} />

            <ActionButtons
                isRunning={aiState === 'loading'}
                onRun={handleRun}
                onPause={handlePause}
                onRefresh={handleRefresh}
                onSettings={handleSettings}
            />

            {aiState === 'loading' && (
                <div className='inferno-ai__loading-overlay'>
                    <ChunkLoader message='Analyzing markets with AI...' />
                </div>
            )}

            {aiState === 'error' && (
                <div className='inferno-ai__error-banner'>
                    <span className='inferno-ai__error-message'>
                        {errorMessage}
                    </span>
                </div>
            )}

            <div className='inferno-ai__section'>
                <h2 className='inferno-ai__section-title'>
                    Market Analysis
                </h2>

                <div className='inferno-ai__analysis-grid'>
                    {PLACEHOLDER_ANALYSIS.map((analysis, index) => (
                        <AnalysisCard
                            key={index}
                            {...analysis}
                        />
                    ))}
                </div>
            </div>

            <div className='inferno-ai__section'>
                <h2 className='inferno-ai__section-title'>
                    Trading Signals
                </h2>

                <div className='inferno-ai__signals-grid'>
                    {PLACEHOLDER_SIGNALS.map((signal, index) => (
                        <SignalCard
                            key={index}
                            {...signal}
                        />
                    ))}
                </div>
            </div>

            <div className='inferno-ai__section'>
                <ReasonCard reasons={PLACEHOLDER_REASONS} />
            </div>
        </div>
    );
});

export default InfernoAI;
