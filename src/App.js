import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from './components/LanguageSwitch/LanguageSwitch';
import StudentTable from './components/StudentTable/StudentTable';

const App = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>{t('appTitle')}</h1>

      <LanguageSwitch />
      <StudentTable />
    </div>
  );
};

export default App;
