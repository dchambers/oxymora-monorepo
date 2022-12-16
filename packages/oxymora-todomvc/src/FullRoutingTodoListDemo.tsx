import { Box, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

import { Todos, ViewMode } from "./TodoMvc/data-model";
import { defaultTodoList, PureStatefulTodoList } from "./TodoMvc/TodoList";

const demoSummary = `
## Full Routing

In this example the pure-stateful version of the TodoMVC component (\`PureStatefulTodoList\`) is used:

\`\`\`ts
const FullRoutingTodoList = () => {
  const [state, setState] = useState(
    (localStorage.getItem("todo-list")
      ? JSON.parse(localStorage.getItem("todo-list") as string)
      : defaultTodoList) as Todos
  );
  const onStateChange = (todos: Todos) => {
    localStorage.setItem("todo-list", JSON.stringify(todos));
    setState(todos);
  };
  const onViewModeChange = (viewMode: ViewMode) => {
    window.location.pathname = \`/full/\${viewMode}\`;
  };
  
  return (
    <PureStatefulTodoList
      state={state}
      onStateChange={onStateChange}
      onViewModeChange={onViewModeChange}
    />
  );
};
\`\`\`

💡 Consider that this style of routing could only have been achieved using a traditional stateful component if the routing logic had been built into the component, but doing that would have precluded the direct and hashbang approaches, while state never limits the extent to which compositional re-use is possible when pure-stateful components are used.

ℹ️ The user's data is now finally being stored within local-storage, and in fact it's now critical to the app's functioning given that changing the view mode will cause the page to be reloaded.
`;

// NOTE: remember to update the markdown if you make a change to this function!!!
const FullRoutingTodoList = () => {
  const [state, setState] = useState(
    (localStorage.getItem("todo-list")
      ? JSON.parse(localStorage.getItem("todo-list") as string)
      : defaultTodoList) as Todos
  );
  const onStateChange = (todos: Todos) => {
    localStorage.setItem("todo-list", JSON.stringify(todos));
    setState(todos);
  };
  const onViewModeChange = (viewMode: ViewMode) => {
    window.location.pathname = `/full/${viewMode}`;
  };

  return (
    <PureStatefulTodoList
      state={state}
      onStateChange={onStateChange}
      onViewModeChange={onViewModeChange}
    />
  );
};

const FullRoutingTodoListDemo = () => (
  <SimpleGrid columns={2}>
    <Box p="4">
      <FullRoutingTodoList />
    </Box>
    <Box p="4" bg="white" h="100vh">
      <ReactMarkdown className="markdown-body">{demoSummary}</ReactMarkdown>
    </Box>
  </SimpleGrid>
);

export default FullRoutingTodoListDemo;
