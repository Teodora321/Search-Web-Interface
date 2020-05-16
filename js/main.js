const getEmployees = async () => {
  try {
    return await (await fetch('./data/employees.json')).json()
  } catch (err) {
    console.error(err);
  }
};

const employee = ({ firstName, lastName, phoneNumber, department }) => (`
  <li class="employee">
    <h2><i class="fas fa-user"></i>${firstName} ${lastName}</h2>
    <h3>Phone: ${phoneNumber}</h3>
    <h3>Department: ${department}</h3>
  </li>
`);

const employeeList = (employees) => (`<ul id="matchList">${employees.map(employee).join('')}</ul>`);

const renderEmployees = (employees) => {
  document.getElementById('match-container').innerHTML = employeeList(employees)
}

const toLower = str => str.toLowerCase();
const match = arr => x => arr.some(startsWith(x))
const startsWith = x => y => x.length && y.length && x.startsWith(y)
const matchingEmployee = keywords => e => Object.values(e).map(toLower).some(match(keywords));

(async () => {
  const employees = await getEmployees();

  const onInput = ({ target: { value } }) => {
    const keywords = value.split(/\s+/).map(toLower)
    const matches = employees.filter(matchingEmployee(keywords))

    renderEmployees(matches)
  };

  document.getElementById('search').addEventListener('input', onInput);
})();