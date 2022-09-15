const DefaultLayout = (props) => {
  return (
    <div>
      <div className="bg-white shadow p-4 w-full">
        <div className="max-w-5xl mx-auto flex items-center space-x-2">
          <img
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
            className="w-8"
          />
          <span className="font-semibold text-sm">
            Story Tracker (react v18.2.0)
          </span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-10 px-4 lg:px-0">
        {props.children}
      </div>
    </div>
  );
};

export default DefaultLayout;
