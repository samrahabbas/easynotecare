// ** Redux Imports
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getAgencyDocuments = createAsyncThunk('agency/getDocuments', async (params) => {
  const response = await axios.get('/agency/documents', {params})
  return {
    params,
    data: response.data.documents,
    // need to work on this
    // total pages calculate here
    totalPages: response.data.total,
    count: response.data.total,
  }
})

export const addAgencyDocument = createAsyncThunk(
  'agency/add_newdocument',
  async (data, {dispatch, getState}) => {
    try {
      const response = await axios.post('/agency/add_document', data)
      return response.data
    } catch (error) {
      return error
    }
  }
)

export const agencyDocumentDelete = createAsyncThunk(
  'agency/agencyDocumentDelete',
  async (id, {dispatch, getState}) => {
    try {
      console.log('getState()', getState().agency.params)
      const response = await axios.delete(`/agency/document/${id}`)
      dispatch(getAgencyDocuments(getState().agency.params))
      return response.data
    } catch (error) {
      return error
    }
  }
)

export const agencySlice = createSlice({
  name: 'agency',
  initialState: {
    data: [],
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
      .addCase(getAgencyDocuments.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
        state.count = action.payload.count
        state.isLoading = false
      })
      .addCase(getAgencyDocuments.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getAgencyDocuments.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export default agencySlice.reducer

// export const { toggleModal } = agencySlice.actions;
