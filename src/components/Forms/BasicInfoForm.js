import {
  Box, TextField, FormControl, InputLabel, Select, MenuItem, Tooltip, Typography, Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useDispatch } from 'react-redux';
import { setBasicInfo } from '../../store';
import FormNavigation from '../FormNavigation';

export default function BasicInfoForm({
  fields, errors, touched, countryCode, setCountryCode, state, city, setCity,
  countryCodes, states, cities, handleChange, handleBlur, handleStateChange, handleSubmit
}) {
  const dispatch = useDispatch();

  const handleChangeRedux = (e) => {
    const { name, value } = e.target;
    dispatch(setBasicInfo({ [name]: value }));
    if (handleChange) handleChange(e);
  };

  const handleDateChange = (date) => {
    const formattedDate = date ? date.toLocaleDateString('en-GB') : '';
    dispatch(setBasicInfo({ dob: formattedDate }));
  };

  return (
      <Box sx={{ px: 8, pt: 4, pb: 0, width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: 24, mt: 2 }}>
          Basic information
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280', mb: 4, fontSize: 16 }}>
          Let's start with the essentials.
        </Typography>
        <Box sx={{ background: '#fafbfc', borderRadius: 2, p: 4, mb: 4 }}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 6, md: 6 }}>
              <TextField
                label="Full name"
                required
                name="fullName"
                value={fields.fullName}
                onChange={handleChangeRedux}
                onBlur={() => handleBlur('fullName')}
                error={Boolean(touched.fullName && errors.fullName)}
                helperText={touched.fullName && errors.fullName}
                sx={{ background: '#fff' }}
                placeholder='Full Name'
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <TextField
                label="Email address"
                required
                name="email"
                value={fields.email}
                onChange={handleChangeRedux}
                onBlur={() => handleBlur('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                sx={{ background: '#fff' }}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 2, md: 2 }}>
              <FormControl sx={{ minWidth: 90, mr: 1 }}>
                <InputLabel>Code</InputLabel>
                <Select
                  value={countryCode}
                  label="Code"
                  onChange={e => setCountryCode(e.target.value)}
                  IconComponent={KeyboardArrowDownIcon}
                  sx={{ fontSize: 16 }}
                  formatOptionLabel = {{}}
                  renderValue={(selected) => selected}
                >
                  {countryCodes.map((c) => (
                    <MenuItem key={c.code} value={c.code}>{c.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 4, md: 4 }}>
              <TextField
                label="Phone number"
                required
                name="phone"
                value={fields.phone}
                onChange={handleChangeRedux}
                onBlur={() => handleBlur('phone')}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
                sx={{ background: '#fff' }}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  required
                  label="Date of birth"
                  value={fields.dob ? new Date(fields.dob.split('/').reverse().join('-')) : null}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      error={Boolean(touched.dob && errors.dob)}
                      helperText={touched.dob && errors.dob}
                      onBlur={() => handleBlur('dob')}
                      sx={{ background: '#fff' }}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                  maxDate={new Date()}
                  sx={{
                    '& .MuiInputBase-root': {
                      fontSize: 16,
                    },
                    '& .MuiPickersInputBase-sectionsContainer': {width: "242px", }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl required error={Boolean(touched.state && errors.state)} sx={{ background: '#fff', minWidth: 120, flex: 1 }}>
                <InputLabel>State</InputLabel>
                <Select
                  value={state}
                  label="State"
                  onChange={handleStateChange}
                  onBlur={() => handleBlur('state')}
                  IconComponent={KeyboardArrowDownIcon}
                  sx={{ fontSize: 16 }}
                >
                  {states.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </Select>
                {touched.state && errors.state && (
                  <Typography variant="caption" color="error">{errors.state}</Typography>
                )}
              </FormControl>
              <FormControl required error={Boolean(touched.city && errors.city)} sx={{ background: '#fff', position: 'relative', minWidth: 120, flex: 1 }}>
                <InputLabel>City</InputLabel>
                <Tooltip title={state ? '' : 'City options will load once a state is selected.'} arrow placement="top">
                  <Select
                    value={city}
                    label="City"
                    onChange={e => setCity(e.target.value)}
                    onBlur={() => handleBlur('city')}
                    IconComponent={KeyboardArrowDownIcon}
                    disabled={!state}
                    sx={{ fontSize: 16 }}
                  >
                    {state && (cities.find(value => value.code === state).city).map((c) => (
                      <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                  </Select>
                </Tooltip>
                <InfoOutlinedIcon sx={{ position: 'absolute', right: 36, top: 18, color: '#bdbdbd', fontSize: 20 }} />
                {touched.city && errors.city && (
                  <Typography variant="caption" color="error">{errors.city}</Typography>
                )}
              </FormControl>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
              <TextField
                label="Add LinkedIn url"
                value={fields.linkedin}
                onChange={handleChangeRedux}
                sx={{ background: '#fff' }}
                placeholder="linkedin.com/in/gopireact"
                fullWidth
                helperText="Used to verify your professional presence. Please ensure the URL is accurate and publicly viewable."
              />
            </Grid>
          </Grid>
        </Box>   
        <FormNavigation
          onBack={() => { }}
          onNext={handleSubmit}
          showBack={true}
          showNext={true}
          backDisabled={true}
          nextDisabled={Object.keys(errors).length > 0}
        />
      </Box>
  );
}