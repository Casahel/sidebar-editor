import tableData from './Adapter';

export const ACTIONS = {
    CATEGORY_MODIFY: 'category-update',
    CATEGORY_DELETE: 'category-delete',
    RESET_ALL: 'reset-all',
}

export const reducer = (state, { type, payload }) => {
    switch (type)
    {
        case ACTIONS.CATEGORY_MODIFY:
            let target = state.findIndex(entry => entry.id === payload.id);
            state[target] = payload;
            if (target === -1 && (payload))
            {
                state.push(payload);
            }
            return [...state];

        case ACTIONS.CATEGORY_DELETE:
            return state.filter((entry) => entry.id !== payload.id);

        case ACTIONS.RESET_ALL:
            state = tableData;
            return [...state];

        default:
            return;
    }
}
