import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  token: ``,
  isLoading: false
}

const userSlice = createSlice({
  name: `user`,

  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload
      state.isLoading = false
    },

    unsetToken: (state) => {
      state.token = initialState.token
      state.isLoading = false
    },

    setUser: (state, { payload }) => {
      state.user = payload
      state.isLoading = false
    },

    unsetUser: (state) => {
      state.user = initialState.user
      state.isLoading = false
    },

    setLoading: (state) => {
      state.isLoading = true
    },

    unsetLoading: (state) => {
      state.isLoading = false
    }
  },
})

export const { setToken, unsetToken, setUser, unsetUser, setLoading, unsetLoading } =
  userSlice.actions

export const user = userSlice.reducer
