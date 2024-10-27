import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useAppStore } from '../stores/useAppStore'
import { InstructionDrink } from '../types'

export default function MyModal() {

  const modal = useAppStore((state) => state.modal)
  const closeModal = useAppStore((state) => state.closeModal)
  const selectedRecipe = useAppStore((state) => state.selectedRecipe)
  const handleClickFavorite = useAppStore((state) => state.handleClickFavorite)
  const favoriteExist = useAppStore((state) => state.favoriteExist)

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = []
    for (let i = 1; i <= 6; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof InstructionDrink]
      const measure = selectedRecipe[`strMeasure${i}` as keyof InstructionDrink]
  
      if (ingredient && measure) {
        ingredients.push(
          <li key={i} className="text-base font-normal">
            {ingredient} - {measure}
          </li>
        )
      }
    }
    return ingredients
  }

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {selectedRecipe.strDrink}
                  </Dialog.Title>
                  <img src={selectedRecipe.strDrinkThumb} alt="img-modal" className='mx-auto w-72 rounded-md mt-4' />
                  <div className="mt-2">
                    <h4 className='font-semibold'>Instrucciones</h4>
                    <p className="text-sm text-gray-500">
                      {selectedRecipe.strInstructions}
                    </p>
                  </div>
                  {renderIngredients()}
                  <div className="mt-4 flex space-x-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 "
                      onClick={closeModal}
                    >
                      Cerrar
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        handleClickFavorite(selectedRecipe)
                        closeModal()
                      }}
                    >
                      {
                        favoriteExist(selectedRecipe.idDrink) 
                        
                        ? 
                        ('Eliminar de favoritos')
                        :
                        ('Agregar a favoritos')
                   
                      }
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
