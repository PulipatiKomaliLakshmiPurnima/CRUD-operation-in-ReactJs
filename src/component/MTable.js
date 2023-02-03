import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
function CrudTable() {
  const [state, setState] = useState(
    //initialSate
    {
      students: [],
      newStudent: {
        student: "",
        marks: "",
        grade: "",
        isPassed: false,
      },
      disableSubmit: false,
    }
  );
  const { students, newStudent, disableSubmit } = state;
  const { student, marks, grade, isPassed } = newStudent;

  const [render, setRender] = useState(false);
  useEffect(() => {
    !render &&
      axios
        .get("https://run.mocky.io/v3/a7e0bb5b-a558-4f84-990e-21b4bdc43c07")
        .then(({ data }) => {
          setState({
            ...state,
            students: [...state.students, ...data],
          });
        });
    setRender(true);
  }, [render, state]);

  const DeleteItem = (e, index) => {
    setState({
      ...state,
      students: [
        ...students.filter(function (item, i) {
          return i !== index;
        }),
      ],
    });
  };
  const ValueChange = (e, isPassed) => {
    const { name, value } = e.target;
    setState({
      ...state,
      newStudent: {
        ...newStudent,
        [name]: typeof isPassed != "undefined" ? isPassed : value,
      },
    });
  };
  const AddItem = () => {
    setState({
      ...state,
      students: [...students, newStudent],
      newStudent: {
        student: "",
        marks: "",
        grade: "",
        isPassed: false,
      },
    });
  };
  const EditItem = (e, item) => {
    setState({
      ...state,
      newStudent: {
        ...newStudent,
        ...item,
      },
      disableSubmit: true,
    });
  };
  const SaveForm = (element) => {
    setState({
      ...state,
      students: [
        ...students.map((item, index) =>
          index === element ? (item = newStudent) : item
        ),
      ],
      newStudent: {
        student: "",
        marks: "",
        grade: "",
        isPassed: false,
      },
      disableSubmit: false,
    });
  };

  return (
    <div className="container">
      {/* {JSON.stringify(state, null, 4)} */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th scope="col">Students</th>
            <th scope="col">Marks</th>
            <th scope="col">Grade</th>
            <th scope="col">Pass/Fail</th>
          </tr>
        </thead>
        <tbody>
          {students.map((item, index) => {
            return (
              <tr>
                {/* <td>{JSON.stringify(item, null, 4)}</td> */}
                <td>{item.student}</td>
                <td>{item.marks}</td>
                <td>{item.grade}</td>
                <td>
                  <input type="checkbox" defaultChecked={item.isPassed} />
                </td>
                <td>
                  <input
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => EditItem(e, item)}
                    value="Edit"
                  />{" "}
                  <input
                    type="button"
                    className="btn btn-primary"
                    value="Save"
                    onClick={() => SaveForm(index)}
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="Delete"
                    onClick={(e) => {
                      DeleteItem(e, index);
                    }}
                    className="btn btn-primary"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <form>
        {/* {JSON.stringify(state.newStudent, null, 4)} */}
        <div className="form-group row mt-5">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              name="student"
              value={student}
              onChange={(e) => ValueChange(e)}
              placeholder="Name"
              data-cke-saved-name="student"
            />
          </div>
        </div>
        <div className="form-group row mt-5">
          <label htmlFor="marks" className="col-sm-2 col-form-label">
            Marks
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              name="marks"
              value={marks}
              onChange={(e) => ValueChange(e)}
              placeholder="Marks"
              data-cke-saved-name="marks"
            />
          </div>
        </div>
        <div className="form-group row mt-5">
          <label htmlFor="grade" className="col-sm-2 col-form-label">
            Grade
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              name="grade"
              data-cke-saved-name="grade"
              value={grade}
              onChange={(e) => ValueChange(e)}
              placeholder="Grade"
            />
          </div>
        </div>
        <div className="form-group row mt-5">
          <div className="col-sm-2">Checkbox</div>
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label" htmlFor="passcheck">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="isPassed"
                  data-cke-saved-name="isPassed"
                  value={isPassed}
                  onChange={(e) => ValueChange(e, !isPassed)}
                />
                Pass/fail
              </label>
            </div>
          </div>
        </div>
        <div className="form-group row mt-5">
          <div className="col-sm-10">
            <button
              type="button"
              className="btn btn-primary"
              onClick={AddItem}
              disabled={disableSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default CrudTable;
