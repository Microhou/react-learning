import React, { ReactElement, useState } from 'react';

import Home from '@mui/icons-material/Home';

type IconProps = {
    color?: string;
    size?: 'large' | 'medium' | 'small';
}

const HomeIcon = ({color, size}: IconProps) => <Home style={{color}} fontSize={size} />

type ButtonProps = {
    renderIcon: (props: IconProps, state: {isHovered: boolean}) => ReactElement;
    size?: 'large' | 'normal';
    appearance?: 'primary' | 'secondary';

}

const IconButton = ({renderIcon, size='normal', appearance='primary'}: ButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);

    // create default props
    const defaultIconProps: IconProps = {
        size: size === 'large' ? 'large' : 'medium',
        color: appearance === 'primary' ? 'white' : 'black'
    }
    // const newProps = {
    //     ...defaultIconProps,
    //     // make sure that props that are coming from the icon override default if they exist
    //     ...icon.props
    // }
    // clone the icon and assign new props to it
    // const clonedIcon = React.cloneElement(icon, newProps);

    return (
        <button onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)} className={`button ${appearance}`}>Submit {renderIcon(defaultIconProps, { isHovered })}</button>
    )
}

const IconButtonExample = () => {
    return (
        <>
            <h4>Pass all icon default props</h4>
            <IconButton renderIcon={(props) => <HomeIcon {...props}/>}/>

            <h4>Override size</h4>
            <IconButton renderIcon={(props) => <HomeIcon {...props} size="large" color="red"/>} />

            <h4>Use the actual MUI icon</h4>
            <IconButton renderIcon={(props) => <Home fontSize={props.size} style={{ color: props.color }} />} />
            <h4>Change icon's color on button's hover</h4>
            <IconButton renderIcon={(props, state) => <HomeIcon {...props} color={state.isHovered ? 'red': 'black'}/>}/>
        </>
    )
}

export default IconButtonExample;