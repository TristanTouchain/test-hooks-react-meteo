import React from 'react';

function AnimeIcon(props) {
    const { conditionIcon, number } = props;
    return (
        <div className={`${conditionIcon} animate pos${number}`}></div>
    );
}

export default AnimeIcon;

