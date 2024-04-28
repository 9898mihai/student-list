import React, { useState } from 'react';
import { TextField, Box, Button, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';

const StudentFilters = ({ onSearch }) => {
  const { t } = useTranslation();

  const [nameFilter, setNameFilter] = useState('');
  const [idnpFilter, setIdnpFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Function to handle search based on filters
  const handleSearch = () => {
    onSearch({ name: nameFilter, idnp: idnpFilter, startDate, endDate });
  };

  // Function to reset filters
  const handleReset = () => {
    setNameFilter('');
    setIdnpFilter('');
    setStartDate(null);
    setEndDate(null);
    onSearch({ name: '', idnp: '', startDate: null, endDate: null });
  };

  // Determine if any filter is set
  const isFilterSet = nameFilter || idnpFilter || startDate || endDate;

  return (
    <Box style={{ margin: '10px 0' }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            label={t('searchByName')}
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            label={t('searchByIdnp')}
            value={idnpFilter}
            onChange={(e) => setIdnpFilter(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('startDate')}
              slotProps={{ textField: { fullWidth: true } }}
              value={startDate}
              onChange={(date) => setStartDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('endDate')}
              slotProps={{ textField: { fullWidth: true } }}
              value={endDate}
              onChange={(date) => setEndDate(date)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={2}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Button fullWidth variant="contained" onClick={handleSearch}>
            {t('search')}
          </Button>
        </Grid>
        {isFilterSet && (
          <Grid
            item
            xs={12}
            sm={6}
            md={2}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Button fullWidth variant="outlined" onClick={handleReset}>
              {t('reset')}
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default StudentFilters;
