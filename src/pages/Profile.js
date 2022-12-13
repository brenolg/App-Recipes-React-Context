import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const storage = localStorage.getItem('user');
    if (!storage) {
      setEmail('');
    } else {
      const user = JSON.parse(storage);
      setEmail(user.email);
    }
  }, [email]);

  const history = useHistory();
  return (
    <div>
      <Header
        pageTitle="Profile"
        searchSymbol={ false }
      >
        Profile

      </Header>

      <main>
        <p data-testid="profile-email">{`E-mail: ${email}`}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => { history.push('/done-recipes'); } }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => { history.push('/favorite-recipes'); } }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
