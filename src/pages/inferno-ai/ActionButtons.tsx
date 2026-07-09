import React from 'react';
import { observer } from 'mobx-react-lite';
import { Localize } from '@deriv-com/translations';
import { Button } from '@deriv-com/ui';

export interface ActionButtonsProps {
    isRunning?: boolean;
    onRun?: () => void;
    onPause?: () => void;
    onRefresh?: () => void;
    onSettings?: () => void;
}

const ActionButtons = observer(({
    isRunning = false,
    onRun,
    onPause,
    onRefresh,
    onSettings,
}: ActionButtonsProps) => {
    return (
        <div className='inferno-ai__action-buttons'>
            {!isRunning ? (
                <Button
                    className='inferno-ai__action-btn inferno-ai__action-btn--run'
                    color='primary'
                    variant='contained'
                    onClick={onRun}
                    size='md'
                >
                    <Localize i18n_default_text='Run AI Analysis' />
                </Button>
            ) : (
                <Button
                    className='inferno-ai__action-btn inferno-ai__action-btn--pause'
                    color='primary'
                    variant='outlined'
                    onClick={onPause}
                    size='md'
                >
                    <Localize i18n_default_text='Pause' />
                </Button>
            )}

            <Button
                className='inferno-ai__action-btn inferno-ai__action-btn--refresh'
                color='secondary'
                variant='outlined'
                onClick={onRefresh}
                size='md'
            >
                <Localize i18n_default_text='Refresh' />
            </Button>

            <Button
                className='inferno-ai__action-btn inferno-ai__action-btn--settings'
                color='secondary'
                variant='outlined'
                onClick={onSettings}
                size='md'
            >
                <Localize i18n_default_text='Settings' />
            </Button>
        </div>
    );
});

export default ActionButtons;
