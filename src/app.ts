import { singlePageDataType } from "./types";
import getData from "./getData";

let currentPage = 1;
let tableData: { [key: number]: singlePageDataType[] } = {};
const tbody = document.querySelector("tbody");

const prevBtn = document.querySelector("[data-prevbtn]");
const nextBtn = document.querySelector("[data-nextbtn]");
const pageview = document.querySelector("[data-pageview]");

const startApp = async () => {
  loadData();
  previewLabel();
  checkPrevBtnState();
};

nextBtn?.addEventListener("click", () => {
  currentPage = currentPage + 1;
  // loadData();
  if (tableData[currentPage]) {
    displayData(tableData[currentPage]);
  } else {
    loadData();
  }
  checkPrevBtnState();
});
prevBtn?.addEventListener("click", () => {
  currentPage = currentPage - 1;
  // loadData();
  checkPrevBtnState();
  if (tableData[currentPage]) {
    displayData(tableData[currentPage]);
  } else {
    loadData();
  }
  checkPrevBtnState();
});

const checkPrevBtnState = () => {
  if (currentPage <= 1) {
    prevBtn?.setAttribute("disabled", "true");
  } else {
    prevBtn?.removeAttribute("disabled");
  }
};

const loadData = () => {
  getData(currentPage)
    .then((data) => {
      tableData = { ...tableData, ...data.results[0] };
      displayData(tableData[currentPage]);
    })
    .catch((err) => console.error(err));
};

const previewLabel = () => {
  pageview!.innerHTML = `Showing Page ${currentPage}`;
};
const displayData = (datas: singlePageDataType[]) => {
  tbody!.innerHTML = "";
  datas.forEach((data) => {
    tbody!.innerHTML += `
    <tr  data-entryid=${data.id}>
    <td>${data.row}</td>
    <td>${data.gender}</td>
    <td>${data.age}</td>
  </tr>
  `;
  });
  previewLabel();
};

document.addEventListener("DOMContentLoaded", startApp);
