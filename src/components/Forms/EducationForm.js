import React from 'react';
import { Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel, Grid, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addEducation, removeEducation } from '../../store';
import FormNavigation from '../FormNavigation';

const degreeOptions = [
  'B.Tech', 'M.Tech', 'B.Sc', 'M.Sc', 'B.A', 'M.A', 'B.Com', 'M.Com', 'PhD', 'Other'
];
const yearOptions = Array.from({ length: 50 }, (_, i) => 2025 - i);

export default function EducationForm({ onNext, onBack }) {
  const dispatch = useDispatch();
  const educations = useSelector(state => state.education.educations);
  const [degree, setDegree] = React.useState('');
  const [institute, setInstitute] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [startYear, setStartYear] = React.useState('');
  const [endYear, setEndYear] = React.useState('');

  const isAddEnabled = degree && institute && location && startYear && endYear;

  const handleAddEducation = () => {
    if (!isAddEnabled) return;
    dispatch(addEducation({ degree, institute, location, startYear, endYear }));
    setDegree('');
    setInstitute('');
    setLocation('');
    setStartYear('');
    setEndYear('');
  };

  const handleRemoveEducation = (idx) => {
    dispatch(removeEducation(idx));
  };

  return (
    <Box sx={{ px: 8, pt: 4, pb: 0, width: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: 24 }}>
        Education
      </Typography>
      <Typography variant="body2" sx={{ color: '#6b7280', mb: 4, fontSize: 16 }}>
        Details like course, university, and more, help recruiters identify your educational background
      </Typography>
      {educations.length > 0 && (
        <Paper elevation={0} sx={{ background: '#fafbfc', borderRadius: 2, p: 3, mb: 4 }}>
          {educations.map((edu, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, borderRadius: 1, background: '#fff', boxShadow: '0 1px 4px 0 rgba(44,62,80,0.04)' }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontWeight: 500 }}>{edu.degree}</Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>{edu.institute}, {edu.location}</Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>Duration: {edu.startYear} - {edu.endYear}</Typography>
              </Box>
              <IconButton onClick={() => handleRemoveEducation(idx)} aria-label="Remove education" size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Paper>
      )}
      <Paper elevation={0} sx={{ background: '#fafbfc', borderRadius: 2, p: 4, mb: 4 }}>
        {/* Degree */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Degree</InputLabel>
          <Select
            value={degree}
            label="Degree"
            onChange={e => setDegree(e.target.value)}
          >
            {degreeOptions.map((deg) => (
              <MenuItem key={deg} value={deg}>{deg}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Institute name and Location */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 6, md: 6 }}>
            <TextField
              label="Institute name"
              placeholder="Type your institute name"
              value={institute}
              onChange={e => setInstitute(e.target.value)}
              fullWidth
              sx={{ background: '#fff' }}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 6 }}>
            <TextField
              label="Location"
              placeholder="City"
              value={location}
              onChange={e => setLocation(e.target.value)}
              fullWidth
              sx={{ background: '#fff' }}
            />
          </Grid>
        </Grid>
        {/* Duration */}
        <Box sx={{ background: '#fafbfc', borderRadius: 2, mb: 2 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 12 }}>
              <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                Duration
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl sx={{ minWidth: 140, flex: 1 }}>
                  <InputLabel>Start year</InputLabel>
                  <Select
                    value={startYear}
                    label="Start year"
                    onChange={e => setStartYear(e.target.value)}
                  >
                    {yearOptions.map((y) => (
                      <MenuItem key={y} value={y}>{y}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography sx={{ m: 1 }}>to</Typography>
                <FormControl sx={{ minWidth: 140, flex: 1 }}>
                  <InputLabel>End year</InputLabel>
                  <Select
                    value={endYear}
                    label="End year"
                    onChange={e => setEndYear(e.target.value)}
                  >
                    {yearOptions.map((y) => (
                      <MenuItem key={y} value={y}>{y}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* Add education button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            startIcon={<span style={{fontWeight:600, fontSize:18}}>+</span>}
            sx={{ color: '#6b7280', borderColor: '#d1d5db', textTransform: 'none', fontWeight: 500, bgcolor: '#f8f9fa', '&:hover': { bgcolor: '#f4f8ff' } }}
            disabled={!isAddEnabled}
            onClick={handleAddEducation}
          >
            Add education
          </Button>
        </Box>
      </Paper>
      <FormNavigation
        onBack={onBack}
        onNext={onNext}
        showBack={true}
        showNext={true}
        nextDisabled={false}
      />
    </Box>
  );
} 