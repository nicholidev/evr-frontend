import React, { useState } from 'react'; 
import Sound from 'react-sound'; 
import ColdOutside from '/ColdOutside.mp3';


const PlaySound = (
    handleSongLoading,
    handleSongPlaying,
    handleSongFinishedPlaying
) => 
{
    return (
        <div>
            <Sound
                url={ColdOutside}
                playStatus={Sound.status.PLAYING}
                playFromPosition={300}
                onLoading={handleSongLoading}
                onPlaying={handleSongPlaying}
                onFinishedPlaying={handleSongFinishedPlaying}
            />
        </div>
    );
};

export default PlaySound;