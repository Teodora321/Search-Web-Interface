const getEmployees = async () => {
  try {
    return await (await fetch('./data/employees.json')).json()
  } catch (err) {
    console.log(err);
  }
};



