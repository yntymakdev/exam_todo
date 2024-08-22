"use client";
import {
	useDeleteAllTodoMutation,
	useDeleteTodoMutation,
	useEditTodoMutation,
	useGetTodosQuery,
} from "@/redux/api/todo";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const TodoList = () => {
	const { data, isLoading } = useGetTodosQuery();
	const [editTodoMutation] = useEditTodoMutation();
	const [deleteTodoMutation] = useDeleteTodoMutation();
	const [deleteAllTodo] = useDeleteAllTodoMutation();
	const [editId, setEditId] = useState<number | null>(null);
	const { register, handleSubmit, setValue } = useForm<ITodo>();

	const editTodo: SubmitHandler<ITodo> = async (data) => {
		await editTodoMutation({ _id: editId!, data });
		setEditId(null);
	};

	async function deleteAll() {
		return await deleteAllTodo();
	}

	return (
		<div>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					<button onClick={deleteAll}>delete all</button>
					<div>
						{data?.map((item) => (
							<div key={item._id}>
								{editId === item._id ? (
									<>
										<form onSubmit={handleSubmit(editTodo)}>
											<input
												placeholder="edit title"
												type="text"
												{...register("title", { required: true })}
											/>
											<input
												placeholder="edit description"
												type="text"
												{...register("description", { required: true })}
											/>
											<button type="submit">save</button>
										</form>
									</>
								) : (
									<>
										<h1>{item.title}</h1>
										<p>{item.description}</p>
										<img src={item.img} alt={item.title} />
										<button onClick={() => deleteTodoMutation(item._id!)}>
											remove
										</button>
										<button
											onClick={() => {
												setEditId(item._id!);
												setValue("title", item.title);
												setValue("description", item.description);
											}}>
											edit
										</button>
									</>
								)}
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default TodoList;
