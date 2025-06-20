import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  term: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.term = action.payload;
    },
    clearSearchTerm: (state) => {
      state.term = "";
    },
  },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;

// src/redux/searchSlice.js 제거됨 (searchParams로 대체됨)
// 이 파일은 더 이상 필요하지 않으므로 삭제해도 됩니다.

// 만약 다른 파일에서 아래 코드를 임포트하고 있다면:
// import { setSearchTerm, clearSearchTerm } from "../../redux/searchSlice";
// => 해당 코드도 삭제하거나, searchParams 로직으로 교체하세요.

// Redux store 구성에서 searchSlice 등록도 제거하세요:
// 예: reducer: { movie: movieSlice.reducer, search: searchSlice.reducer } -> search 제거
