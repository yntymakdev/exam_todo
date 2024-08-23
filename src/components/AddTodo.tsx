"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const UPLOAD_URL = "https://api.elchocrud.pro/api/v1/";
const BACKEND_URL =
  "https://api.elchocrud.pro/api/v1/b4b25d34022ce0be95ec8d04e11648dd/examq";

interface Todo {
  _id?: number;
  title: string;
  img?: FileList;
}

const AddTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditId, setIsEditId] = useState<null | number>(null);
  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    reset: resetAdd,
  } = useForm<Todo>();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    setValue,
    reset: resetEdit,
  } = useForm<Todo>();

  const onSubmitAdd: SubmitHandler<Todo> = async (data) => {
    if (data.img && data.img.length > 0) {
      const file = data.img[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const { data: responseImage } = await axios.post(
          `${UPLOAD_URL}/upload/file`,
          formData
        );

        const newData = {
          title: data.title,
          isCompleted: false,
          img: responseImage.url,
        };

        const { data: responseTodos } = await axios.post(BACKEND_URL, newData);
        setTodos(responseTodos);
        resetAdd();
      } catch (error) {
        console.error("Ошибка :", error);
      }
    }
  };

  const handleComplete = async (_id: number, isCompleted: boolean) => {
    const updateData = { isCompleted: !isCompleted };

    try {
      const { data } = await axios.patch(`${BACKEND_URL}/${_id}`, updateData);
      setTodos(data);
    } catch (error) {
      console.error("Ошибка", error);
    }
  };

  const handleDelete = async (_id: number) => {
    try {
      await axios.delete(`${BACKEND_URL}/${_id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
    } catch (error) {
      console.error("Ошибка", error);
    }
  };

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(BACKEND_URL);
      setTodos(data);
    } catch (error) {
      console.error("ОШибка:", error);
    }
  };

  const onSubmitEdit: SubmitHandler<Todo> = async (data) => {
    if (data.img && data.img.length > 0) {
      const file = data.img[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const { data: responseImage } = await axios.post(
          `${UPLOAD_URL}/upload/file`,
          formData
        );

        const editData = {
          title: data.title,
          img: responseImage.url,
        };

        const { data: responseTodos } = await axios.patch(
          `${BACKEND_URL}/${isEditId}`,
          editData
        );
        setTodos(responseTodos);
        setIsEditId(null);
        resetEdit();
      } catch (error) {
        console.error("Ошибка :", error);
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todolist">
      <h1>CRUD</h1>
      <form onSubmit={handleSubmitAdd(onSubmitAdd)}>
        <input type="text" {...registerAdd("title", { required: true })} />
        <input type="file" {...registerAdd("img")} />
        <button type="submit">Add</button>
      </form>
      <div className="content">
        {todos.map((item) => (
          <div key={item._id!} className={`todo-item`}>
            {item._id === isEditId ? (
              <form onSubmit={handleSubmitEdit(onSubmitEdit)}>
                <input
                  placeholder="Edit title"
                  {...registerEdit("title", { required: true })}
                  type="text"
                />
                <input
                  placeholder="Edit image"
                  {...registerEdit("img")}
                  type="file"
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsEditId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h1>{item.title}</h1>
                <img
                  style={{
                    width: "300px",
                  }}
                  src={item.img}
                  alt={item.title}
                />
                <button onClick={() => setIsEditId(item._id!)}>Edit</button>
                <button onClick={() => handleDelete(item._id!)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddTodo;
