import { CSSProperties } from 'react';
import { UseBoundStore } from 'zustand';

export type WithClassName = {
    className?: string;
};
export type WithStyle = {
    style?: CSSProperties;
};

export type WithId = {
    _id: string;
};
export type WithMarkedForDelete = {
    _markedForDelete: boolean;
};

export type StoreSelector<Store extends UseBoundStore<any>, Derivation> = (
    p: ReturnType<Store>
) => Derivation;

export type Updater<SourceType> = (p: SourceType) => SourceType;
