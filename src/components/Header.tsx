import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "../stores/useAppStore";

const Header = () => {
  const [searchFilter, setSearchFilter] = useState({
    ingredient: '',
    category: ''
  });
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === '/', [pathname]);

  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);
  const searchRecipes = useAppStore((state) => state.searchRecipes);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter({
      ...searchFilter,
      [e.target.name]: e.target.value
    });
  };

  const notificationForm = useAppStore((state)=> state.showNotification)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(Object.values(searchFilter).includes('')){
      console.log('Todos los campos son obligatorios')
      notificationForm({
        text: 'Todos los campos son obligatorios',
        error: true
      })

      return notificationForm
    }
    //Consultar las recetas
    searchRecipes(searchFilter)
  }

  return (
    <header className="bg-header bg-cover">
      <div className="mx-auto container px-5 py-10 md:py-16">
        <div className="flex justify-between items-center">
          <div>
            <img src={logo} alt="Logotipo" className="w-24 md:w-32" />
          </div>
          <nav className="flex gap-6 bg-white py-2 px-4 rounded-2xl text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-orange-500 font-bold transition-all duration-300'
                  : 'text-gray-900  font-bold transition-all duration-300 hover:text-orange-500'
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive
                  ? 'text-orange-500 font-bold transition-all duration-300'
                  : 'text-gray-900  font-bold transition-all duration-300 hover:text-orange-500'
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            onSubmit={handleSubmit}
            className="md:w-2/3 lg:w-1/2 xl:w-1/3 bg-[#1b1313] mt-16 p-6 md:p-10 rounded-2xl shadow-xl space-y-8 mx-20"
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-gray-100 font-poppins text-lg"
              >
                Nombre o Ingredientes
              </label>
              <input
                onChange={handleFilter} 
                value={searchFilter.ingredient}
                type="text"
                name="ingredient"
                id="ingredient"
                className="p-4 w-full rounded-xl border border-gray-300 focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-200 transition-all duration-300"
                placeholder="Nombre o Ingrediente"
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-gray-100 font-poppins text-lg"
              >
                Categoría
              </label>
              <select
                onChange={handleFilter} 
                value={searchFilter.category}
                name="category"
                id="category"
                className="p-4 w-full rounded-xl border border-gray-300 focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-200 transition-all duration-300"
              >
                <option value="">--SELECCIONE--</option>
                {categories.drinks.map((category) => (
                  <option
                    value={category.strCategory}
                    key={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar Recetas"
              className="text-[#FAF4DA] font-poppins font-poppins- cursor-pointer bg-orange-600 hover:bg-orange-700 w-full p-4 rounded-xl uppercase transition-all duration-300"
            />
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;
