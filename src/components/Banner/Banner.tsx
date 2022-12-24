import { NavLink } from 'react-router-dom';

interface BannerProps {
  isLoginPage?: boolean;
}

export default function Banner({ isLoginPage = false }: BannerProps) {
  const redirectUrl = isLoginPage ? '/signup' : '/signin';

  return (
    <div className="flex flex-col items-center justify-center bg-slate-900 px-6 text-white shadow-lg">
      <h1 className="mb-2 text-center font-sans text-5xl font-extrabold">
        Welcome to Vaccine Management System!
      </h1>
      <img
        width="500px"
        height="450px"
        src="./banner.png"
        alt="Vaccine Management System"
      />

      <div className="mb-5 flex items-center justify-end text-2xl text-slate-400">
        <p>
          {isLoginPage ? "Don't have an account?" : 'Already have an account?'}
        </p>

        <NavLink to={redirectUrl} className="ml-3 text-white">
          {isLoginPage ? 'Signup' : 'Login'}
        </NavLink>
      </div>
    </div>
  );
}
