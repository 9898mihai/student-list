import React, { useState, useEffect, useMemo } from 'react';
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
    if (value.length <= 13) {
      setNewIdnp(value);
      setFormChanged(true);
    }
  };

  // Function to handle date change
  const handleDateChange = (date) => {
    setNewBirthDate(date);
    setFormChanged(true);
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

  // Memoized value to determine if form is valid
  const isFormValid = useMemo(() => {
    return !!(newName && newBirthDate && newIdnp && newIdnp.length === 13);
  }, [newName, newBirthDate, newIdnp]);

  // Memoized value to determine if submit button should be disabled
  const isSubmitDisabled = useMemo(() => {
    return !isFormValid || !formChanged;
  }, [isFormValid, formChanged]);

  return (
    <Modal open={open} onClose={onClose}>
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
          disabled={isSubmitDisabled}
        >
          {isEditing ? t('update') : t('add')}
        </Button>
      </div>
    </Modal>
  );
};

export default StudentModal;
