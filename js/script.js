/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
/******************************************
 Author : Anil Varma Keerthipati
*********************************************/
// To load the DOM content first from HTML
document.addEventListener('DOMContentLoaded', () =>{

    //Global variables to store the student list object and maximum number of students
    // to be displayed on screen
    const studentList = document.getElementsByClassName('student-item cf');
    const maxNumber = 10;

    // showPage() function is used to hide all students and show only particular set of
    // ten students on each page

    const showPage = (studentList, pageNum) => {
        // start-index and end_index variables are calculated to find the index boundaries of students
        // that should be displayed on the current pageNum
        const start_index = (pageNum * maxNumber) - maxNumber;
        const end_index =pageNum * maxNumber;

        //Loop over each student  if student index lies between start_index and end_index
        // then add the list with studnet details to the page.
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

    // appendPageLinks() is used to add page links depending on the number of students
    const appendPageLinks = (studentList) => {

        //find the number of pages we need for the given student list
        const numberOfPages = parseInt(studentList.length/maxNumber)+1;
        //selectt the page DIV element
        const pageDiv = document.querySelector('.page');

        //create div to add page links at the bottom using class = 'pagination'
        const div = document.createElement('div');
        div.className = 'pagination';
        pageDiv.appendChild(div);

        //create 'ul' element inside 'div'
        const ul = document.createElement('ul');
        div.appendChild(ul);

        //for every page add 'li' and 'a' elements
        for (let i = 1; i <= numberOfPages; i++) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = i.toString();
            if(i==1){
                a.className = 'active';
            }
            ul.appendChild(li);
            li.appendChild(a);

            //add an event listener to each 'a' tag to call showPage() with
            // the pageNum that the user clicked
            a.addEventListener('click' , (e) => {
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



    };
    // to load the first page every time the web page is refreshed
    showPage(studentList, 1);

    // to add page links at the bottom of the web page
    appendPageLinks(studentList);

});
