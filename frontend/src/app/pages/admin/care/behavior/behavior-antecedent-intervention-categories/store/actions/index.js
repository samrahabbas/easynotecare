// ** Redux Imports
import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllBehaviorCategories = createAsyncThunk(
  'care/behavior/category/get/all',
  async () => {
    const response = await axios.get('care/behavior/category/get/all')
    return {
      data: response.data,
    }
  }
)

export const createBehaviorCategory = createAsyncThunk(
  'care/behavior/category/create',
  async (data, {dispatch, getState}) => {
    try {
      const response = await axios.post('care/behavior/category/create', data)
      // dispatch(getAllBehaviorCategories())
      return response.data
    } catch (error) {
      return error
    }
  }
)
export const updateBehaviorCategory = createAsyncThunk(
  'care/behavior/category/update',
  async (data,{dispatch, getState}) => {
    try {
      const response = await axios.put(`care/behavior/category/update/${data._id}`, data)
    // dispatch(getAllBehaviorCategories())
      return response.data
    } catch (error) {
      return error
    }
  }
)

export const deleteBehaviorCategory = createAsyncThunk(
  'care/behavior/category/delete',
  async (data,{dispatch, getState}) => {
    try {
      const response = await axios.delete(`care/behavior/category/delete/${data._id}`)
      // dispatch(getAllBehaviorCategories())
      return response.data
    } catch (error) {
      return error
    }
  }
)



export const getAllBehaviors = createAsyncThunk(
  'care/behavior/get/all',
  async () => {
    const response = await axios.get('care/behavior/get/all')
    return {
      data: response.data,
    }
  }
)

export const createBehavior = createAsyncThunk(
  'care/behavior/create',
  async (data, {dispatch, getState}) => {
    try {
      const response = await axios.post('care/behavior/create', data)
      return response.data
    } catch (error) {
      return error
    }
  }
)
export const updateBehavior = createAsyncThunk(
  'care/behavior/update',
  async ( data, {dispatch, getState}) => {
    try {
      const response = await axios.put(`care/behavior/update/${data._id}`, data)
      return response.data
    } catch (error) {
      return error
    }
  }
)

export const deleteBehavior = createAsyncThunk(
  'care/behavior/delete',
  async (data,{dispatch, getState}) => {
    try {
      const response = await axios.delete(`care/behavior/delete/${data._id}`)
      return response.data
    } catch (error) {
      return error
    }
  }
)
