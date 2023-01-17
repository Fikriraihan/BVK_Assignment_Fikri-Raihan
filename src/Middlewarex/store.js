import { configureStore } from '@reduxjs/toolkit';
import catReducers from './reducers/cat.reducers';

export default configureStore({
    reducer: {
        cat: catReducers,
    },
});
