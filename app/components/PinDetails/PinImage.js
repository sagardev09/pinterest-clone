import Image from 'next/image'
import React from 'react'

function PinImage({ pinDetail }) {

    const isVideo = pinDetail.type == "video/mp4"

    return (
        <div>
            {isVideo ? (
                <video
                    src={pinDetail.image}
                    width={1000}
                    height={1000}
                    className="rounded-2xl cursor-pointer relative z-0"
                    autoPlay
                    loop muted
                ></video>
            ) : (
                <Image
                    src={pinDetail.image}
                    alt={pinDetail.title}
                    width={1000}
                    height={1000}
                    className="rounded-2xl cursor-pointer relative z-0"
                />
            )}
        </div>
    )
}

export default PinImage