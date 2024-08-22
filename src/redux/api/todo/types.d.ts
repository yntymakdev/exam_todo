namespace TODO {
	type GetTodosResponse = ITodo[];
	type GetTodosRequest = void;

	type PostTodoResponse = ITodo[];
	type PostTodoRequest = ITodo;

	type EditTodoResponse = ITodo[];
	type EditTodoRequest = {
		_id: number;
		data: ITodo;
	};

	type DeleteTodoResponse = ITodo[];
	type DeleteTodoRequest = number;

	type DeleteAllTodoResponse = ITodo[];
	type DeleteAllTodoRequest = void;
}
