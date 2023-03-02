// ** Redux Imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getUsersNameList = createAsyncThunk('users/getUsersNameList', async (params) => {
  const response = await axios.get('/user/nameList', {params})
  return {
    params,
    nameList: response.data.users,
  }
})

export const addNewUser = createAsyncThunk(
  'users/addNewUser',
  async (data, {dispatch, getState}) => {
    try {
      const response = await axios.post('/user/add', data)
      return response.data
    } catch (error) {
      return error
    }
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    nameList: [],
    total: 1,
    count: 0,
    params: {},
    allData: [],
    isLoading: false,
    // showModal: false,
  },
  reducers: {
    // toggleModal: (state) => {
    //   state.showModal = !state.showModal;
    //   if (state.showModal === false) {
    //     state.selectedTimesheet = null;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersNameList.fulfilled, (state, action) => {
        state.nameList = action.payload.nameList
        // state.isLoading = false;
      })
      .addCase(getUsersNameList.pending, (state, action) => {
        // state.isLoading = true
      })
      .addCase(getUsersNameList.rejected, (state, action) => {
        // state.isLoading = false
      })
  },
})

export default usersSlice.reducer

// export const { toggleModal } = agencySlice.actions;
