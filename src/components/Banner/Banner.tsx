import { NavLink } from 'react-router-dom';

import {
  LOGIN_FORM,
  SIGNUP_FORM,
  APPLICATION_INFORMATION,
} from '../../constants/lang.constants';

import * as routes from '../../constants/routesConstants';

/**
 * Represents the properties of the Banner component.
 *
 * @interface BannerProps
 */
export interface BannerProps {
  /**
   * Indicates whether the banner is on a login page.
   *
   * @type {(boolean | undefined)}
   */
  isLoginPage?: boolean;
}

export default function Banner({ isLoginPage = false }: BannerProps) {
  const redirectUrl = isLoginPage ? routes.SIGNUP : routes.SIGNIN;

  return (
    <div className="flex flex-col items-center justify-center bg-slate-900 px-6 text-white shadow-lg">
      <h1 className="mb-2 text-center font-sans text-5xl font-extrabold">
        {APPLICATION_INFORMATION.WELCOME_TEXT}
      </h1>
      <img
        width="500px"
        height="450px"
        src="./banner.png"
        alt={APPLICATION_INFORMATION.TITLE}
      />

      <div className="mb-5 flex items-center justify-end text-2xl text-slate-400">
        <p>
          {isLoginPage
            ? LOGIN_FORM.MESSAGES.NO_ACCOUNT
            : SIGNUP_FORM.MESSAGES.ALREADY_HAVE_ACCOUNT}
        </p>

        <NavLink to={redirectUrl} className="ml-3 text-white">
          {isLoginPage
            ? SIGNUP_FORM.BUTTONS.SIGNUP.label
            : LOGIN_FORM.BUTTONS.LOGIN.label}
        </NavLink>
      </div>
    </div>
  );
}
