import { WithId } from '@/types';
import { WithMarkedForDelete } from '@/types/utilityTypes';

type ShoppingListItem = WithId &
    WithMarkedForDelete & {
        title: string;
        checked: boolean;
        note: string;
    };

export default ShoppingListItem;
