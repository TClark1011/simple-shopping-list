import { Updater, WithId, WithMarkedForDelete } from '@/types';
import { A, D, F } from '@mobily/ts-belt';

export const markItemForDelete = <T extends WithMarkedForDelete>(item: T): T =>
    D.updateUnsafe(item, '_markedForDelete', () => true);

export const rejectItemsMarkedForDelete = <T extends WithMarkedForDelete>(
    items: readonly T[]
) => items.filter(({ _markedForDelete }) => !_markedForDelete);

export const compareEntityId = <T extends WithId>({ _id }: T, id: string) =>
    _id === id;
export const _compareEntityId =
    <T extends WithId>(id: string) =>
    (item: T) =>
        compareEntityId(item, id);

export const rejectItemWithId = <T extends WithId>(
    list: readonly T[],
    id: string
) => A.reject(list, _compareEntityId(id));
export const _rejectItemWithId =
    <T extends WithId>(id: string) =>
    (list: readonly T[]) =>
        rejectItemWithId(list, id);

export const updateItemWithId = <T extends WithId>(
    list: readonly T[],
    id: string,
    updater: Updater<T>
) => A.map(list, F.ifElse(_compareEntityId(id), updater, F.identity));
export const _updateItemWithId =
    <T extends WithId>(id: string, updater: Updater<T>) =>
    (list: readonly T[]) =>
        updateItemWithId(list, id, updater);
