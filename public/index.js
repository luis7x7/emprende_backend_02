//obtener elemento

//const button = document.querySelector("button")
const creatbtn = document.querySelector("#create-task");
const getbtn = document.querySelector("#get-tasks");
const input = document.querySelector("#task-name");
const table_task_div = document.querySelector("#table_task");
//nutrir de funciones una accion
// getbtn.addEventListener("click", function () {
//      console.log('get tareas click');
//      //logica en api
//      fetch("http://localhost:4000/api/tasks")

// })
const baseurlback = `${window.origin}/api`;
console.log({window,baseurlback});

let task_edit = null

creatbtn.addEventListener("click", function () {
  const creating = !task_edit
  
  
  //objeto de configuracion
  const ruta = creating ? "tasks" : `tasks/${task_edit._id}`
  const method2=creating ? "POST" : "PUT"
  fetch(`${baseurlback}/${ruta}`, {
    method:method2,
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ text: input.value }),
  })
    .then((res) => {
      getTask();
      creatbtn.innerText="crear tarea"
      input.value=""
      return res.json();

      
    })
    .then((resJSON) => {
      console.log({ resJSON });
    });
});

function getTask() {
  table_task_div.innerHTML=null;
  fetch(`${baseurlback}/tasks`)
    .then((res) => {
      
      return res.json();
    })
    .then((resJSON) => {
      const tasks = resJSON.data;
      for (const task of tasks) {
        const delete_task = document.createElement("button");
        const container_table = document.createElement("div");
        const paragram_task = document.createElement("p");

        delete_task.innerText = "borrar";
        paragram_task.innerText = task.name;
        delete_task.setAttribute("id", task._id);
        delete_task.addEventListener("click", (e) => {
          const taskid = e.target.id;
          delete_task.innerText = "..."
          
          fetch(`${baseurlback}/tasks/${taskid}`, {
            method: "DELETE",
            
          }).then(() => {
            const taskdiv = delete_task.parentElement;
            taskdiv.remove();
          });
        });

        paragram_task.addEventListener("click", (e) => {
          input.value = paragram_task.innerText;
          creatbtn.innerText = "editar tarea"
          task_edit = task
          console.log({ task_edit });
          
        });
        container_table.appendChild(paragram_task);
        container_table.appendChild(delete_task);
        table_task_div.appendChild(container_table);
      }
    });
}

getTask();

// button.addEventListener('click', function () {
//      console.log("click")
//      fetch("http://localhost:4000/users")
// })

// //funciones en jav
// const suma = (num1, num2 = 110) =>

//      {
//      console.log('names', this);
//       num1 + num2
//      }

// const persona1 ={age:22}
// const persona2 ={age:33}

// console.table({
//      constantes: suma(persona1.age, persona2.age),
//      values: suma(22, 22),
//      expreciones: suma(2 + 2, 3 * 3),
//      error1: suma(1),
//      error2: suma(2, '2'),
//      error3:suma('ss','ss')

// })

// //arrow funcion

// const exponencia = (base, exp = 2) =>
// {
//      console.log('arrow',this);

//      return base ** exp
// }

// //this
// const canculator = {
//      suma,
//      exponencia
// }
// canculator.suma(2, 2)
// canculator.exponencia(2)
