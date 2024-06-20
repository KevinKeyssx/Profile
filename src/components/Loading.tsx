import Image        from 'next/image';
import {FC, memo}   from 'react';

import {heroData}   from '../data/handleData';
import {ILov}       from '../data/lov.interface';
import Section      from './Layout/Section';


export const Loading : FC= memo(( dataChildren ) => {

    const {children} = dataChildren;
    const {imageSrc, name} = heroData( children as ILov[] );

    return (
        <Section noPadding>
            <div className="relative flex h-screen w-screen items-center justify-center">
                <Image
                    alt         = { `${name}-image` }
                    className   = "absolute z-0"
                    layout      = 'fill'
                    objectFit   = 'cover'
                    placeholder = "blur"
                    priority
                    src         = { imageSrc }
                />

                <div className="z-10 w-max max-w-screen-lg px-4 lg:px-0">
                    <div className="flex w-15 flex-col items-center gap-y-6 rounded-xl bg-gray-100/30 p-12 text-center shadow-lg backdrop-blur-sm">
                        <h1 className="text-2xl font-bold text-white sm:text-5xl lg:text-4xl">Cargando Información...</h1>
                        <div className="border border-slate-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                            <div className="animate-pulse flex space-x-4">
                                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                                <div className="flex-1 space-y-6 py-1">
                                    <div className="h-2 bg-slate-700 rounded"></div>
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                        </div>
                                        <div className="h-2 bg-slate-700 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
});