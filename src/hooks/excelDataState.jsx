import { atom, selector } from "recoil";
import { fetchExcelData } from "../data/fetchExcelData";

// export const excelDataState = selector({
//   key: "excelDataState",
//   default: selector({
//     key: "excelDataState/Default",
//     get: async () => {
//       const excelUrl = process.env.REACT_APP_EXCEL_URL;
//       const data = await fetchExcelData(excelUrl);
//       return data;
//     },
//   }),
// });

export const locationPathState = atom({
  key: "locationPathState",
  default: "/",
});

export const excelDataState = selector({
  key: "excelDataState",
  get: async ({ get }) => {
    const currentPath = get(locationPathState);

    let excelUrl = process.env.REACT_APP_EXCEL_URL;
    if (currentPath === "/origin") {
      excelUrl = process.env.REACT_APP_EXCEL_ORIGIN_URL;
    }

    const data = await fetchExcelData(excelUrl);
    return data;
  },
});
