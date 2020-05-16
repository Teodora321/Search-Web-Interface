const search = document.getElementById('search');
const matchList = document.getElementById('matchList');
let employees;

const getEmployees = async () => {
  try {
    const res = await fetch('./data/employees.json');
    employees = await res.json();
  } catch (err) {
    console.error(err);
  }
};

const searchEmployees = searchText => {
  let matches = employees.filter(employee => {
    return (
      employee.firstName.toLowerCase().includes(searchText) ||
      employee.lastName.toLowerCase().includes(searchText) ||
      employee.phoneNumber.includes(searchText) ||
      employee.department.toLowerCase().includes(searchText)
    )
  });

  outputHtml(matches);
};

const outputHtml = matches => {
    const html = matches
      .map(
        match => ` <li class="employee">
        <h2>Name: ${match.firstName} ${match.lastName}</h2>
        <h3>Phone: ${match.phoneNumber}</h3>
        <h3>Department: ${match.department} </h3>
        </li>`
      )
      .join('');
  matchList.innerHTML = html;
  if (matches.length === 0) {
    matchList.innerHTML = `
    <h2> Sorry but this employee does not work here </h2>
    `
  }
  
};

window.addEventListener('DOMContentLoaded', getEmployees);
search.addEventListener('input', () => searchEmployees(search.value));



