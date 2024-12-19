// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// const initialState = {
//   value: 0
// }

// const orderSlice = createSlice({
//   name: 'order',
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1
//     },
//     decrement: (state) => {
//       state.value -= 1
//     },
//     setCount: (state, action: PayloadAction<number>) => {
//       state.value = action.payload
//     }
//   }
// })

// export const { increment, decrement, setCount } = orderSlice.actions
// export default orderSlice.reducer



// filepath: /c:/Najot Ta'lim/8- OY/green-shop/app/orderSlice.ts
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