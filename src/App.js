import { useState } from "react";
import StoryForm from "./components/StoryForm";
import StoryList from "./components/StoryList";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  const [stories, setStories] = useState([
    {
      id: 1,
      description:
        "As a logged-in user, I want to be able to report unsuitable content.",
      priority: 0,
    },
    {
      id: 2,
      description:
        "As a website user, I want to be able to vote on features in the poll.",
      priority: 1,
    },
  ]);

  const addStoryHandler = (newStory) => {
    setStories((prevState) => {
      return [...prevState, newStory];
    });
  };

  const deleteAllHandler = (stories) => {
    setStories((prevState) => {
      return prevState.filter((story) => !stories.includes(story));
    });
  };

  return (
    <div>
      <DefaultLayout>
        <StoryForm addStory={addStoryHandler} />
        <StoryList stories={stories} deleteStories={deleteAllHandler} />
      </DefaultLayout>
    </div>
  );
}

export default App;
