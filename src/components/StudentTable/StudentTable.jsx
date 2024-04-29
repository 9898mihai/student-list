import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TablePagination,
} from '@mui/material';
import {
  editStudent,
  excludeStudent,
  addStudent,
} from '../../redux/slices/studentSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import StudentModal from '../StudentModal/StudentModal';
import StudentFilters from '../StudentFilters/StudentFilters';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

const StudentTable = () => {
  const { t } = useTranslation();
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tableEmpty, setTableEmpty] = useState(false);

  const [filteredStudents, setFilteredStudents] = useState(students);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const sortStudentsByName = (students) => {
    return students.slice().sort((a, b) => a.name.localeCompare(b.name));
  };

  // update filtered students when students change
  useEffect(() => {
    setFilteredStudents(sortStudentsByName(students));
  }, [students]);

  // Function to open modal for editing or adding student
  const handleOpenModal = (student) => {
    setModalOpen(true);
    if (student) {
      setEditedStudent(student);
      setIsEditing(true);
    } else {
      setEditedStudent(null);
      setIsEditing(false);
    }
  };

  // Function to close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setIsEditing(false);
  };

  // Function to handle update or addition of student
  const handleUpdate = (studentData) => {
    if (isEditing && editedStudent) {
      dispatch(editStudent({ id: editedStudent.id, ...studentData }));
    } else {
      dispatch(addStudent(studentData));
    }
    handleCloseModal();
  };

  // Function to handle exclusion of student
  const handleExclude = (student) => {
    dispatch(excludeStudent(student.id));
  };

  // Function to filter students based on search criteria
  const handleSearch = (
    { name, idnp, startDate, endDate },
    resetFilters = false
  ) => {
    const filtered = students.filter((student) => {
      let nameMatch = true;
      if (name) {
        nameMatch = student.name.toLowerCase().includes(name.toLowerCase());
      }
      let idnpMatch = true;
      if (idnp) {
        idnpMatch = student.idnp.toLowerCase() === idnp.toLowerCase();
      }

      const birthDate = new Date(student.birthDate);
      const dateMatch =
        (!startDate || birthDate >= startDate) &&
        (!endDate || birthDate <= endDate);

      console.log(dateMatch);
      return nameMatch && idnpMatch && dateMatch;
    });

    setFilteredStudents(sortStudentsByName(filtered));
    setTableEmpty(filtered.length === 0);

    if (resetFilters) {
      setFilteredStudents(sortStudentsByName(students));
      setTableEmpty(false);
    }
  };

  // Function to handle page change in pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Function to handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleOpenModal()}
      >
        {t('addStudent')}
      </Button>

      {students.length === 0 ? (
        <p>{t('studentListEmpty')}</p>
      ) : (
        <>
          <StudentFilters onSearch={handleSearch} />
          {tableEmpty ? (
            <div
              style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}
            >
              <p>{t('noDataFound')}</p>
            </div>
          ) : (
            <TableContainer component={Paper} style={{ marginTop: '10px' }}>
              <Table>
                <TableHead style={{ backgroundColor: '#f0f0f0' }}>
                  <TableRow>
                    <TableCell>{t('studentName')}</TableCell>
                    <TableCell>{t('birthDate')}</TableCell>
                    <TableCell>{t('idnp')}</TableCell>
                    <TableCell>{t('actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredStudents
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((student) => (
                      <TableRow
                        key={student.id}
                        style={{
                          textDecoration: student.excluded
                            ? 'line-through'
                            : 'none',
                          backgroundColor: student.excluded
                            ? '#e0e0e0'
                            : 'inherit',
                        }}
                      >
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          {dayjs(student.birthDate).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>{student.idnp}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleOpenModal(student)}
                            disabled={student.excluded}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleExclude(student)}>
                            {student.excluded ? (
                              <RestoreIcon />
                            ) : (
                              <DeleteIcon />
                            )}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredStudents.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={t('rowsPerPage')}
              />
            </TableContainer>
          )}
        </>
      )}

      <StudentModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleUpdate}
        isEditing={isEditing}
        editedStudent={editedStudent}
      />
    </>
  );
};

export default StudentTable;
