let projects = []
let taskslists = []
let tasks = []

const headers = {
	headers: {
		"X-Session": "5059fe5ba060edfd2e29cf241a40d1fd"
	},
};

async function main() {
	// Get all Projects
	await getAllProjects();

	// Get all TaskLists
	await getAllTaskLists();

	// Get all Tasks
	await getAllTasks();

	outputData();
}

function getAllProjects() {
	return fetch("https://app.paymoapp.com/api/projects/", headers)
		.then(res => res.json())
		.then(data => console.log(data, 'projects'))
		.then(data => {
			projects.push(Object.values(data["projects"]))
		});
}

function getAllTaskLists() {
	return fetch("https://app.paymoapp.com/api/tasklists/", headers)
		.then(res => res.json())
		.then(data => console.log(data, 'tasklists'))
		.then(data => {
			taskslists.push(Object.values(data["tasklists"]))
		});
}

function getAllTasks() {
	return fetch("https://app.paymoapp.com/api/tasks/", headers)
		.then(res => res.json())
		.then(data => console.log(data, 'tasks'))
		.then(data => {
			tasks.push(Object.values(data["tasks"]))
		});
}

function outputData() {
	projects.forEach(project => {
		project.forEach(projectElement => {
			console.log(projectElement.name)
			taskslists.forEach(tasklist => {
				tasklist.forEach(listElement => {
					if (listElement['project_id'] === projectElement.id) {
						console.log("---" + listElement.name)
						tasks.forEach(task => {
							task.forEach(taskElement => {
								if (taskElement['tasklist_id'] === listElement.id) {
									console.log("------" + taskElement.name)
								}
							});
						});
					}
				});
			});
		});
	});
}

main().then();
