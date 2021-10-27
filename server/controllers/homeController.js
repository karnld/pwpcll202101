const index = (req, res) => {
  res.render('home/index', {
    title: 'ProjNotes',
  });
};

const greeting = (req, res) => {
  res.status(200).json({
    message: 'Hola Campeon de la fullstack Web',
  });
};

const about = (req, res) => {
  res.render('home/about', { title: 'Acerca de ProjNotes' });
}

export default {
  index,
  greeting,
  about,
};
