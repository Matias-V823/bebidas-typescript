import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

const FavoritesPage = () => {


  const favorites = useAppStore((state) => state.favorites)
  const hasFavorites = useMemo(() => favorites.length, [favorites])

  return (
    <>
      <h1 className="text-center text-2xl sm:text-4xl font-poppins  font-semibold mt-5 text-principal">Favoritos</h1>
        {
          hasFavorites ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-8 p-2 max-w-5xl mx-auto rounded-xl">
              {favorites.map(favorite => (
                <DrinkCard
                  key={favorite.idDrink}
                  drink={favorite}
                />
              ))}
            </div>
          ) : (
            <p className="text-lg font-poppins text-center text-principal">Aún no se han registrado favoritos</p>
          )
        }
    </>
  )
}

export default FavoritesPage