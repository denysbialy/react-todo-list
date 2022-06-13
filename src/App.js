import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { getToDoList } from "./api";
import cx from "classnames";
import styles from "./style.module.sass";
import check from "./images/check.jpg";
import nocheck from "./images/nocheck.jpg";

function App() {
  const [notatesList, setNotatesList] = useState([]);

  const addNotes = (notesText) => {
    const newTodo = {
      notes: notesText,
      isDone: false,
      id: Date.now(),
    };
    setNotatesList([...notatesList, newTodo]);
  };
  const deleteNotes = (id) => {
    const newTodos = notatesList.filter((todo) => id !== todo.id);
    setNotatesList([...newTodos]);
  };

  const toggleTodo = (id) => {
    const newToggle = notatesList.map((elem) => {
      if (id === elem.id) {
        elem.isDone = !elem.isDone;
      }
      return elem;
    });
    setNotatesList([...newToggle]);
  };

  const onSubmit = (values, formikBag) => {
    addNotes(values.notate);
    formikBag.resetForm();
  };
  return (
    <>
      <Formik initialValues={{ notate: "" }} onSubmit={onSubmit}>
        <Form>
          <h1>ToDo List</h1>
          <Field type="text" name="notate" />
          <button type="submit">Add Notate</button>
          <ul>
            {notatesList.map((elem) => (
              <li key={elem.id}>
                <span onClick={() => toggleTodo(elem.id)}>
                  <img
                    src={elem.isDone ? check : nocheck}
                    alt="checked"
                    className={styles.img}
                  />
                </span>
                {elem.notes}
                <button onClick={() => deleteNotes(elem.id)}>X</button>
              </li>
            ))}
          </ul>
        </Form>
      </Formik>
    </>
  );
}

export default App;
