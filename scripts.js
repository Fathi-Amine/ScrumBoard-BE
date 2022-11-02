const taskId = document.querySelector('#task-id');
const taskTitle = document.querySelector('#task-title');
const taskTypeFeature = document.querySelector('#task-type-Feature');
const taskTypeBug = document.querySelector('#task-type-Bug');
const taskPriority = document.querySelector('#task-priority');
const taskStatus = document.querySelector('#task-status');
const taskDescription = document.querySelector('#task-description');
const taskDate = document.querySelector('#task-date');
const form = document.querySelector("#form-task");
const updateBtn = document.getElementById("task-update-btn");
const saveBtn = document.getElementById("task-save-btn");
const deleteBTn = document.getElementById("task-delete-btn");
const errorSpan = document.querySelector("#msg");
const addBtn = document.getElementById('add-task')

addBtn.addEventListener('click', ()=>{
	form.reset();
	

	saveBtn.style.display = "Block"
	updateBtn.style.display = "none";
	deleteBTn.style.display = "none";
	// Removing the priority Error from modal
	document.getElementById('error-span').classList.remove('d-block');
	document.getElementById('error-span').classList.add('d-none');
	// Removing the status Error from modal
	document.getElementById('status-span').classList.remove('d-block');
	document.getElementById('status-span').classList.add('d-none');

	taskDescription.classList.remove('border-success');
	taskDescription.classList.remove('border-danger');
	// Removing title and Description Error form modal
	taskDescription.classList.remove('border-danger');
	document.getElementById("titleError").classList.add('d-none');
	document.getElementById("titleError").classList.remove('d-block');
	document.getElementById("error-Des").classList.add('d-none');
	document.getElementById("error-Des").classList.remove('d-block');
	taskTitle.classList.remove('border-danger');
	//setting a default check value

	taskTypeFeature.checked = true;
	


	
	taskDescription.classList.remove('border-danger');
})
function update(id){
	taskDescription.classList.remove('border-success');
	taskDescription.classList.remove('border-danger');
	document.getElementById('error-span').classList.remove('d-block');
	document.getElementById('error-span').classList.add('d-none');
	// Removing the status Error from modal
	document.getElementById('status-span').classList.remove('d-block');
	document.getElementById('status-span').classList.add('d-none');
	// Removing title Error form modal
	taskTitle.classList.remove('border-danger');
	document.getElementById("titleError").classList.add('d-none');
	document.getElementById("titleError").classList.remove('d-block');

	
	//Removing Description Error from modal
	document.getElementById("error-Des").classList.add('d-none');
	document.getElementById("error-Des").classList.remove('d-block');
	// Remove Error borders
	taskTitle.classList.remove('border-danger');
	taskDescription.classList.remove('border-danger');
	
	saveBtn.style.display = "none"
	updateBtn.style.display = "block";
	deleteBTn.style.display = "block";
	// getting info from buttom elements

	const btnId = document.getElementById(`${id}`);
	const title = btnId.querySelector('#title');
	const dateTime = btnId.querySelector('#datetime');
	const description = btnId.querySelector('#description');
	const priority = btnId.querySelector('#priority');
	const type= btnId.querySelector('#type');

	// Fill form inputs
	taskId.value = btnId.getAttribute("id");
	taskTitle.value = title.getAttribute("data-title");
	type.getAttribute("data-type") == "1" ? taskTypeFeature.checked = true : taskTypeBug.checked = true;
	taskPriority.value = priority.getAttribute("data-prio");
	taskStatus.value = btnId.getAttribute("data-status");
	taskDescription.value = description.getAttribute("title");
	taskDate.value = dateTime.getAttribute("data-datetime");


	console.log(btnId.getAttribute("id"))
	console.log(title)
	console.log(dateTime)
	console.log(description)
	console.log(priority)
	console.log(type)
	console.log(taskId)
	console.log(taskDate)
}
console.log(taskId);
console.log(taskTitle);
console.log(taskTypeFeature);
console.log(taskTypeBug);
console.log(taskPriority);
console.log(taskStatus);
console.log(taskDescription);

form.addEventListener('submit', function validateForm(e){
	if(taskTitle.value == ""){
		document.getElementById("titleError").classList.remove('d-none');
		document.getElementById("titleError").classList.add('d-block');
	}

	if(taskTitle.value == ""){
		document.getElementById("error-Des").classList.remove('d-none');
		document.getElementById("error-Des").classList.add('d-block');
	}



	if(taskPriority.value == 'Please select'){
		document.getElementById('error-span').classList.add('d-block');
		document.getElementById('error-span').classList.remove('d-none');
		e.preventDefault()
	}else{
		document.getElementById('error-span').classList.remove('d-block');
		document.getElementById('error-span').classList.add('d-none');
		// document.getElementById('status-span').classList.remove('d-block');
		// document.getElementById('status-span').classList.add('d-none');
	}

	if(taskStatus.value == 'Please select'){
		e.preventDefault();
		// document.getElementById('status-span').classList.add('d-block');
		// document.getElementById('status-span').classList.remove('d-none');
			document.getElementById('status-span').classList.add('d-block');
			document.getElementById('status-span').classList.remove('d-none');
	}
	else{
		// document.getElementById('error-span').classList.remove('d-block');
		// document.getElementById('error-span').classList.add('d-none');
		document.getElementById('status-span').classList.remove('d-block');
		document.getElementById('status-span').classList.add('d-none');
		console.log(document.getElementById('status-span'))

	}
})

taskTitle.addEventListener('keyup',function validateTitle(){
	var regex = /^[A-Za-z\s]+$/g;
	if(regex.test(taskTitle.value)){
		taskTitle.classList.add('border', 'border-success')
		taskTitle.classList.remove('border-danger');
		document.getElementById("titleError").classList.add('d-none');
		document.getElementById("titleError").classList.remove('d-block');
		updateBtn.type = 'submit';
		console.log(taskTitle);
		console.log("valid")
	}else{
		document.getElementById("titleError").classList.remove('d-none');
		document.getElementById("titleError").classList.add('d-block');
		taskTitle.classList.remove('border-success');
		taskTitle.classList.add('border', 'border-danger');
		updateBtn.type = 'button';
		console.log("Not valid")
        console.log('not valid')
	}
})

taskDescription.addEventListener('keyup',function validateDescription(){
	var regex = /^\S.*(?:\r?\n\S.*)*$/u;
	if(regex.test(taskDescription.value)){
		taskDescription.classList.add('border', 'border-success')
		taskDescription.classList.remove('border-danger');
		document.getElementById("error-Des").classList.add('d-none');
		document.getElementById("error-Des").classList.remove('d-block');
		updateBtn.type = 'submit';
		console.log(taskTitle);
		console.log("valid")
	}else{
		taskDescription.classList.remove('border-success')
		taskDescription.classList.add('border', 'border-danger');
		document.getElementById("error-Des").classList.remove('d-none');
		document.getElementById("error-Des").classList.add('d-block');
		updateBtn.type = 'button';
		console.log("Not valid")
        console.log('not valid')
	}
})

