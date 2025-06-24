const Navbar = (isSubscribed = false) => {
  const isLoggedIn = !!localStorage.getItem("token");

  return `
    <header class="bg-[#af69ee] text-white shadow fixed w-full top-0 z-50">
      <div class="mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#/" class="text-xl font-bold flex items-center gap-2">
          Ceritakan Pengalamanmu
        </a>
        <button id="drawer-button" class="md:hidden text-2xl"><i class="fas fa-bars"></i></button>
        <nav id="nav-menu" class="hidden md:flex gap-4 text-sm items-center">
          ${
            isLoggedIn
              ? `
                <button id="subscribeToggleBtn"
                        class="${
                          isSubscribed
                            ? "bg-red-600 text-white hover:bg-red-700"
                            : "bg-white text-blue-600 hover:bg-blue-100"
                        } 
                          px-3 py-2 rounded 
                          transition-all duration-300 ease-in-out 
                          transform hover:scale-[1.02] 
                          flex items-center">
                  <i class="fas ${
                    isSubscribed ? "fa-bell-slash" : "fa-bell"
                  } mr-1"></i>
                  ${isSubscribed ? "Unsubscribe" : "Subscribe"}
                </button>`
              : ""
          }

          <a href="#/" 
             class="bg-[#af69ee] hover:bg-[#9b54d6] 
                    px-3 py-2 rounded 
                    transition-all duration-300 ease-in-out 
                    transform hover:scale-[1.02] 
                    flex items-center text-white">
            <i class="fas fa-home mr-1"></i> Beranda
          </a>
          <a href="#/form" 
             class="bg-[#af69ee] hover:bg-[#9b54d6] 
                    px-3 py-2 rounded 
                    transition-all duration-300 ease-in-out 
                    transform hover:scale-[1.02] 
                    flex items-center text-white">
            <i class="fas fa-plus mr-1"></i> Tambah Cerita
          </a>
          <a href="#/bookmark" 
             class="bg-[#af69ee] hover:bg-[#9b54d6] 
                    px-3 py-2 rounded 
                    transition-all duration-300 ease-in-out 
                    transform hover:scale-[1.02] 
                    flex items-center text-white">
            <i class="fas fa-bookmark mr-1"></i> Tersimpan
          </a>
          ${
            isLoggedIn
              ? `<button id="logoutBtn" 
                        class="hover:bg-red-700 
                               px-3 py-2 rounded 
                               transition-all duration-300 ease-in-out 
                               transform hover:scale-[1.02] 
                               flex items-center text-white">
                  <i class="fas fa-sign-out-alt mr-1"></i> Logout
                </button>`
              : ""
          }
        </nav>
      </div>
    </header>
    <div class="h-12"></div>

    <div id="drawer" class="fixed left-0 top-0 w-64 h-full bg-white shadow-md transform -translate-x-full transition-transform duration-300 z-50">
      <div class="flex flex-col p-4 space-y-4 text-left">
        <a href="#/" class="drawer-link text-base text-gray-800 hover:text-[#af69ee] flex items-center transition-all duration-300 ease-in-out hover:scale-[1.02]">
          <i class="fas fa-home mr-2"></i> Beranda
        </a>
        <a href="#/form" class="drawer-link text-base text-gray-800 hover:text-[#af69ee] flex items-center transition-all duration-300 ease-in-out hover:scale-[1.02]">
          <i class="fas fa-plus mr-2"></i> Tambah Cerita
        </a>
        <a href="#/about" class="drawer-link text-base text-gray-800 hover:text-[#af69ee] flex items-center transition-all duration-300 ease-in-out hover:scale-[1.02]">
          <i class="fas fa-bookmark mr-2"></i> Tersimpan
        </a>
        ${
          isLoggedIn
            ? `
              <button id="drawer-subscribeToggleBtn"
                      class="text-base ${
                        isSubscribed
                          ? "text-red-600 hover:text-red-800"
                          : "text-blue-600 hover:text-blue-800"
                      } 
                             rounded w-fit 
                             flex items-center 
                             transition-all duration-300 ease-in-out 
                             hover:scale-[1.02]">
                <i class="fas ${
                  isSubscribed ? "fa-bell-slash" : "fa-bell"
                } mr-2"></i>
                ${isSubscribed ? "Unsubscribe" : "Subscribe"}
              </button>
              <button id="logoutBtnDrawer" 
                      class="text-base text-red-600 
                             hover:text-red-800 
                             rounded w-fit 
                             flex items-center 
                             transition-all duration-300 ease-in-out 
                             hover:scale-[1.02]">
                <i class="fas fa-sign-out-alt mr-2"></i> Logout
              </button>`
            : ""
        }
      </div>
    </div>
  `;
};

export default Navbar;
