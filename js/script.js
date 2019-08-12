/******************************************
 Author : Anil Varma Keerthipati
 project : List Pagination and Filtering
*********************************************/
// To load the DOM content first from HTML
document.addEventListener('DOMContentLoaded', () =>{

    //Global variables to store the student list object and maximum number of students to be displayed on screen
    const ul = document.getElementsByClassName('student-list');
    const maxNumber = 10;
    const headerDiv = document.querySelector('.page-header');

    //a h1 element is added to the pageDiv to show the 'no results message'
    const pageDiv = document.querySelector('.page');
    const message = document.createElement('h1');
    pageDiv.appendChild(message);

    //Adding search input field and button to search the student list dynamically
    const searchDiv = document.createElement('div');
    searchDiv.className = 'student-search';
    headerDiv.appendChild(searchDiv);
    const searchInput = document.createElement('input');
    searchInput.placeholder = 'Search for Students....';
    searchDiv.appendChild(searchInput);
    const searchButton = document.createElement('button');
    searchButton.textContent = 'Search';
    searchDiv.appendChild(searchButton);

    // showPage() function is used to hide all students and show only particular set of
    // ten students on each page
    const showPage = (studentList, pageNum) => {
        //start_index and end_index are indexes of student list to show in the current 'pageNum'
        const start_index = (pageNum * maxNumber) - maxNumber;
        const end_index =pageNum * maxNumber;

        //Loop over each student if student list index lies between [start_index, end_index] then add the list to display.
        for (let i = 0; i<studentList.length; i++) {
            let li = studentList[i];
            if(i >= start_index && i < end_index){
                li.style.display = '';
            }
            else{
                li.style.display = 'none';
            }
        }
    };

    // appendPageLinks() is used to add page links dynamically depending on the number of students in the 'studentList'
    const appendPageLinks = (studentList) => {

        //find the number of pages we need for the given student list
        const numberOfPages = (studentList.length / maxNumber) + 1;
        // to make the message empty every time appendPageLinks() is called
        message.textContent = '';

        //remove pagelinks every time appendPageLinks is called
        const checkDiv = pageDiv.querySelector('.pagination');
        if (checkDiv) {
                pageDiv.removeChild(checkDiv);
        }

        // if the studnet list conatins one or more studnet lists then
        if(studentList.length > 0) {
             //create div to add page links at the bottom using class = 'pagination'
             const div = document.createElement('div');
             div.className = 'pagination';
             pageDiv.appendChild(div);

             //create 'ul' element inside 'div'
             const ul = document.createElement('ul');
             div.appendChild(ul);

             //for every page link add 'li' and 'a' elements
             for (let i = 1; i <= numberOfPages; i++) {
                 const li = document.createElement('li');
                 const a = document.createElement('a');
                 a.textContent = i.toString();
                 a.href = '#';
                 if (i === 1) {
                     a.className = 'active';
                 }
                 ul.appendChild(li);
                 li.appendChild(a);

                 //add an event listener to each 'a' tag to call showPage() with
                 // the pageNum that the user clicked
                 a.addEventListener('click', (e) => {
                     const link = e.target;
                     const pageNum = link.textContent;
                     showPage(studentList, pageNum);
                     // select all the pagination class links to remove the class 'active'
                     const pageLinks = document.querySelectorAll('.pagination a');
                     for (let j = 0; j < pageLinks.length; j++) {
                         pageLinks[j].classList.remove('active');
                     }

                     // add the class 'active' to the link that was just clicked
                     link.className = 'active';
                 });
             }

         }
         else{
             // to show the error message if no results are found
             message.textContent = 'sorry, no results found';

         }
    };

    //upgateList() is used to update the student list every time by pressing
    // a key in keyboard or by clicking search button
    const updateList = () => {
        const searchKey = searchInput.value;
        const list = ul[0].children;
        for (let i = 0; i < list.length; i++) {
            let li = list[i];
            let sName = li.querySelector('div h3');
            let studentName = sName.textContent;
            if(studentName.includes(searchKey)){
                li.style.display = '';

            }
            else{
                li.style.display = 'none';
            }

        }
        let newList = [];
        for (let i = 0; i < list.length; i++) {
            let li = list[i];
            if(li.style.display !== 'none'){
                newList.push(li);
            }

        }
        showPage(newList, 1);
        appendPageLinks(newList);
    }

    //everytime if user press a key in keyboard call updateList()
    searchInput.addEventListener('keyup', () =>{
        updateList();

    });

    //everytime if user clicks search button call updateList()
    searchButton.addEventListener('click', () =>{
        updateList();
    });

    // to load the first page every time the web page is refreshed
    const studentList = ul[0].children;
    showPage(studentList, 1);

    // to add page links at the bottom of the web page
    appendPageLinks(studentList);

});

// I did this project to get Exceeds Expectations grade