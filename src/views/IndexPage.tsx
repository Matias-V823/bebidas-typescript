import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

const IndexPage = () => {
  const drinks = useAppStore((state) => state.drinks)
  const hasDrink = useMemo(() => drinks.drinks.length, [drinks])

  return (
    <>
      <h1 className="text-center text-2xl sm:text-4xl font-poppins  font-semibold mt-5 text-principal">Recetas de tragos</h1>
      {hasDrink ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-8 p-2 max-w-5xl mx-auto rounded-xl">
          {drinks.drinks.map((drink) => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl sm:text-base px-4 text-principal font-poppins">
          No hay resultados aún, utiliza el formulario para buscar recetas
        </p>
      )}
    </>
  )
}

export default IndexPage
