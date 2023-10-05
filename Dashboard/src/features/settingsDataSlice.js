import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import settingsDataService from './settingsDataService'
const id = 0;

const initialState = {
  settingsdata: [],
  isSettingsError: false,
  isSettingsSuccess: false,
  isSettingsLoading: false,
  settingsMessage: '',
}

export const getSettingsData = createAsyncThunk(
  'settingsdata/get',
  async (thunkAPI) => {
    try {
      //const token = thunkAPI.getState().auth.user.token
      return await settingsDataService.getSettingsData(id)
    } catch (error) {
      const settingsMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message
        ) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(settingsMessage)
    }
  }
)

export const settingsDataSlice = createSlice({
  name: 'settingsdata',
  initialState,
  reducers: {
    settingsreset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSettingsData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSettingsData.fulfilled, (state, action) => {
        state.isSettingsLoading = false
        state.isSettingsSuccess = true
        state.settingsdata = action.payload
      })
      .addCase(getSettingsData.rejected, (state, action) => {
        state.isSettingsLoading = false
        state.isSettingsError = true
        state.settingsdata = action.payload
      })
  },
})

export const { settingsreset } = settingsDataSlice.actions
export default settingsDataSlice.reducer