import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from '../features/snackbarSlice'

export default configureStore({
    reducer: {
        snackbar: snackbarReducer
    }
})