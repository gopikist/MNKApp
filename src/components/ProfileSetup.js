import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import BasicInfoForm from './Forms/BasicInfoForm';
import WorkExperienceForm from './Forms/WorkExperienceForm';
import EducationForm from './Forms/EducationForm';
import ReviewSubmitForm from './Forms/ReviewSubmitForm';
import { setBasicInfo, setWorkExperience } from '../store';

const steps = ['Basic info', 'Work experience', 'Education', 'Review & submit'];

const countryCodes = [
  { code: '+91', label: 'India(+91)' },
  { code: '+43', label: 'Austria(+43)' },
  { code: '+93', label: 'Afghanistan(+93)' },
  { code: '+213', label: 'Algeria(+213)' },
  { code: '+244', label: 'Angola(+244)' },
  { code: '+355', label: 'Albania(+355)' },
  { code: '+376', label: 'Andorra(+376)' },
];

//States and Cities 
const states = ['Karnataka', 'Maharashtra', 'Odisha'];
const cities = [
  {code: 'Karnataka', city: ['Bangalore', "Mysore"]}, 
  {code: 'Maharashtra', city:['Mumbai', "Pune"]},
  {code: 'Odisha', city: ['Bhubaneswat', 'Cuttack']
}];

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function validatePhone(phone) {
  return /^\d{10}$/.test(phone);
}

function ProfileSetup() {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [countryCode, setCountryCode] = React.useState('+91');
  const [state, setState] = React.useState('');
  const [city, setCity] = React.useState('');
  
  // Get data from Redux store
  const basicInfo = useSelector(state => state.basicInfo);
  const workExp = useSelector(state => state.workExperience);
  
  const [touched, setTouched] = React.useState({});
  const [errors, setErrors] = React.useState({});

  // Example dropdown options
  const yearOptions = Array.from({ length: 31 }, (_, i) => `${2025 - i}`);
  const expYOptions = Array.from({ length: 26 }, (_, i) => `${0 + i}`);
  const expMOptions = Array.from({ length: 13 }, (_, i) => `${0 + i}`);
  const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const noticeOptions = ['15 days', '1 month', '2 months', '3 months', 'More than 3 months'];

  const validate = () => {
    const errs = {};
    if (!basicInfo.fullName) errs.fullName = 'Full name is required.';
    if (!basicInfo.email) errs.email = 'Please enter a valid email address.';
    else if (!validateEmail(basicInfo.email)) errs.email = 'Please enter a valid email address.';
    if (!basicInfo.phone) errs.phone = 'Please enter a valid phone number.';
    else if (!validatePhone(basicInfo.phone)) errs.phone = 'Please enter a valid phone number.';
    if (!basicInfo.dob) errs.dob = 'Date of birth is required.';
    if (!state) errs.state = 'Please select your state.';
    if (!city) errs.city = 'Please select your city.';
    return errs;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setBasicInfo({ [name]: value }));
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity('');
  };

  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setTouched({ fullName: true, email: true, phone: true, dob: true, state: true, city: true });
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setActiveStep(activeStep + 1);
    }
  };

  // Work experience handlers
  const handleWorkExpChange = (e) => {
    const { name, value } = e.target;
    dispatch(setWorkExperience({ [name]: value }));
  };
  const handleWorkExpToggle = (event, newValue) => {
    if (newValue !== null) {
      dispatch(setWorkExperience({ fresher: newValue }));
    }
  };
  const handleWorkExpDropdown = (e) => {
    const { name, value } = e.target;
    dispatch(setWorkExperience({ [name]: value }));
  };
  const handleWorkExpTextArea = (e) => {
    const { name, value } = e.target;
    dispatch(setWorkExperience({ [name]: value.slice(0, 200) }));
  };
  const handleWorkExpBack = () => setActiveStep(activeStep - 1);
  const handleWorkExpNext = () => setActiveStep(activeStep + 1);

  return (
    <Box sx={{ width: 950, mt: 6, mb: 6, mx: 'auto', bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 16px 0 rgba(0, 114, 34, 0.07)', border: '1px solid #ececec', display: 'flex', flexDirection: 'column', alignItems: 'stretch', minHeight: 650 }}>
      {/* Stepper inside card */}
      <Box sx={{ px: 6, pt: 5, pb: 0 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ background: 'transparent', mb: 2 }}>
          {steps.map((label, idx) => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{ sx: { fontSize: 28 } }}
                sx={{
                  '& .MuiStepLabel-label': { fontWeight: idx === activeStep ? 600 : 400, fontSize: 17 },
                  '& .MuiStepLabel-label.Mui-active': { color: '#232e52' },
                  '& .Mui-completed': {color : "green"},
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {/* Step Content */}
      <Box sx={{ flex: 1, px: 8, pt: 0, pb: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {activeStep === 0 && (
            <BasicInfoForm
              fields={basicInfo}
              errors={errors}
              touched={touched}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              state={state}
              setState={setState}
              city={city}
              setCity={setCity}
              countryCodes={countryCodes}
              states={states}
              cities={cities}
              handleChange={handleChange}
              handleBlur={handleBlur}
              handleStateChange={handleStateChange}
              handleSubmit={handleBasicInfoSubmit}
            />
        )}
        {activeStep === 1 && (
          <WorkExperienceForm
            values={workExp}
            handleChange={handleWorkExpChange}
            handleToggle={handleWorkExpToggle}
            handleDropdown={handleWorkExpDropdown}
            handleTextArea={handleWorkExpTextArea}
            handleBack={handleWorkExpBack}
            handleNext={handleWorkExpNext}
            yearOptions={yearOptions}
            expYOptions={expYOptions}
            expMOptions={expMOptions}
            monthOptions={monthOptions}
            noticeOptions={noticeOptions}
            errors={{}}
            touched={{}}
          />
        )}
        {activeStep === 2 && (
          <EducationForm
            onBack={() => setActiveStep(activeStep - 1)}
            onNext={() => setActiveStep(activeStep + 1)}
          />
        )}
        {activeStep === 3 && (
          <ReviewSubmitForm
            onBack={() => setActiveStep(activeStep - 1)}
          />
        )}
      </Box>
    </Box>
  );
}

export default ProfileSetup; 