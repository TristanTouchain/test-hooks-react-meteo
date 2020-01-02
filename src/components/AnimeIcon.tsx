import React, { FunctionComponent } from 'react';

interface AnimeIconProps {
    conditionIcon: string;
    number: Number;
}

const AnimeIcon: FunctionComponent<AnimeIconProps> = ({ conditionIcon, number}) => 
        <div className={`${conditionIcon} animate pos${number}`}></div>;

export default AnimeIcon;