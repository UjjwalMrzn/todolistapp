const user = document.getElementById('userId');
const mybutton = document.getElementById('btn');
const tasklist = document.getElementById('tasklist');
const clearbtn = document.getElementById('clearAll');
const searchbtn = document.getElementById('serachId');

function toggleSearch() {
    const searchInput = document.querySelector('.search-input');
    searchInput.classList.toggle('expand');
  }

mybutton.addEventListener('click', () => {
    const taskText = user.value.trim();
    if (!taskText) {
      alert('Please enter a task');
      return;
    }
    addTaskToDOM(taskText);
    savetasks();
    user.value = '';
  });
  

//Task Load
window.onload = () => {
   const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
   savedTasks.forEach((task) => {
    addTaskToDOM(task.text , task.checked);
   });
};

//Task Save
function savetasks(){
    const tasks = [];
    const taskdivs = document.querySelectorAll('.task');
    taskdivs.forEach((taskdiv) => {
        const text = taskdiv.querySelector('span').textContent;
        const completed = taskdiv.querySelector('input[type = "checkbox"]').checked;
        tasks.push({ text, checked: completed });

    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// createtaskelement(tasktext, false)
// savetask();
// user.value = '';

// createtaskelement(tasktext, completed);
// const taskelement = document.createElement('div')
// taskelement.classList = 'task1';


function addTaskToDOM(taskText, isCompleted = false) {
        const taskdiv = document.createElement('div')
        taskdiv.className = 'task'
        // taskdiv.innerHTML = '<ol><li></li></ol>';

        // const taskbox = document.createElement('div')
        // taskbox.className ='box'

    
        const taskspan = document.createElement('span')
        taskspan.textContent = taskText;

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.className = 'chkbox'
        checkbox.checked = isCompleted;
        // checkbox.innerHTML = '<i class="fas fa-trash"></i>';



        const deletebtn = document.createElement('div')
        deletebtn.innerHTML = '<i class="fas fa-trash"></i>';
        deletebtn.className = 'delete-btn'

        // const clearbtn = document.createElement('div')
        // clearbtn.innerHTML = '<i class=""fa-solid fa-plus></i>';
        // clearbtn.className = 'clear-btn'
    
        taskdiv.appendChild(checkbox);
        taskdiv.appendChild(taskspan);
        taskdiv.appendChild(deletebtn);
        tasklist.appendChild(taskdiv);
        // taskbox.appendChild(taskdiv)
        // user.value = '';


        checkbox.addEventListener('change' , function(){
            // checkbox.checked = isCompleted;
            if(checkbox.checked){
                taskspan.style.textDecoration = 'line-through';
                taskspan.style.color = 'grey';
            }else{
                taskspan.style.textDecoration = 'none';
                taskspan.style.color = 'white';
                

            }
            savetasks();

        })

        

        deletebtn.addEventListener('click' , function(){
            tasklist.removeChild(taskdiv)
            savetasks();

        });

        clearbtn.addEventListener('click' , function(){
            localStorage.removeItem('tasks');
            tasklist.innerHTML = ''; // Clear the task list in DOM

        });
        // document.getElementById('clearAll').addEventListener('click', () => {
        //     localStorage.removeItem('tasks');
        //     tasklist.innerHTML = ''; // Clear the task list in DOM
        //  });
         

        
    }