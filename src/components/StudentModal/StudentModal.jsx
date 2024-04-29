import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addStudent, editStudent } from '../../redux/slices/studentSlice';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import styles from './StudentModal.module.scss';

const StudentModal = ({
  open,
  onClose,
  isEditing,
  editedStudent,
  name,
  birthDate,
  idnp,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [newName, setNewName] = useState(name);
  const [newBirthDate, setNewBirthDate] = useState(
    birthDate ? dayjs(birthDate) : null
  );
  const [newIdnp, setNewIdnp] = useState(idnp);
  const [formChanged, setFormChanged] = useState(false);
  const [isDateError, setIsDateError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Update form fields when editing
  useEffect(() => {
    if (isEditing && editedStudent) {
      setNewName(editedStudent.name);
      setNewBirthDate(
        editedStudent.birthDate ? dayjs(editedStudent.birthDate) : null
      );
      setNewIdnp(editedStudent.idnp);
    } else {
      setNewName(name);
      setNewBirthDate(birthDate ? dayjs(birthDate) : null);
      setNewIdnp(idnp);
    }
  }, [isEditing, editedStudent, name, birthDate, idnp]);

  // Function to handle IDNP change
  const handleIDNPChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setNewIdnp(value);
    setFormChanged(true);
  };

  // Function to handle date change
  const handleDateChange = (date) => {
    setNewBirthDate(date);
    setFormChanged(true);
    setIsDateError(
      !date ||
        date.isBefore(dayjs('1900-01-01')) ||
        dayjs(date).isAfter(dayjs())
    );
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (isEditing) {
      dispatch(
        editStudent({
          id: editedStudent.id,
          name: newName,
          birthDate: newBirthDate ? newBirthDate.format('MM-DD-YYYY') : null,
          idnp: newIdnp,
        })
      );
    } else {
      dispatch(
        addStudent({
          name: newName,
          birthDate: newBirthDate ? newBirthDate.format('MM-DD-YYYY') : null,
          idnp: newIdnp,
        })
      );
    }
    onClose();
    setFormChanged(false);
  };

  // Function to reset form fields
  const handleModalClose = () => {
    setNewName('');
    setNewBirthDate(null);
    setNewIdnp('');
    setFormChanged(false);
    onClose();
  };

  useEffect(() => {
    setIsFormValid(
      newName &&
        newBirthDate &&
        !isDateError &&
        newIdnp &&
        newIdnp.length === 13
    );
  }, [newName, newBirthDate, isDateError, newIdnp]);

  return (
    <Modal open={open} onClose={handleModalClose}>
      <div className={styles.modal}>
        <TextField
          label={t('studentName')}
          style={{ marginBottom: '10px' }}
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
            setFormChanged(true);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={t('birthDate')}
            value={newBirthDate}
            onChange={handleDateChange}
            renderInput={(props) => <TextField {...props} />}
            format={'DD/MM/YYYY'}
            maxDate={dayjs()}
            onError={() => setIsDateError(true)}
          />
        </LocalizationProvider>
        <TextField
          label={t('idnp')}
          style={{ marginTop: '10px', marginBottom: '10px' }}
          value={newIdnp}
          onChange={handleIDNPChange}
          inputProps={{ maxLength: 13 }}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!isFormValid || !formChanged}
        >
          {isEditing ? t('update') : t('add')}
        </Button>
      </div>
    </Modal>
  );
};

export default StudentModal;
