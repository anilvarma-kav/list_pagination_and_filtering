/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const studentList = document.getElementsByClassName('student-item cf');
const maxNumber = 10;

const showPage = (studentList, pageNum) => {
    const start_index = (pageNum * maxNumber) - maxNumber;
    const end_index =pageNum * maxNumber;
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
showPage(studentList, 1);
const appendPageLinks = (studentList) => {
    const numberOfPages = parseInt(studentList.length/maxNumber)+1;
    console.log(numberOfPages);
    const pageDiv = document.querySelector('.page');
    const div = document.createElement('div');
    div.className = 'pagination';
    pageDiv.appendChild(div);
    const ul = document.createElement('ul');
    div.appendChild(ul);
    for (let i = 1; i <= numberOfPages; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = i.toString();
        ul.appendChild(li);
        li.appendChild(a);
        a.addEventListener('click' , (e) => {
            const link = e.target;
            const pageNum = link.textContent;
            showPage(studentList, pageNum);
            const pageLinks = document.querySelectorAll('.pagination a');
            for (let j = 0; j < pageLinks.length; j++) {
                pageLinks[j].classList.remove('active');
            }
            link.className = 'active';
        });
    }



};

appendPageLinks(studentList);
