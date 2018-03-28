// Your starting point. Enjoy the ride!

var STORAGE_KEY = 'todos-vuejs-2.0';
var todoStorage = {
	fetch: function() {
		var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		todos.forEach(function(todo, index) {
			todo.id = index;
		});
		todoStorage.uid = todos.length;
		return todos;
	},
	save: function(todos) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}
};

var filters = {
	all: function(todos) {
		return todos;
	}
};

var app = new Vue({
	data: {
		todos: todoStorage.fetch(),
		newTodo: ' ',
		visibility: 'all'
	},
	watch: {
		todos: {
			handler: function(todos) {
				// console.log('save');
				todoStorage.save(todos);
			},
			deep: true
		}
	},
	computed: {
		filteredTodos: function() {
			return filters[this.visibility](this.todos);
		}
	},
	methods: {
		addTodo: function() {
			var value = this.newTodo && this.newTodo.trim();
			if (!value) {
				return;
			}
			this.todos.push({
				id: todoStorage.uid++,
				title: value,
				completed: false
			});
			// todoStorage.save(this.todos);
			this.newTodo = '';
		},
		removeTodo: function(todo) {
			this.todos.splice(this.todos.indexOf(todo), 1);
		}
	}
});

app.$mount('#app');
