import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select } from '@mui/material';
import { styled } from '@mui/system';

const StyledSelect = styled(Select)({
  position: 'absolute',
  right: '20px',
  '& .MuiSelect-select': {
    padding: '7px 20px',
  },
});

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <StyledSelect
      value={currentLanguage}
      onChange={(event) => changeLanguage(event.target.value)}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="ru">Русский</MenuItem>
    </StyledSelect>
  );
};

export default LanguageSwitch;
