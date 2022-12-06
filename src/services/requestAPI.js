const fetchRecipes = async (url, category) => {
  const newCategory = () => {
    if (category === undefined) {
      return '';
    } return category;
  };

  const response = await fetch(url + newCategory());
  const data = await response.json();

  return data;
};

export default fetchRecipes;
