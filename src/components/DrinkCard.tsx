import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types"


type DrinkProps = {
    drink: Drink
}


const DrinkCard = ({drink}: DrinkProps) => {

 const selectRecipe = useAppStore((state)=>state.selectRecipe)

 return (
    <div className="shadow-lg rounded-lg bg-white overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105">
      <div className="bg-cover w-full h-64">
        <img
          src={drink.strDrinkThumb}
          alt="imagen-trago"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-medium text-[#251a1a] font-poppins truncate">
          {drink.strDrink}
        </h2>
        <button
          type="button"
          className="bg-gradient-to-r from-[#251a1a] to-gray-800 text-white rounded-full mt-4 px-5 py-2 text-sm font-medium hover:scale-105 transition-transform duration-200 ease-in-out"
          onClick={() => selectRecipe(drink.idDrink)}
        >
          Ver Receta
        </button>
      </div>
    </div>
  )

}

export default DrinkCard