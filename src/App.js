import { useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import cx from "classnames";
import styles from "./style.module.sass";
import check from "./images/check.jpg";
import nocheck from "./images/nocheck.jpg";
import { notEmpty } from "./utils/validations";

function App() {
  const [notatesList, setNotatesList] = useState([]);
  
  // const styless = cx({inputErrorToDo: isValid})
  const addNotes = (notesText) => {
    const newTodo = {
      notes: notesText,
      isDone: false,
      id: Date.now(),
    };
    setNotatesList([ newTodo, ...notatesList]);
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
    const notateText = notEmpty.cast(values)
    addNotes(notateText.notate);
    formikBag.resetForm();
  };
  return (
    <>
      <Formik
        initialValues={{ notate: "" }}
        onSubmit={onSubmit}
        validationSchema={notEmpty}
      >
        {(props) => {
          console.log(props);
          return (
            <Form className={styles.container}>
              <h1>ToDo List</h1>
              <div className={styles.headerToDo}>
                <Field
                  type="text"
                  name="notate"
                  className={!props.isValid&& styles.inputErrorToDo}
                />
                <button type="submit">Add Notate</button>
              </div>
                <ErrorMessage name='notate' className={styles.errorMessage} component="div"/>
              <ul className={styles.toDoList}>
                {notatesList.map((elem) => (
                  <li key={elem.id}>
                    <div
                      onClick={() => toggleTodo(elem.id)}
                      className={styles.textLine}
                    >
                      <img
                        src={elem.isDone ? check : nocheck}
                        alt="checked"
                        className={styles.img}
                      />
                    </div>
                    <div className={styles.notates}>{elem.notes}</div>
                    <button onClick={() => deleteNotes(elem.id)}>X</button>
                  </li>
                ))}
              </ul>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default App;
