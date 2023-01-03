import { render, screen, waitFor } from '@testing-library/react';

import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Sidebar from '../../components/Sidebar';
import store from '../../store';
import { SIDEBAR_NAV_ITEMS } from '../../constants/baseConstants';

describe('Sidebar', () => {
  it('renders the navigation sidebar', () => {
    // Set up the component with the mock store and history
    const { container } = render(
      <Provider store={store}>
        <Sidebar
          isOpen={false}
          onOpen={() => {}}
          onClose={() => {}}
          navigationItems={SIDEBAR_NAV_ITEMS}
        />
      </Provider>,
      { wrapper: BrowserRouter },
    );

    expect(screen.getByTestId('sidebar')).toMatchInlineSnapshot(`
      <div
        class="bg-white shadow-md"
        data-testid="sidebar"
      >
        <div>
          <div
            class="mb-4 flex items-center p-4"
          >
            <span
              class="max-w-xs text-center text-2xl font-bold text-blue-400 "
            >
              VMS
            </span>
            <button
              class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium css-78trlr-MuiButtonBase-root-MuiIconButton-root"
              tabindex="0"
              type="button"
            >
              <svg
                aria-hidden="true"
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                data-testid="MenuIcon"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
                />
              </svg>
              <span
                class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"
              />
            </button>
          </div>
          <hr
            class="MuiDivider-root MuiDivider-fullWidth css-9mgopn-MuiDivider-root"
          />
          <div
            class="flex flex-col items-center"
          >
            <ul
              class="MuiList-root MuiList-padding css-h4y409-MuiList-root"
            >
              <a
                aria-current="page"
                class="active"
                href="/"
              >
                <li
                  aria-label="Vaccines"
                  class="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
                  data-mui-internal-clone-element="true"
                >
                  <div
                    class="MuiListItemIcon-root p-2 css-cveggr-MuiListItemIcon-root"
                  >
                    <svg
                      fill="currentColor"
                      font-size="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="0"
                      viewBox="0 0 480 512"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M477.7 186.1L309.5 18.3c-3.1-3.1-8.2-3.1-11.3 0l-34 33.9c-3.1 3.1-3.1 8.2 0 11.3l11.2 11.1L33 316.5c-38.8 38.7-45.1 102-9.4 143.5 20.6 24 49.5 36 78.4 35.9 26.4 0 52.8-10 72.9-30.1l246.3-245.7 11.2 11.1c3.1 3.1 8.2 3.1 11.3 0l34-33.9c3.1-3 3.1-8.1 0-11.2zM318 256H161l148-147.7 78.5 78.3L318 256z"
                      />
                    </svg>
                  </div>
                </li>
              </a>
              <a
                class=""
                href="/profile"
              >
                <li
                  aria-label="Profile"
                  class="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
                  data-mui-internal-clone-element="true"
                >
                  <div
                    class="MuiListItemIcon-root p-2 css-cveggr-MuiListItemIcon-root"
                  >
                    <svg
                      fill="currentColor"
                      font-size="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="0"
                      viewBox="0 0 496 512"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"
                      />
                    </svg>
                  </div>
                </li>
              </a>
              <a
                class=""
                href="/signout"
              >
                <li
                  aria-label="SignOut"
                  class="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-1p823my-MuiListItem-root"
                  data-mui-internal-clone-element="true"
                >
                  <div
                    class="MuiListItemIcon-root p-2 css-cveggr-MuiListItemIcon-root"
                  >
                    <svg
                      fill="currentColor"
                      font-size="24"
                      height="24"
                      stroke="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                      />
                    </svg>
                  </div>
                </li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    `);
  });
});
