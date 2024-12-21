import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  items: { [key: string]: number };
}

const initialState: OrderState = {
  items: {},
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      if (state.items[productId]) {
        state.items[productId] += 1;
      } else {
        state.items[productId] = 1;
      }
    },
    decrement: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      if (state.items[productId] && state.items[productId] > 1) {
        state.items[productId] -= 1;
      }
    },
    setCount: (state, action: PayloadAction<{ productId: string, count: number }>) => {
      const { productId, count } = action.payload;
      state.items[productId] = count;
    },
  },
});

export const { increment, decrement, setCount } = orderSlice.actions;
export default orderSlice.reducer;