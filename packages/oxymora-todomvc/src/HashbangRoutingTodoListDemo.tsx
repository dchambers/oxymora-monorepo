import { Box, SimpleGrid } from "@chakra-ui/react";
import { useReducer } from "react";
import ReactMarkdown from "react-markdown";

import { ViewMode } from "./TodoMvc/data-model";
import { StatefulTodoList } from "./TodoMvc/TodoList";

const demoSummary = `
## Hashbang Routing

In this example the stateful version of the TodoMVC component (\`StatefulTodoList\`) is also used, but this time with props to synchronize the view-mode to the browser location hash, like so:

\`\`\`ts
const HashbangRoutingTodoList = () => {
  const viewMode = window.location.hash
    ? (window.location.hash.substring(1) as ViewMode)
    : ViewMode.All;
  const setViewMode = (viewMode: ViewMode) => {
    window.location.hash = \`#\${viewMode}\`;
    forceRender();
  };
  const [, forceRender] = useReducer((x) => x + 1, 0);

  return (
    <StatefulTodoList viewMode={viewMode} onViewModeChange={setViewMode} />
  );
};
\`\`\`

ℹ️ Again, no attempt is made to preserve the user's data.

💡 Try clicking the 'All', 'Active' & 'Completed' buttons after adding a todo item, to see the browser's location change.
`;

// NOTE: remember to update the markdown if you make a change to this function!!!
const HashbangRoutingTodoList = () => {
  const viewMode = window.location.hash
    ? (window.location.hash.substring(1) as ViewMode)
    : ViewMode.All;
  const setViewMode = (viewMode: ViewMode) => {
    window.location.hash = `#${viewMode}`;
    forceRender();
  };
  const [, forceRender] = useReducer((x) => x + 1, 0);

  return (
    <StatefulTodoList viewMode={viewMode} onViewModeChange={setViewMode} />
  );
};

const HashbangRoutingTodoListDemo = () => (
  <SimpleGrid columns={2}>
    <Box p="4">
      <HashbangRoutingTodoList />
    </Box>
    <Box p="4" bg="white" h="100vh">
      <ReactMarkdown className="markdown-body">{demoSummary}</ReactMarkdown>
    </Box>
  </SimpleGrid>
);

export default HashbangRoutingTodoListDemo;
