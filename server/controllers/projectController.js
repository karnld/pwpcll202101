// Actions MEthods
// "/proyects"
const index = (req, res) => {
  res.send('Respondiendo a "projects/index"');
};

// "/proyects/add"
const add = (req, res) => {
  res.send('Respondiendo a "projects/add"');
};

// Exportar objeto
export default {
  index,
  add,
};
