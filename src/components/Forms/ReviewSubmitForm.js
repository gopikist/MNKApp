import React, { useRef, useState } from 'react';
import {
  Box, Typography, Button, Paper, Grid, Checkbox, FormControlLabel, IconButton, LinearProgress
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';


const formatFileSize = (size) => {
  if (size < 1024) return `${size}B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)}kb`;
  return `${(size / (1024 * 1024)).toFixed(2)}MB`;
};

export default function ReviewSubmitForm({ onBack, onSubmit }) {
  const basicInfo = useSelector(state => state.basicInfo);
  const workExp = useSelector(state => state.workExperience);
  const educations = useSelector(state => state.education.educations);
  const [checked, setChecked] = useState(false);
  const [resume, setResume] = useState(null);
  const fileInputRef = useRef();
  const [successOpen, setSuccessOpen] = useState(false);

  // Helper: check if any work experience field is filled
  const hasWorkExp =
    workExp.fresher === 'no' &&
    (workExp.company || workExp.jobTitle || workExp.joinYear || workExp.joinMonth || workExp.notice || workExp.profile);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setResume(file);
  };
  const handleRemoveFile = () => setResume(null);

  const handleSubmit = () => {
    setSuccessOpen(true);
    if (onSubmit) onSubmit();
  };
  const handleCloseSuccess = () => setSuccessOpen(false);
  const handleViewProfile = () => {
    setSuccessOpen(false);
    // You can add navigation logic here if needed
  };

  return (
    <>
      <Box sx={{ px: 8, pt: 4, pb: 0, width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, fontSize: 24 }}>
          Review & submit
        </Typography>
        <Typography variant="body2" sx={{ color: '#6b7280', mb: 4, fontSize: 16 }}>
          Almost done! Double-check your info.
        </Typography>
        <Paper elevation={0} sx={{ background: '#fff', borderRadius: 2, p: 4, mb: 4, border: '1px solid #ececec' }}>
          {/* Basic Information */}
          <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Basic information</Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}><Typography sx={{ fontWeight: 500 }}>{basicInfo.fullName || '-'}</Typography><Typography variant="caption" sx={{ color: '#6b7280' }}>Full name</Typography></Grid>
            <Grid item xs={6}><Typography sx={{ fontWeight: 500 }}>{basicInfo.email || '-'}</Typography><Typography variant="caption" sx={{ color: '#6b7280' }}>Email address</Typography></Grid>
            <Grid item xs={6}><Typography sx={{ fontWeight: 500 }}>{basicInfo.phone || '-'}</Typography><Typography variant="caption" sx={{ color: '#6b7280' }}>Phone number</Typography></Grid>
            <Grid item xs={6}><Typography sx={{ fontWeight: 500 }}>{basicInfo.dob || '-'}</Typography><Typography variant="caption" sx={{ color: '#6b7280' }}>Date of birth</Typography></Grid>
            <Grid item xs={12}><Typography sx={{ fontWeight: 500 }}>{basicInfo.linkedin || '-'}</Typography><Typography variant="caption" sx={{ color: '#6b7280' }}>LinkedIn</Typography></Grid>
          </Grid>
          <Box sx={{ borderBottom: '1px solid #ececec', my: 2 }} />
          {/* Work Experience (only if not fresher and at least one field is filled) */}
          {hasWorkExp && (
            <>
              <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Work experience</Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}><Typography sx={{ fontWeight: 500 }}>{workExp.company || '-'}</Typography><Typography variant="caption" sx={{ color: '#6b7280' }}>Company</Typography></Grid>
                <Grid item xs={6}><Typography sx={{ fontWeight: 500 }}>{workExp.jobTitle || '-'}</Typography><Typography variant="caption" sx={{ color: '#6b7280' }}>Job title</Typography></Grid>
                <Grid item xs={6}><Typography sx={{ fontWeight: 500 }}>{workExp.joinYear && workExp.joinMonth ? `${workExp.joinMonth} ${workExp.joinYear}` : '-'}</Typography><Typography variant="caption" sx={{ color: '#6b7280' }}>Joining date</Typography></Grid>
                <Grid item xs={6}><Typography sx={{ fontWeight: 500 }}>{workExp.notice || '-'}</Typography><Typography variant="caption" sx={{ color: '#6b7280' }}>Notice period</Typography></Grid>
                <Grid item xs={12}><Typography sx={{ fontWeight: 500 }}>{workExp.profile || '-'}</Typography><Typography variant="caption" sx={{ color: '#6b7280' }}>Job profile</Typography></Grid>
              </Grid>
              <Box sx={{ borderBottom: '1px solid #ececec', my: 2 }} />
            </>
          )}
          {/* Education */}
          <Typography sx={{ fontWeight: 700, fontSize: 18, mb: 2 }}>Education</Typography>
          {educations.length === 0 ? (
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>No education added.</Typography>
          ) : (
            educations.map((edu, idx) => (
              <Grid container spacing={2} sx={{ mb: 1 }} key={idx}>
                <Grid item xs={6}><Typography sx={{ fontWeight: 500 }}>{edu.degree || '-'}</Typography><Typography variant="caption" sx={{ color: '#6b7280' }}>Degree</Typography></Grid>
                <Grid item xs={6}><Typography sx={{ fontWeight: 500 }}>{edu.institute || '-'}</Typography><Typography variant="caption" sx={{ color: '#6b7280' }}>Institute</Typography></Grid>
                <Grid item xs={6}><Typography sx={{ fontWeight: 500 }}>{edu.startYear && edu.endYear ? `${edu.startYear} - ${edu.endYear}` : '-'}</Typography><Typography variant="caption" sx={{ color: '#6b7280' }}>Duration</Typography></Grid>
                <Grid item xs={6}><Typography sx={{ fontWeight: 500 }}>{edu.location || '-'}</Typography><Typography variant="caption" sx={{ color: '#6b7280' }}>Location</Typography></Grid>
              </Grid>
            ))
          )}
        </Paper>
        {/* Resume upload */}
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: 500, mb: 1 }}>
            Resume upload<span style={{ color: '#e53935' }}>*</span>
          </Typography>
          <Box sx={{ border: '1px dashed #d1d5db', borderRadius: 2, p: 2, background: '#fafbfc', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 1 }}>
            {!resume ? (
              <Button
                variant="outlined"
                startIcon={<UploadFileIcon />}
                sx={{ textTransform: 'none', fontWeight: 500, color: '#232e52', borderColor: '#d1d5db', bgcolor: '#fff', '&:hover': { bgcolor: '#f4f8ff' } }}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                Upload resume
              </Button>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <Box sx={{ width: 32, height: 32, bgcolor: '#f4f8ff', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
                    <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c4.svg" alt="PDF" width={20} height={20} />
                  </Box>
                  <Typography sx={{ fontSize: 15 }}>{resume.name}</Typography>
                  <Typography sx={{ fontSize: 13, color: '#6b7280' }}>{formatFileSize(resume.size)}</Typography>
                  <Box sx={{ flex: 1, ml: 2 }}>
                    <LinearProgress variant="determinate" value={100} sx={{ height: 8, borderRadius: 1, bgcolor: '#e0e7ef' }} />
                  </Box>
                </Box>
                <IconButton onClick={handleRemoveFile} size="small" sx={{ ml: 1 }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".doc,.docx,.rtf,.pdf"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </Box>
          <Typography variant="caption" sx={{ color: '#6b7280' }}>
            Supported Formats: doc, docx, rtf, pdf, upto 2 MB
          </Typography>
        </Box>
        {/* Confirm and Submit */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2,mb: 2 }}>
          <Button variant="text" onClick={onBack} sx={{ color: '#232e52', fontWeight: 500, fontSize: 16, borderRadius: 1, textTransform: 'none', bgcolor: 'transparent', px: 3, py: 1 }}>Back</Button>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} />}
              label={<Typography sx={{ fontSize: 15 }}>Yes, I've checked the above data</Typography>}
            />
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!checked || !resume}
              sx={{ 
                bgcolor: checked ? '#232e52' : '#bcbcd1', 
                borderRadius: 1, 
                px: 5, 
                height: 44, 
                fontWeight: 600, 
                fontSize: 16, 
                textTransform: 'none', 
                width: 110, 
                boxShadow: 'none', 
                '&:hover': { bgcolor: checked ? '#1a2240' : '#a0a0b8' } 
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Success Modal */}
      <Dialog open={successOpen} onClose={handleCloseSuccess} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3, overflow: 'visible' } }}>
        <Box sx={{
          width: '100%',
          background: 'linear-gradient(180deg, #D1FADF 0%, #fff 60%)',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          pt: 5,
          pb: 2,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <IconButton onClick={handleCloseSuccess} sx={{ position: 'absolute', top: 16, right: 16 }}>
            <CloseIcon />
          </IconButton>
          <Box sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}>
            <Box sx={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: '#D1FADF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" fill="#D1FADF"/>
                <path d="M16 25.5L22 31.5L34 19.5" stroke="#16B364" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Box>
          </Box>
        </Box>
        <DialogContent sx={{ pt: 0, pb: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, mt: 1, fontSize: 28, textAlign: 'center' }}>
            Profile submitted successfully
          </Typography>
          <Typography sx={{ color: '#232e52', fontSize: 18, mb: 1, textAlign: 'center' }}>
            {basicInfo.fullName ? `${basicInfo.fullName}'s profile has been created and saved.` : 'Profile has been created and saved.'}
          </Typography>
          <Typography sx={{ color: '#6b7280', fontSize: 16, mb: 3, textAlign: 'center' }}>
            A confirmation email was sent to <b>{basicInfo.email || 'your email'}</b>
          </Typography>
          <Button
            variant="contained"
            onClick={handleViewProfile}
            sx={{
              bgcolor: '#232e52',
              borderRadius: 2,
              px: 5,
              py: 1.5,
              fontWeight: 600,
              fontSize: 18,
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': { bgcolor: '#1a2240' },
              minWidth: 160
            }}
          >
            View profile
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
} 