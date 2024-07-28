import pokemon_img from '../assets/pokemon_logo.png'
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="light">

        <div className="container-fluid ">
            <a className="navbar-brand flex items-center" href="#"> <img src={pokemon_img} alt="logo" width="180" height="60" className="d-inline-block align-text-top"/><span className="badge text-bg-secondary fs-4 mt-2">World</span></a>
        </div>
    </nav>
  )
}

export default Navbar