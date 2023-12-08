import {
    HANDLE_CHANGE,
} from "./FilterAction";

export const reducer = (state, action) => {
    if(action.type === HANDLE_CHANGE) {
        return {
            ...state,
            [action.payload.name]: action.payload.value,
        };
    }
    throw new Error("No Such Action in Filter Reducer");
}
