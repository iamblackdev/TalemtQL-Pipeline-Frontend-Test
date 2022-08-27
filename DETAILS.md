# How does this work

The project fetches (randomised) data from the server and display in on the table.

## Process stpes

1.  An event listener (DOMContentLoaded) is added to the documnet object that listens for when the dom contetnt is loaded.
2.  After the dom is loaded a function "startApp" is called wihich also calls the "loadData" function.
3.  The loadData function uses javascript native fetch API to fetch the data of the current page which is set to one (1) by default. When you fetch page N, you get data for page N and N+1 (i.e the API always returns 2 pages by default), which contains five records each. All data are stored in variable "tableData" which is an empty object by default and contains all the pages with there records that have been fetched.

4.  The "displayData" function is then called, it receive an argument of a page data with an array of it records which it map through and display the in the table in differrnt rows with unique "data-entryid" of each record "id".

5.  An event listener is added to the next and previous button when the next or prviout button is clicked it increment the current page and checks the "tableData" variable is the current page records has been fetched. if current page data is present in the "tableData" variable the "displayData" function is called passing an array of current page records. if the pagedata is not found it calls the "loadData" function and get the required page data which is stored in the "tableData" variable to avoid re-fetching when needed.

6.  The previous button is disabled by default because current page is set to 1 by default and there is no other page before the page 1, and there is a function "checkPrevBtnState" which checks the current page and set the previous button to disable is the "currentPage" is 1.

7.  There is also a "previewLabel" function which updates the label for the current page being diaplaed.
