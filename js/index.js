//DECLARACIONES
const newTaskInput = document.getElementById('newTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const toDoColumn = document.getElementById('toDoColumn');
const doingColumn = document.getElementById('doingColumn');
const doneColumn = document.getElementById('doneColumn');

const database = firebase.database();

//FUNCIONES

addTask = () =>{
    let text = newTaskInput.value;
    let type = "toDo";
    let currectDate = new Date();
    let day = currectDate.getDate();
    let month = (currectDate.getMonth())+1;
    let year = currectDate.getFullYear();

    let date = day + "/" + month + "/" + year;


    if(text==''){
        return;
    }

    let reference = database.ref('tasks/toDo').push();

    let task = {
        id: reference.key,
        type: type,
        text: text,
        date: date

    };

    console.log('click'+ " " + text + " " + date + " " + type);

    reference.set(task);

    newTaskInput.value='';

}

addTaskButton.addEventListener('click', addTask);

database.ref('tasks/toDo').on('value', function(data){
    toDoColumn.innerHTML='';
    data.forEach(
        task => {
            let value = task.val();
            let tarea = new Tarea(value);
            toDoColumn.appendChild(tarea.render());
        }
    );
});

database.ref('tasks/doing').on('value', function(data){
    doingColumn.innerHTML='';
    data.forEach(
        task => {
            let value = task.val();
            let tarea = new Tarea(value);
            doingColumn.appendChild(tarea.render());
        }
    );
});

database.ref('tasks/done').on('value', function(data){
    doneColumn.innerHTML='';
    data.forEach(
        task => {
            let value = task.val();
            let tarea = new Tarea(value);
            doneColumn.appendChild(tarea.render());
        }
    );
});