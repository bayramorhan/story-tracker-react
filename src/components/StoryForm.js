import React, { useState } from "react";
import { v4 as uuid } from "uuid";

const StoryForm = (props) => {
  const [storyInput, setStoryInput] = useState({
    id: uuid(), // set initial unique id
    description: "",
    priority: "",
  });

  const [validationError, setValidationError] = useState();

  const descriptionChangeHandler = (e) => {
    setStoryInput((prevState) => {
      return {
        ...prevState,
        description: e.target.value,
      };
    });
  };

  const priorityChangeHandler = (e) => {
    setStoryInput((prevState) => {
      return {
        ...prevState,
        priority: e.target.value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setValidationError();

    if (storyInput.priority < 1) {
      setValidationError("Please select a priority from the list.");
    } else {
      props.addStory(storyInput);

      setStoryInput({
        id: uuid(), // set new unique id for the future story that can be added
        description: "",
        priority: "",
      });
    }
  };

  return (
    <div>
      <h2 className="font-bold leading-tight tracking-tight text-gray-900">
        New User Story
      </h2>
      <div className="px-6 pt-6 pb-8 rounded border bg-white shadow-sm mt-4">
        <form
          className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4"
          onSubmit={submitHandler}
        >
          <div className="flex-1">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={storyInput.description}
              onChange={descriptionChangeHandler}
              className="border border-gray-300 rounded px-4 py-2 text-sm w-full"
              required
            />
          </div>
          <div>
            <label
              htmlFor="priority"
              className="block mb-2 text-sm font-medium"
            >
              Priority
            </label>
            <select
              className="border border-gray-300 rounded px-4 py-2 text-sm w-full"
              onChange={priorityChangeHandler}
              id="priority"
              value={storyInput.priority}
            >
              <option value="">Please choose</option>
              <option value="0">Nice to Have</option>
              <option value="1">Should Have</option>
              <option value="2">Must Have</option>
            </select>
          </div>
          <div className="pt-2 lg:pt-0">
            <label className="hidden lg:block mb-1">&nbsp;</label>
            <button
              type="submit"
              className="text-sm font-medium bg-indigo-600 px-4 py-2 hover:bg-indigo-700 text-teal-50 rounded"
            >
              Create User Story
            </button>
          </div>
        </form>
        <div className="text-red-600 text-sm mt-4">{validationError}</div>
      </div>
    </div>
  );
};

export default StoryForm;
