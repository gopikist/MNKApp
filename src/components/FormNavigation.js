import React from 'react';
import { Box, Button } from '@mui/material';

export default function FormNavigation({
  onBack,
  onNext,
  onSubmit,
  showBack = true,
  showNext = true,
  showSubmit = false,
  nextDisabled = false,
  submitDisabled = false,
  backDisabled = false,
  nextLabel = 'Next',
  submitLabel = 'Submit',
  backLabel = 'Back',
}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, borderTop: '1px solid #ececec', mt: 2, mb: 2 }}>
      {showBack ? (
        <Button
          variant="text"
          onClick={onBack}
          disabled={backDisabled}
          sx={{
            color: backDisabled ? '#bdbdbd' : '#232e52',
            fontWeight: 500,
            fontSize: 16,
            borderRadius: 1,
            textTransform: 'none',
            bgcolor: 'transparent',
            px: 3,
            py: 1,
          }}
        >
          {backLabel}
        </Button>
      ) : <span />}
      {showNext && (
        <Button
          variant="contained"
          onClick={onNext}
          disabled={nextDisabled}
          sx={{
            bgcolor: nextDisabled ? '#bcbcd1' : '#232e52',
            borderRadius: 1,
            px: 5,
            height: 44,
            fontWeight: 600,
            fontSize: 16,
            textTransform: 'none',
            width: 110,
            boxShadow: 'none',
            '&:hover': { bgcolor: nextDisabled ? '#a0a0b8' : '#1a2240' },
          }}
        >
          {nextLabel}
        </Button>
      )}
      {showSubmit && (
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={submitDisabled}
          sx={{
            bgcolor: submitDisabled ? '#bcbcd1' : '#232e52',
            borderRadius: 1,
            px: 5,
            height: 44,
            fontWeight: 600,
            fontSize: 16,
            textTransform: 'none',
            width: 110,
            boxShadow: 'none',
            '&:hover': { bgcolor: submitDisabled ? '#a0a0b8' : '#1a2240' },
          }}
        >
          {submitLabel}
        </Button>
      )}
    </Box>
  );
} 