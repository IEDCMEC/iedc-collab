import { HELLO_WORLD } from "./types";

export default (state, action) => {
  switch (action.type) {
    case HELLO_WORLD: {
      return {
        ...state,
        Name: action.payload,
      };
    }
    default:
      return state;
  }
};