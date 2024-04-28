import { createSlice } from '@reduxjs/toolkit';

const demoStudents = [
  {
    id: 1,
    name: 'John Smith',
    birthDate: '1995-05-15',
    idnp: '1234567890123',
    excluded: false,
  },
  {
    id: 2,
    name: 'Mary Johnson',
    birthDate: '1990-02-03',
    idnp: '2345678901234',
    excluded: false,
  },
  {
    id: 3,
    name: 'Alexander Brown',
    birthDate: '2002-04-20',
    idnp: '3456789012345',
    excluded: false,
  },
  {
    id: 4,
    name: 'Helen Davis',
    birthDate: '1988-11-25',
    idnp: '4567890123456',
    excluded: false,
  },
  {
    id: 5,
    name: 'David Wilson',
    birthDate: '2000-01-01',
    idnp: '5678901234567',
    excluded: false,
  },
  {
    id: 6,
    name: 'Olivia Anderson',
    birthDate: '1986-08-13',
    idnp: '6789012345678',
    excluded: false,
  },
  {
    id: 7,
    name: 'Anna Taylor',
    birthDate: '1993-11-02',
    idnp: '7890123456789',
    excluded: false,
  },
];

const studentSlice = createSlice({
  name: 'students',
  initialState: demoStudents,
  reducers: {
    addStudent: (state, action) => {
      state.push(action.payload);
    },
    editStudent: (state, action) => {
      const { id, name, birthDate, idnp } = action.payload;
      const studentToUpdate = state.find((student) => student.id === id);
      if (studentToUpdate) {
        studentToUpdate.name = name;
        studentToUpdate.birthDate = birthDate;
        studentToUpdate.idnp = idnp;
      }
    },
    excludeStudent: (state, action) => {
      const index = state.findIndex((student) => student.id === action.payload);
      if (index !== -1) {
        state[index].excluded = !state[index].excluded;
      }
    },
  },
});

export const { addStudent, editStudent, excludeStudent } = studentSlice.actions;
export default studentSlice.reducer;
