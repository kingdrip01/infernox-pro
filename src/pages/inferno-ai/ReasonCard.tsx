import React from 'react';
import { observer } from 'mobx-react-lite';
import { Localize } from '@deriv-com/translations';

export interface ReasonCardProps {
    reasons: string[];
    title?: string;
}

const ReasonCard = observer(({
    reasons,
    title = 'AI Reasoning',
}: ReasonCardProps) => {
    return (
        <div className='inferno-ai__reason-card'>
            <h3 className='inferno-ai__reason-card-title'>
                <Localize i18n_default_text={title} />
            </h3>

            <ul className='inferno-ai__reason-card-list'>
                {reasons.map((reason, index) => (
                    <li
                        key={index}
                        className='inferno-ai__reason-card-item'
                    >
                        <span className='inferno-ai__reason-card-check'>
                            ✓
                        </span>

                        <span>{reason}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
});

export default ReasonCard;
