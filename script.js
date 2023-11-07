var addtask = document.querySelector(".add");
var user = document.querySelector("h4");
var taskinput = document.querySelector('#taskinput');
var tasklistcontainer = document.querySelector(".tasklist");
const deleteplay = new Audio ("delete.mp3")
const addplay = new Audio ("add.mp3")
deleteplay.volume = 0.4
addplay.volume = 1

var nameform = document.querySelector('.nameform');
var nameinput = document.querySelector('#nameinput');
var namebtn = document.querySelector('.namebtn')
var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
var name =  fetchname()|| username() ;
// (taskinput);
function fetchname() {
   var name =  localStorage.getItem('name')
    if (name){
user.innerText = ` Hello ${name}!`

    }
   return name

    
}
function username() {
    taskinput.setAttribute("readonly", "true");
    // taskinput.style.display = "none"
    nameform.style.display = "flex"
    // nameform.style.display = "flex"
    namebtn.addEventListener('click', function () {
        const namevalue = nameinput.value.trim();
        (namevalue);
        if (namevalue != "") {
            localStorage.setItem('name' , namevalue)            
            user.innerText = ` Hello ${namevalue}!`
            nameinput.value = "";
            taskinput.removeAttribute("readonly");

            
    nameform.style.opacity = 0
    setTimeout(() => {
        
    taskinput.style.display = "block"
        nameform.style.display = "none"

    }, 500);
    
        }
    })

}

// localStorage.removeItem('name')

tasks.forEach(task => {
    createtask(task)
});



function DeleteTaskFunction(element,index) {
    deleteplay.load()
    element.style.transform = 'translateX(60px)'
    element.style.opacity = 0
    element.style.marginBottom = "-50px"
    deleteplay.play();
    setTimeout(() => {
        // audio.pause()
        tasklistcontainer.removeChild(element)
        tasks.splice(index,1)
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // ((localStorage.getItem('tasks')));

    }, 410);
}
function createtask(tasktext) {
    var taskitem = document.createElement('li');
    taskitem.innerHTML = `<span class = "tasktext">${tasktext}</span> <span> <i class="ri-edit-line edit"></i><i class="ri-delete-bin-line delete"></i></span>`
    tasklistcontainer.appendChild(taskitem)
    var taskTextSpan = taskitem.querySelector(".tasktext")
    var deletetask = taskitem.querySelector('.delete');
    var edit = taskitem.querySelector('.edit');
    // (element);
    deletetask.addEventListener('click', function (e) {
        const index= tasks.indexOf(tasktext)
        DeleteTaskFunction(taskitem,index)
    })
    edit.addEventListener('click', function(e){
        editpopup(taskTextSpan)
        
    })



}

function editpopup(element) {
    var index = tasks.indexOf(element.innerText)
  var edittext =  prompt("Edit Your Text",element.innerText)
  if(edittext.trim()!=""){
    edittext.trim()
    element.innerText = edittext
  tasks[index] = `${edittext}`;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
}

function AddTaskFunction(tasktext) {
    addplay.load()
    addplay.play()
    createtask(tasktext);
    tasks.push(tasktext);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskinput.value = '';
    taskinput.focus()




}

taskinput.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      
      event.preventDefault();
      addtask.click();
    // ("click");
    }
  });

addtask.addEventListener('click', function () {
    const tasktext = taskinput.value.trim();
    if (tasktext != "") {
        AddTaskFunction(tasktext)

    }


})

