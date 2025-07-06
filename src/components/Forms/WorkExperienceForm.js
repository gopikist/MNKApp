import React from 'react';
import {
  Box, Typography, ToggleButtonGroup, ToggleButton, TextField, MenuItem, Select, FormControl, InputLabel, Grid
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setWorkExperience } from '../../store';
import FormNavigation from '../FormNavigation';

export default function WorkExperienceForm({
  values, errors, touched, handleChange, handleBlur, handleToggle, handleDropdown, handleTextArea, handleBack, handleNext,
  yearOptions, expYOptions, expMOptions, monthOptions, noticeOptions
}) {
  const dispatch = useDispatch();

  const handleChangeRedux = (e) => {
    const { name, value } = e.target;
    dispatch(setWorkExperience({ [name]: value }));
    if (handleChange) handleChange(e);
  };

  const handleToggleRedux = (event, newValue) => {
    if (newValue !== null) {
      dispatch(setWorkExperience({ fresher: newValue }));
      if (handleToggle) handleToggle(event, newValue);
    }
  };

  const handleDropdownRedux = (e) => {
    const { name, value } = e.target;
    dispatch(setWorkExperience({ [name]: value }));
    if (handleDropdown) handleDropdown(e);
  };

  const handleTextAreaRedux = (e) => {
    const { name, value } = e.target;
    dispatch(setWorkExperience({ [name]: value.slice(0, 200) }));
    if (handleTextArea) handleTextArea(e);
  };

  return (
    <Box sx={{ px: 8, pt: 4, pb: 0, width: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: 24 }}>
        Work experience
      </Typography>
      <Typography variant="body2" sx={{ color: '#6b7280', mb: 4, fontSize: 16 }}>
        Details like job title, company name, etc, help employers understand your work
      </Typography>
      {/* Fresher Toggle */}
      <Box sx={{ mb: 2 }}>
        <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
          Are you a fresher?<span style={{ color: '#e53935' }}>*</span>
        </Typography>
        <ToggleButtonGroup
          value={values.fresher}
          exclusive
          onChange={handleToggleRedux}
          sx={{ background: '#fafbfc', borderRadius: 2, boxShadow: 'none', width: 320 }}
        >
          <ToggleButton
            value="yes"
            sx={{
              width: 160,
              fontWeight: 600,
              fontSize: 16,
              border: '1px solid #232e52',
              borderRadius: 0,
              borderLeft: 'none',
              bgcolor: values.fresher === 'yes' ? '#f4f8ff' : '#fff',
              color: values.fresher === 'yes' ? '#232e52' : '#232e52',
              '&:first-of-type': {
                borderLeft: '1px solid #232e52',
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8
              },
              '&.Mui-selected': {
                bgcolor: '#f4f8ff',
                borderColor: '#232e52',
                color: '#232e52',
                zIndex: 1
              }
            }}
          >
            Yes
          </ToggleButton>
          <ToggleButton
            value="no"
            sx={{
              width: 160,
              fontWeight: 600,
              fontSize: 16,
              border: '1px solid #232e52',
              borderRadius: 0,
              borderLeft: 'none',
              bgcolor: values.fresher === 'no' ? '#f4f8ff' : '#fff',
              color: values.fresher === 'no' ? '#232e52' : '#232e52',
              '&:last-of-type': {
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8
              },
              '&.Mui-selected': {
                bgcolor: '#f4f8ff',
                borderColor: '#232e52',
                color: '#232e52',
                zIndex: 1
              }
            }}
          >
            No
          </ToggleButton>
        </ToggleButtonGroup>
        {touched.fresher && errors.fresher && (
          <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>{errors.fresher}</Typography>
        )}
      </Box>
      {/* Experience Fields - only show if fresher is 'no' */}
      {values.fresher === 'no' && (
        <Box sx={{ background: '#fafbfc', borderRadius: 2, p: 2, mb: 2 }}>
          <Grid container spacing={3}>
            {/* Total Experience */}
            <Grid size={{ xs: 12, md: 12 }}>
              <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                Total experience<span style={{ color: '#e53935' }}>*</span>
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl sx={{ minWidth: 120, flex: 1 }}>
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={values.expYear}
                    label="Year"
                    name="expYear"
                    onChange={handleDropdownRedux}
                    onBlur={handleBlur}
                  >
                    {expYOptions.map((y) => (
                      <MenuItem key={y} value={y}>{y}{y<2 ? " Year": " Years"}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120, flex: 1 }}>
                  <InputLabel>Month</InputLabel>
                  <Select
                    value={values.expMonth}
                    label="Month"
                    name="expMonth"
                    onChange={handleDropdownRedux}
                    onBlur={handleBlur}
                  >
                    {expMOptions.map((m) => (
                      <MenuItem key={m} value={m}>{m}{m<2 ? " Month": " Months"}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {(touched.expYear && errors.expYear) && (
                <Typography variant="caption" color="error">{errors.expYear}</Typography>
              )}
            </Grid>
            {/* Company Name */}
            <Grid size={{ xs: 6, md: 6 }}>
              <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                Current company name<span style={{ color: '#e53935' }}>*</span>
              </Typography>
              <TextField
                name="company"
                value={values.company}
                onChange={handleChangeRedux}
                onBlur={handleBlur}
                placeholder="Type your organisation"
                fullWidth
                sx={{ background: '#fff' }}
                error={Boolean(touched.company && errors.company)}
                helperText={touched.company && errors.company}
              />
            </Grid>
            {/* Job Title */}
            <Grid size={{ xs: 6, md: 6 }}>
              <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                Current job title<span style={{ color: '#e53935' }}>*</span>
              </Typography>
              <TextField
                name="jobTitle"
                value={values.jobTitle}
                onChange={handleChangeRedux}
                onBlur={handleBlur}
                placeholder="Type your designation"
                fullWidth
                sx={{ background: '#fff' }}
                error={Boolean(touched.jobTitle && errors.jobTitle)}
                helperText={touched.jobTitle && errors.jobTitle}
              />
            </Grid>
            {/* Joining Date */}
            <Grid size={{ xs: 12, md: 12 }}>
              <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                Joining date<span style={{ color: '#e53935' }}>*</span>
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl sx={{ minWidth: 120, flex: 1 }}>
                  <InputLabel>Year</InputLabel>
                  <Select
                    value={values.joinYear}
                    label="Year"
                    name="joinYear"
                    onChange={handleDropdownRedux}
                    onBlur={handleBlur}
                  >
                    {yearOptions.map((y) => (
                      <MenuItem key={y} value={y}>{y}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120, flex: 1 }}>
                  <InputLabel>Month</InputLabel>
                  <Select
                    value={values.joinMonth}
                    label="Month"
                    name="joinMonth"
                    onChange={handleDropdownRedux}
                    onBlur={handleBlur}
                  >
                    {monthOptions.map((m) => (
                      <MenuItem key={m} value={m}>{m}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              {(touched.joinYear && errors.joinYear) && (
                <Typography variant="caption" color="error">{errors.joinYear}</Typography>
              )}
            </Grid>
            {/* Notice Period */}
            <Grid size={{ xs: 12, md: 12 }}>
              <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                Notice period<span style={{ color: '#e53935' }}>*</span>
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Notice period</InputLabel>
                <Select
                  value={values.notice}
                  label="Notice period"
                  name="notice"
                  onChange={handleDropdownRedux}
                  onBlur={handleBlur}
                >
                  {noticeOptions.map((n) => (
                    <MenuItem key={n} value={n}>{n}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {touched.notice && errors.notice && (
                <Typography variant="caption" color="error">{errors.notice}</Typography>
              )}
            </Grid>
            {/* Job Profile */}
            <Grid size={{ xs: 12, md: 12 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
                  Job profile
                </Typography>
                <Typography sx={{ fontSize: 14, color: '#6b7280' }}>{values.profile.length}/200</Typography>
              </Box>
              <TextField
                name="profile"
                value={values.profile}
                onChange={handleTextAreaRedux}
                onBlur={handleBlur}
                placeholder="Type here"
                fullWidth
                multiline
                minRows={2}
                sx={{ background: '#fff', maxLength: 200 }}
              />
            </Grid>
          </Grid>
        </Box>
      )}
      <FormNavigation
        onBack={handleBack}
        onNext={handleNext}
        showBack={true}
        showNext={true}
        nextDisabled={false}
      />
    </Box>
  );
} 