import { useReducer, useRef, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const priorities = ["Nice to Have", "Should Have", "Must Have"];

export default function StoryList(props) {
  const checkbox = useRef();

  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedStories, setSelectedStories] = useState([]);

  useReducer(() => {
    const isIndeterminate =
      selectedStories.length > 0 &&
      selectedStories.length < props.stories.length;
    setChecked(selectedStories.length === props.stories.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedStories]);

  function toggleAll() {
    setSelectedStories(checked || indeterminate ? [] : props.stories);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const deleteAllHandler = () => {
    props.deleteStories(selectedStories);
    setChecked(false);
  };

  return (
    <div>
      {props.stories.length > 0 && (
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                {selectedStories.length > 0 && (
                  <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                    <button
                      type="button"
                      className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      onClick={deleteAllHandler}
                    >
                      Delete all
                    </button>
                  </div>
                )}
                <table className="min-w-full table-fixed divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="relative w-12 px-6 sm:w-16 sm:px-8"
                      >
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                          ref={checkbox}
                          checked={checked}
                          onChange={toggleAll}
                        />
                      </th>
                      <th
                        scope="col"
                        className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        User Story
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Priority
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {props.stories.map((story) => (
                      <tr
                        key={story.id}
                        className={
                          selectedStories.includes(story)
                            ? "bg-gray-50"
                            : undefined
                        }
                      >
                        <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                          {selectedStories.includes(story) && (
                            <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                          )}
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6 cursor-pointer"
                            value={story.email}
                            checked={selectedStories.includes(story)}
                            onChange={(e) =>
                              setSelectedStories(
                                e.target.checked
                                  ? [...selectedStories, story]
                                  : selectedStories.filter((p) => p !== story)
                              )
                            }
                          />
                        </td>
                        <td
                          className={classNames(
                            "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                            selectedStories.includes(story)
                              ? "text-indigo-600"
                              : "text-gray-900"
                          )}
                        >
                          {story.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {priorities[story.priority]}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          ...
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {props.stories.length < 1 && (
        <div className="text-center py-10 text-sm">
          Your user stories will be listed here.
        </div>
      )}
    </div>
  );
}
