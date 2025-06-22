export const Header = () => {
  return (
    <header className="w-full h-24 px-4 border-b border-gray-200">
      <div class="w-full md:max-w-6xl md:mx-auto flex items-center justify-between h-full">
        <a href={"/"}>
          <img
            src={"../src/assets/LogoAlibe.avif"}
            alt={"Logo alibe distribuidora"}
            width={140}
            height={40}
            loading={"eager"}
            fetchPriority={"high"}
          />
        </a>
        <div>
          <button type={"button"} title={"Carrito"} className='relative cursor-pointer'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="#333333"
                d="M0 1h4.764l.545 2h18.078l-3.666 11H7.78l-.5 2H22v2H4.72l1.246-4.989L3.236 3H0zm7.764 11h10.515l2.334-7H5.855zM4 21a2 2 0 1 1 4 0a2 2 0 0 1-4 0m14 0a2 2 0 1 1 4 0a2 2 0 0 1-4 0"
              />
            </svg>
            <span className='absolute -top-6 -right-3 bg-red-500 text-slate-100 rounded-full w-8 h-8 flex items-center justify-center text-center'>0</span>
          </button>
        </div>
      </div>
    </header>
  );
};
