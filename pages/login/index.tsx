import React from 'react'

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Lado izquierdo con la imagen del logo */}
      <div className="w-1/2 items-center justify-center bg-green-400 sm:hidden md:flex lg:flex">
        <img src="/images/logo.svg" alt="Logo de la empresa" className="w-60" />
      </div>

      {/* Lado derecho con el formulario de inicio de sesión */}
      <div className="flex w-full items-center justify-center bg-white md:w-1/2">
        <div className="w-full p-6 md:w-4/12">
          <h1 className="mb-4 text-2xl font-bold">Iniciar Sesión</h1>
          <form>
            {/* Agrega aquí tus campos de inicio de sesión, como el campo de correo electrónico y contraseña */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Correo Electrónico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900  focus:border-blue-500 focus:ring-blue-500 focus-visible:border-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
