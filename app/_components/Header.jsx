import Image from 'next/image'
import React from 'react'

export default function Header() {
    return (
        <div className="flex w-full flex-col justify-center items-center">
            <div className="flex items-center">
                <Image src="/logo-final_DkOO8q1.svg" alt="logo" width={200} height={200} />
            </div>
            <div className="flex items-center mb-5 pb-4">
                <p
                    className="text-twitchy text-5xl [text-shadow:_0px_8px_0px_rgba(255,255,255)] uppercase font-bold bg-[rgb(145,70,255)] bg-clip-text text-transparent">
                    Events Calendar
                </p>
            </div>
        </div>
    )
}
