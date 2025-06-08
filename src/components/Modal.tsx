import { useState } from "react";
import Button from "./Button";

const Modal = ({ handleDeleteTask, idTask }: { handleDeleteTask: (id: string) => void, idTask: string }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpenModal(true)}
        color="oklch(70.4% 0.191 22.216)"
      >
        Eliminar
      </Button>

      {openModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-[rgba(206,205,205,0.6)]">
          <div className="relative border-2 border-gray-900 rounded-lg p-6 w-1/3 mx-auto space-y-4 bg-sky-200">
            <span className="absolute bottom-0 right-0 w-[101%] h-[101%] -mb-2 -mr-2 bg-gray-900 rounded-lg pointer-events-none -z-10"></span>
            <div className="flex items-center justify-between p-4">
              <h3 className="text-xl font-semibold text-gray-900">
                ¿Estás seguro de eliminar esta tarea?
              </h3>
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="absolute top-2 right-2 hover:bg-sky-300 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-4">
              <p className="text-xl text-gray-800">
                Esta acción eliminará la tarea permanentemente.
              </p>
            </div>

            <div className="flex justify-end p-4 gap-4">
              <Button
                type="button"
                onClick={() => setOpenModal(false)}
              >
                Cancelar
              </Button>

              <Button
                type="button"
                onClick={() => {
                  handleDeleteTask(idTask);
                  setOpenModal(false);
                }}
                color="oklch(70.4% 0.191 22.216)"
              >
                Sí, eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
