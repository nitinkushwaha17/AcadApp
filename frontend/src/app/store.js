import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from '../features/snackbarSlice'
import sidebarReducer from '../features/sidebarSlice'

export default configureStore({
    reducer: {
        snackbar: snackbarReducer,
        sidebar: sidebarReducer
    }
})