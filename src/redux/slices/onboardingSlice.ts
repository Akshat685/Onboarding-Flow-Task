import { createSlice , PayloadAction } from '@reduxjs/toolkit';

interface PersonalInfo {
    fullName : string ;
    dob : string;
    gender: string ;
    nationality: string;
} 

interface ContactDetails {
    email : string ;
    phone : string ;
    address : string ;
    contactMethod : string ;
}

interface Education {
  level: string;
  field: string;
  institution: string;
  year: string;
}

interface WorkExperience {
  employmentStatus: string;
  experienceYears: string;
}

interface Preferences {
  location: string;
  salary: string;
  startDate: string;
  comments: string;
}

interface OnboardingState {
  personalInfo: PersonalInfo;
  contactDetails: ContactDetails;
  education: Education;
  workExperience: WorkExperience;
  preferences: Preferences;
}

const initialState: OnboardingState = {
  personalInfo: { fullName: '', dob: '', gender: '', nationality: '' },
  contactDetails: { email: '', phone: '', address: '', contactMethod: '' },
  education: { level: '', field: '', institution: '', year: '' },
  workExperience: { employmentStatus: '', experienceYears: '' },
  preferences: { location: '', salary: '', startDate: '', comments: '' },
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
    },
    setContactDetails: (state, action: PayloadAction<ContactDetails>) => {
      state.contactDetails = action.payload;
    },
    setEducation: (state, action: PayloadAction<Education>) => {
      state.education = action.payload;
    },
    setWorkExperience: (state, action: PayloadAction<WorkExperience>) => {
      state.workExperience = action.payload;
    },
    setPreferences: (state, action: PayloadAction<Preferences>) => {
      state.preferences = action.payload;
    },
    resetOnboarding: () => initialState,
  },
});

export const {
  setPersonalInfo,
  setContactDetails,
  setEducation,
  setWorkExperience,
  setPreferences,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;