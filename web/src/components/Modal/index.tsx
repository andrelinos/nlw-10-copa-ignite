import { Dispatch, Fragment, MutableRefObject } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  title: string;
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  buttonRef: MutableRefObject<null>;
  children: React.ReactNode;
}

export function Modal({
  title,
  open,
  buttonRef,
  setOpen,
  children,
  ...rest
}: ModalProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={buttonRef}
        onClose={setOpen}
        {...rest}
      >
        <div
          className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block
         sm:p-0"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="h-64 inline-block align-bottom bg-gray-900 rounded-lg
                  text-left overflow-hidden shadow-xl transform transition-all
                  sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-ignite-500"
            >
              <div className="bg-gray-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-xl leading-6 font-bold text-ignite-500"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-4 text-gray-100">{children}</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse mt-12">
                <button
                  type="button"
                  className="bg-yellow-500 px-10 py-3 rounded text-gray-900 font-bold
                  text-sm uppercase hover:bg-yellow-700 transition-all mx-auto"
                  onClick={() => setOpen(false)}
                  ref={buttonRef}
                  {...rest}
                >
                  Fechar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
