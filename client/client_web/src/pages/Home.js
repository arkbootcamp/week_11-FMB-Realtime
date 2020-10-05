import React, { useState, useRef, useEffect } from "react";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSocket } from "../contexts/SocketProvider";

export default function Home({ id }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [todos, setTodos] = useLocalStorage("todo", []);
  const titleRef = useRef();
  const descRef = useRef();
  const socket = useSocket();
  //   console.log(socket);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();

    const newTodo = {
      title: titleRef.current.value,
      description: descRef.current.value,
      owner: id,
    };

    socket.emit("new-todo", { todo: newTodo });
    setTodos((prevTodo) => {
      return [...prevTodo, newTodo];
    });
    closeModal();
  };

  useEffect(() => {
    if (socket == null) return;

    socket.on("refreshing-todo", ({ todo }) => {
      //   console.log("refreshing todo", todo);
      const checkSameContent = todos.filter((todoClient) => {
        //fungsi untuk mengecek apakah ada content yang sama
        //jika ada konten yang sama, maka todo sudah ada => length > 0
        //jika tidak ada, maka todo belum ada => length == 0
        const title = todoClient.title === todo.title;
        const desc = todoClient.description === todo.description;
        return title && desc;
      });
      //   console.log(newTodo);
      if (checkSameContent.length === 0) {
        // console.log("added", newTodo);
        setTodos((prevTodo) => [...prevTodo, todo]);
      }
    });

    return () => socket.off("refreshing-todo");
  }, [socket, todos, setTodos]);

  return (
    <Container
      className="d-flex align-items-center flex-column"
      style={{ height: "100vh" }}
    >
      <h1>{id}</h1>
      <Button onClick={() => setModalOpen(true)}>Add</Button>
      <div className="flex-row d-flex flex-wrap">
        {todos &&
          todos
            .filter((todo) => todo.owner === id)
            .map((todo, index) => {
              return (
                <Card className="m-2" key={index}>
                  <Card.Body>
                    <Card.Title>{todo.title}</Card.Title>
                    <Card.Text>{todo.description}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
      </div>

      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header closeButton>Add Todo List</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitModal}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" required ref={titleRef} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" required ref={descRef} />
            </Form.Group>
            <Button type="submit">Add</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
