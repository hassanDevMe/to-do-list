// line to test git branch
let input = document.querySelector('input');
let button = document.querySelector('button');
let tasks = document.querySelector('.tasks');


let arrayOfTasks = [];

let addTaskToPage = (task) => {
    let div = document.createElement('div');
    div.className='task';
    div.innerHTML=task.name;
    div.setAttribute('id', task.id);
    task.isDone==true?div.classList.add('done'):false;

    let span = document.createElement('span');
    span.innerHTML='Delete';
    span.className='del';
    div.appendChild(span);

    tasks.appendChild(div);
};


 
////    PART1 : get data from local DB    ///

let getDataFromLocalStorage = (addTaskToPage) => {
    
    let data = window.localStorage.getItem("tasks");
    if (data) {
     let tasks = JSON.parse(data);
     arrayOfTasks = tasks;
     arrayOfTasks.forEach(task => {
        addTaskToPage(task)
     });
    }
 };


// get data from DB
getDataFromLocalStorage(addTaskToPage);



////    PART2 : adding tasks    ///



//the EVENT1 inviting
button.onclick = () => {

    if (input.value.trim()!==''){
        
        let task = {
            id : Date.now(),
            name : input.value,
            isDone : false
        };

        //push task to the current ARRAY
        arrayOfTasks.push(task);

        addTaskToPage(task);

        changeDB();
    }

    input.value ='';
}




//function of addING Task To db
let changeDB = () => window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));




////    PART3 : delete tasks    ///



// EVENT of removing tasks



////    PART4 : mark tasks    ///
tasks.addEventListener('click', (elem) => {
    if (elem.target.classList.contains('task')){

        elem.target.classList.toggle('done');

        arrayOfTasks.forEach((task,index) => {
            if (task.id== elem.target.getAttribute('id'))  
            task.isDone = !(task.isDone)
    })}

    else if (elem.target.classList.contains('del')) {
        arrayOfTasks.forEach((task,index) => {
            if (task.id== elem.target.parentElement.getAttribute('id'))  
               arrayOfTasks.splice(index, 1)
       })
    
        arrayOfTasks=arrayOfTasks.filter((task) => task.id != elem.target.parentElement.getAttribute('id'))
    
        elem.target.parentElement.remove();
    }

   changeDB();

});


