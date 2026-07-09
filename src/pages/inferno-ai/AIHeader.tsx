import React from 'react';
import { observer } from 'mobx-react-lite';
import { Localize } from '@deriv-com/translations';
import { LabelPairedCircleInfoCaptionRegularIcon } from '@deriv/quill-icons/LabelPaired';

interface AIHeaderProps {
    title?: string;
    subtitle?: string;
    isLive?: boolean;
    lastUpdated?: string;
}

const AIHeader = observer(({
    title = 'Inferno AI',
    subtitle = 'Real-time market analysis & trading signals',
    isLive = true,
    lastUpdated = 'Just now',
}: AIHeaderProps) => {
    return (
        <div className='inferno-ai__header'>
            <div className='inferno-ai__header-left'>
                <div className='inferno-ai__header-title-row'>
                    <h1 className='inferno-ai__header-title'>{title}</h1>
                    {isLive && (
                        <span className='inferno-ai__header-live-badge'>
                            <span className='inferno-ai__header-live-dot' />
                            <Localize i18n_default_text='LIVE' />
                        </span>
                    )}
                </div>
                <p className='inferno-ai__header-subtitle'>{subtitle}</p>
            </div>
            <div className='inferno-ai__header-right'>
                <span className='inferno-ai__header-updated'>
                    <Localize
                        i18n_default_text='Last updated: {{lastUpdated}}'
                        values={{ lastUpdated }}
                    />
                </span>
                <button
                    className='inferno-ai__header-info-btn'
                    title='Info'
                    type='button'
                >
                    <LabelPairedCircleInfoCaptionRegularIcon
                        height='20px'
                        width='20px'
                        fill='var(--text-general)'
                    />
                </button>
            </div>
        </div>
    );
});

export default AIHeader;
