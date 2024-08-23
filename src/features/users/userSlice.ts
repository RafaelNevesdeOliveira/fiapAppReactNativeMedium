import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addUser, fetchUsers, User } from '../../service/userService';

interface UserState {
  users: User[];
  loading: boolean;  
  error: string | null;
}

const initialState: UserState = {
  users: [],   
  loading: false,   
  error: null,   
}

export const registerUserAsync = createAsyncThunk(
  'users/registerUser',   
  async (user: Omit<User, 'id'>) => {  
    return await addUser(user);    
  }
)

export const fetchUsersAsync = createAsyncThunk(
  'users/fetchUsers', 
  async () => {
    return await fetchUsers();
  }
)

const userSlice = createSlice({
  name: 'users',  
  initialState, 
  reducers: {},
  extraReducers: (builder) => {  
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;  
        state.error = null;     
      })
      .addCase(registerUserAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;  
        state.users.push(action.payload);  
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false; 
        state.error = action.error.message || 'Failed to register user'; 
      })
      .addCase(fetchUsersAsync.pending, (state) => {
        state.loading = true; 
        state.error = null;    
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;  
        state.users = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.loading = false;  
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export default userSlice.reducer;