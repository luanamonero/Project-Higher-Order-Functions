const { hours, employees, species, prices } = require('./data');
const data = require('./data');

function getSpeciesByIds(...ids) {
  const result = [];
  species.forEach((animal) => {
    ids.forEach((element) => {
      if (element === animal.id) result.push(animal);
    });
  });
  return result;
}

function getAnimalsOlderThan(animal, age) {
  const speciesByName = species.find((name) => name.name === animal).residents;
  return speciesByName.every((ages) => (ages.age >= age));
}

function getEmployeeByName(employeeName) {
  const employeeByName = employees.find((name) => (name.lastName === employeeName
  || name.firstName === employeeName));
  return (employeeByName !== undefined ? employeeByName : {});
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const manager = employees.some((idManager) => idManager.managers.includes(id));
  return manager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function countAnimals(speciesAnimals) {
  const result = {};
  if (speciesAnimals === undefined) {
    species.forEach((element) => {
      result[element.name] = element.residents.length;
    });
    return result;
  }
  const object = species.find((element) => element.name === speciesAnimals).residents;
  return object.length;
}

function calculateEntry(entrants = 0) {
  const Adults = entrants.Adult === undefined ? 0 : entrants.Adult;
  const Childs = entrants.Child === undefined ? 0 : entrants.Child;
  const Seniors = entrants.Senior === undefined ? 0 : entrants.Senior;
  return (Adults * 49.99) + (Childs * 20.99) + (Seniors * 24.99);
}

const mapUndefined = () => {
  const speciesLocation = species.reduce((acc, curr) => {
    const { location, name } = curr;
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(name);
    return acc;
  }, {});
  return speciesLocation;
};

const mapTrue = () => {
  const speciesLocation = species.reduce((acc, curr) => {
    const { location, name, residents } = curr;
    const nameResidents = residents.map((element) => element.name);
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push({
      [name]: nameResidents,
    });
    return acc;
  }, {});
  return speciesLocation;
};

const mapTrueSort = () => {
  const speciesLocation = species.reduce((acc, curr) => {
    const { location, name, residents } = curr;
    const nameResidents = residents.map((element) => element.name).sort();
    console.log(nameResidents);
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push({
      [name]: nameResidents,
    });
    return acc;
  }, {});
  return speciesLocation;
};

function getAnimalMap(option) {
  if (option === undefined) {
}

function getSchedule(dayName) {
  const result = {};
  if (dayName === undefined) {
    const days = Object.keys(hours);
    days.forEach((element) => {
      const close = (hours[element].close - 12);
      result[element] = `Open from ${hours[element].open}am until ${close}pm`;
    });
    result.Monday = 'CLOSED';
    return result;
  }
  if (dayName !== 'Monday') {
    const close = (hours[dayName].close - 12);
    result[dayName] = `Open from ${hours[dayName].open}am until ${close}pm`;
    return result;
  }
  result.Monday = 'CLOSED';
  return result;
}

function getOldestFromFirstSpecies(id) {
  const idFind = employees.find((element) => element.id === id).responsibleFor;
  const mapAnimal = species.find((animal) => animal.id === idFind[0]).residents;
  const result = mapAnimal.reduce((acc, crr) => (crr.age > acc.age ? crr : acc));
  return Object.values(result);
}

function increasePrices(percentage) {
  prices.Adult = Math.round(prices.Adult * (1 + percentage / 100) * 100) / 100;
  prices.Senior = Math.round(prices.Senior * (1 + percentage / 100) * 100) / 100;
  prices.Child = Math.round(prices.Child * (1 + percentage / 100) * 100) / 100;
}

const coverageUndefined = () => {
  const employeeCoverage = employees.reduce((acc, curr) => {
    const { firstName, lastName, responsibleFor } = curr;
    const nameEmp = `${firstName} ${lastName}`;
    const animalByEmployee = responsibleFor.map((element) => {
      const speciesName = species.find((name) => name.id === element);
      return speciesName.name;
    });
    if (!acc[nameEmp]) {
      acc[nameEmp] = animalByEmployee;
    }
    return acc;
  },
  {});
  return employeeCoverage;
};
const name = (idOrName) => {
  const nameEmp = employees.filter(({ id, firstName, lastName }) => id === idOrName
  || firstName === idOrName || lastName === idOrName);
  return `${nameEmp[0].firstName} ${nameEmp[0].lastName}`;
};

const coverageId = (idOrName) => {
  const employeeCoverage = employees.reduce((acc, curr) => {
    const nameId = employees.find(({ id, firstName, lastName }) => id === idOrName
    || firstName === idOrName || lastName === idOrName).responsibleFor;
    const nameEmp = name(idOrName);
    const animalByEmployee = nameId.map((element) => {
      const speciesName = species.find((speciesId) => speciesId.id === element);
      return speciesName.name;
    });
    if (!acc[nameEmp]) {
      acc[nameEmp] = animalByEmployee;
    }
    return acc;
  },
  {});
  return employeeCoverage;
};

function getEmployeeCoverage(idOrName) {
  return idOrName === undefined ? coverageUndefined() : coverageId(idOrName);
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};