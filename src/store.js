import { configureStore, createSlice } from '@reduxjs/toolkit';

const basicInfoSlice = createSlice({
  name: 'basicInfo',
  initialState: {
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    linkedin: '',
    location: '',
  },
  reducers: {
    setBasicInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

const workExperienceSlice = createSlice({
  name: 'workExperience',
  initialState: {
    fresher: 'no',
    expYear: '',
    expMonth: '',
    company: '',
    jobTitle: '',
    joinYear: '',
    joinMonth: '',
    notice: '',
    profile: '',
  },
  reducers: {
    setWorkExperience: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

const educationSlice = createSlice({
  name: 'education',
  initialState: {
    educations: [],
  },
  reducers: {
    setEducations: (state, action) => {
      state.educations = action.payload;
    },
    addEducation: (state, action) => {
      state.educations.push(action.payload);
    },
    removeEducation: (state, action) => {
      state.educations.splice(action.payload, 1);
    },
  },
});

export const { setBasicInfo } = basicInfoSlice.actions;
export const { setWorkExperience } = workExperienceSlice.actions;
export const { setEducations, addEducation, removeEducation } = educationSlice.actions;

const store = configureStore({
  reducer: {
    basicInfo: basicInfoSlice.reducer,
    workExperience: workExperienceSlice.reducer,
    education: educationSlice.reducer,
  },
});

export default store; 