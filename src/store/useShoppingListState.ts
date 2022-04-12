import create from 'zustand';
import { persist, combine } from 'zustand/middleware';
import { ShoppingListItem, Updater } from '@/types';
import { nanoid } from 'nanoid';
import { A, B, D, F, O, pipe } from '@mobily/ts-belt';
import {
    markItemForDelete,
    rejectItemsMarkedForDelete,
    sleep,
    _compareEntityId,
    _updateItemWithId,
} from '@/utils';
import { ITEM_TRANSITION_DURATION } from '@/config';
import { useMemo } from 'react';

type UpdateableShoppingListFields = Pick<ShoppingListItem, 'note' | 'title'>;

const generateNewShoppingListItem = (title: string): ShoppingListItem => ({
    _id: nanoid(),
    _markedForDelete: false,
    checked: false,
    title,
    note: '',
});

const toggleItemChecked = (item: ShoppingListItem): ShoppingListItem =>
    D.updateUnsafe(item, 'checked', B.inverse);

const toggleItemCheckedIfIdMatches =
    (id: string) =>
    (item: ShoppingListItem): ShoppingListItem =>
        F.ifElse(item, _compareEntityId(id), toggleItemChecked, F.identity);

const updateShoppingList =
    <T extends { shoppingList: readonly ShoppingListItem[] }>(
        updater: Updater<readonly ShoppingListItem[]>
    ) =>
    (state: T): T =>
        D.updateUnsafe(state, 'shoppingList', updater);

const state = combine(
    {
        shoppingList: [] as readonly ShoppingListItem[],
        targetedItemId: null as null | string,
    },
    (set, get) => ({
        createNewItem: (title: string) =>
            set(
                updateShoppingList(A.append(generateNewShoppingListItem(title)))
            ),
        deleteItem: async (id: string) => {
            set(updateShoppingList(_updateItemWithId(id, markItemForDelete))); // Mark the item for deletion
            await sleep(ITEM_TRANSITION_DURATION + 10); // Wait for the animation to finish
            set(updateShoppingList(rejectItemsMarkedForDelete)); // Actually delete the item
        },
        toggleItemChecked: (id: string) =>
            set(updateShoppingList(A.map(toggleItemCheckedIfIdMatches(id)))),
        setTargetedItem: (itemId: string) =>
            set(() => ({ targetedItemId: itemId })),
        closeMenu: () => set(() => ({ targetedItemId: null })),
        getFullTargetedItem: () =>
            pipe(
                get()?.shoppingList || [],
                A.find(_compareEntityId(get()?.targetedItemId || '')),
                O.toUndefined
            ),
        updateTargetedItem: (fields: Partial<UpdateableShoppingListFields>) =>
            set(
                updateShoppingList(
                    _updateItemWithId(
                        get()?.targetedItemId || '',
                        D.merge(fields)
                    )
                )
            ),
    })
);

const useShoppingListState = create(
    persist(state, {
        name: 'shoppingList',
        partialize: D.deleteKey('targetedItemId'),
    })
);

export const useShoppingListTargetedItem = () => {
    const { getFullTargetedItem, targetedItemId } = useShoppingListState(
        D.selectKeys(['getFullTargetedItem', 'targetedItemId'])
    );
    const targetedItem = useMemo(getFullTargetedItem, [targetedItemId]);
    return targetedItem;
};
export default useShoppingListState;
