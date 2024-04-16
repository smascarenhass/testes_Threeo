import "../styles/index.css";

export default function Header() {
  const logout = () => {
    localStorage.removeItem("userLogado");
    window.location.href = "/";
  };

  return (
    <header>

        <h2 style={{color: 'black'}}>Controle de Usuários Threeo</h2>

        <button className="bnt_loggout" onClick={logout}>Logout</button>

    </header>
  );
}
