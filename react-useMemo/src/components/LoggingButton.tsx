import React, { useEffect, useState } from 'react';
import { Button } from './Button';

export const withLoggingOnClick = (Component: any, params: any) => {
    
    return ({ logText, ...props }: any) => {
        useEffect(() => {
            console.log('log on mount');
        }, [])

        const onClick = () => {
            console.info('Log on click something for: ', logText);
            props.onClick();
        }
        return <Component {...props} onClick={onClick} />
    }
}

export const ButtonWithLoggingOnClick = withLoggingOnClick(Button, { text: 'button component' });