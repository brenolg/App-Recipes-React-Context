const fetchRecipes = async (url, param) => {
  const newCategory = () => {
    if (param === undefined) {
      return '';
    } return param;
  };

  const response = await fetch(url + newCategory());
  const data = await response.json();

  return data;
};

export default fetchRecipes;
