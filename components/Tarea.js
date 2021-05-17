class Tarea{

    constructor(task){
        this.task = task;
        const database = firebase.database();

    }

    render = () => {
        let component = document.createElement('div');
        component.className = 'columnaTareas';

        let taskContainer = document.createElement('div');
        taskContainer.className = 'textoTarea';
        taskContainer.innerHTML = (
            this.task.text
        
        );

        let dateContainer = document.createElement('div');
        dateContainer.className = 'fecha';
        dateContainer.innerHTML = this.task.date;

        let deleteButton = document.createElement('button');
        deleteButton.className = 'botonBorrar';
        deleteButton.innerHTML = 'x';

        let prevButton = document.createElement('button');
        prevButton.className = 'botonPrev';
        prevButton.innerHTML = '<';

        let nextButton = document.createElement('button');
        nextButton.className = 'botonSig';
        nextButton.innerHTML = '>';


        component. appendChild (taskContainer);
        component. appendChild (dateContainer);
        component. appendChild (deleteButton);
        component. appendChild (prevButton);
        component. appendChild (nextButton);


        //BORRAR
        deleteButton.addEventListener('click', ()=>{

            if (this.task.type == 'toDo'){
                database.ref('tasks/toDo/'+this.task.id).set(null)
            }

            if (this.task.type == 'doing'){
                database.ref('tasks/doing/'+this.task.id).set(null)
            }

            if (this.task.type == 'done'){
                database.ref('tasks/done/'+this.task.id).set(null)
            }

        });

        //SIGUIENTE

        nextButton.addEventListener('click', ()=>{

            if (this.task.type == 'toDo'){
                
        let reference = database.ref('tasks/doing').push();

        let task = {
            id: reference.key,
            type: 'doing',
            text: this.task.text,
            date: this.task.date

        };

        reference.set(task);
                database.ref('tasks/toDo/'+this.task.id).set(null)
            }



            if (this.task.type == 'doing'){

                let reference = database.ref('tasks/done').push();

        let task = {
            id: reference.key,
            type: 'done',
            text: this.task.text,
            date: this.task.date

        };

        reference.set(task);
                database.ref('tasks/doing/'+this.task.id).set(null);

            }    

        });


        //ANTERIOR

        prevButton.addEventListener('click', ()=>{

            if (this.task.type == 'doing'){
                   
        let reference = database.ref('tasks/toDo').push();

        let task = {
            id: reference.key,
            type: 'toDo',
            text: this.task.text,
            date: this.task.date

        };

        reference.set(task);
                database.ref('tasks/doing/'+this.task.id).set(null);
            }

            

            if (this.task.type == 'done'){
                       
        let reference = database.ref('tasks/doing').push();

        let task = {
            id: reference.key,
            type: 'doing',
            text: this.task.text,
            date: this.task.date

        };

        reference.set(task);
                database.ref('tasks/done/'+this.task.id).set(null);
            }

            
            

        });



        return component;
    }
}