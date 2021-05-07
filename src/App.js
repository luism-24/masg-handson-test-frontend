import { useState } from 'react';
import * as ReactBootStrap from 'react-bootstrap'
import './App.css'

function App() {
  const [employeeId, setEmployeeId] = useState("");
  const [data, setData] = useState([]);
  const headers = [
    "id",
    "name",
    "contractTypeName",
    "roleId",
    "roleName",
    "roleDescription",
    "hourlySalary",
    "monthlySalary",
    "annualSalary"

  ]

  const onSearchAllEmployees = () => {
    fetch(`http://localhost:8080/api/employees`)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.log(err))
  }

  const onSearchById = () => {
    fetch(`http://localhost:8080/api/employees/${employeeId}`)
      .then(res => res.status !== 200 ? res.text() : res.json())
      .then(res => { typeof (res) === 'string' ? alert(JSON.parse(res).message) : setData([res]) })
      .catch(err => console.log(err))
  }

  const renderEmployee = (employee, index) => {
    return (
      <tr key={index}>
        <td>{employee.id}</td>
        <td>{employee.name}</td>
        <td>{employee.contractTypeName}</td>
        <td>{employee.roleId}</td>
        <td>{employee.roleName}</td>
        <td>{employee.roleDescription}</td>
        <td>${Intl.NumberFormat().format(employee.hourlySalary)}</td>
        <td>${Intl.NumberFormat().format(employee.monthlySalary)}</td>
        <td>${Intl.NumberFormat().format(employee.annualSalary)}</td>
      </tr>
    )
  }

  return (
    <div className="App">
      <input placeholder={"Enter the employee id"} onChange={(e) => setEmployeeId(e.target.value)} />
      <button onClick={employeeId ? onSearchById : onSearchAllEmployees}>Search</button>
      <ReactBootStrap.Table hidden={data.length === 0} striped bordered hover>
        <thead>
          <tr>
            {headers.map(header => <th>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map(renderEmployee)}
        </tbody>

      </ReactBootStrap.Table>
    </div>
  );
}

export default App;
