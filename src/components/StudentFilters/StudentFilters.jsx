import React, { useState, useEffect } from 'react';
import { TextField, Box, Button, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const StudentFilters = ({ onSearch }) => {
  const { t } = useTranslation();

  const [nameFilter, setNameFilter] = useState('');
  const [idnpFilter, setIdnpFilter] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDateValid, setIsDateValid] = useState(true);
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);

  // Check date validity
  useEffect(() => {
    setIsDateValid(
      (!startDate && !endDate) ||
        (startDate && dayjs(startDate).isValid() && !endDate) ||
        (endDate && dayjs(endDate).isValid() && !startDate) ||
        (startDate &&
          endDate &&
          dayjs(startDate).isValid() &&
          dayjs(endDate).isValid() &&
          startDate <= endDate)
    );
  }, [startDate, endDate]);

  // Enable search button
  useEffect(() => {
    setIsSearchEnabled(
      nameFilter.trim() !== '' ||
        idnpFilter.trim() !== '' ||
        startDate !== null ||
        endDate !== null
    );
  }, [nameFilter, idnpFilter, startDate, endDate]);

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
    onSearch({ name: '', idnp: '', startDate: null, endDate: null }, true);
  };

  // Validate input dates
  const handleStartDateChange = (date) => {
    if (
      !date ||
      dayjs(date).isBefore(dayjs('1900-01-01')) ||
      dayjs(date).isAfter(dayjs())
    )
      return;
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    if (
      !date ||
      dayjs(date).isBefore(dayjs('1900-01-01')) ||
      dayjs(date).isAfter(dayjs())
    )
      return;
    setEndDate(date);
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
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setIdnpFilter(value);
            }}
            inputProps={{
              maxLength: 13,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('startDate')}
              slotProps={{ textField: { fullWidth: true } }}
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} />}
              format={'DD/MM/YYYY'}
              maxDate={dayjs()}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('endDate')}
              slotProps={{ textField: { fullWidth: true } }}
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} />}
              format={'DD/MM/YYYY'}
              maxDate={dayjs()}
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
          <Button
            fullWidth
            variant="contained"
            onClick={handleSearch}
            disabled={!isSearchEnabled || !isDateValid}
          >
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
