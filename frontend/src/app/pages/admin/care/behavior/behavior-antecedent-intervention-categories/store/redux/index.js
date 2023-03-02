import {createSlice} from '@reduxjs/toolkit'
import {getAllBehaviorCategories, getAllBehaviors} from '../actions'
export const behaviorInterventionSlice = createSlice({
  name: 'behavior',
  initialState: {
    behaviorCategories: [],
    behaviors:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBehaviorCategories.fulfilled, (state, action) => {
      state.behaviorCategories = action.payload.data
    })
      .addCase(getAllBehaviors.fulfilled, (state, action) => {
        state.behaviors = action.payload.data
      })
  },
})

export default behaviorInterventionSlice.reducer
