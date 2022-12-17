import { Box, SimpleGrid } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

import { ViewMode } from "./TodoMvc/data-model";
import { StatefulTodoList } from "./TodoMvc/TodoList";

const demoSummary = `
## No Routing

In this example the stateful version of the Oxymora [TodoMVC](https://todomvc.com/) component (\`StatefulTodoList\`) is used without any props, like so:

\`\`\`ts
const DirectTodoList = () => <StatefulTodoList />;
\`\`\`

ℹ️ Note that no attempt is made to preserve the user's data here.
`;

// NOTE: remember to update the markdown if you make a change to this function!!!
const DirectTodoList = () => <StatefulTodoList />;

const DirectTodoListDemo = () => (
  <SimpleGrid columns={2}>
    <Box p="4">
      <DirectTodoList />
    </Box>
    <Box p="4" bg="white" h="100vh">
      <ReactMarkdown className="markdown-body">{demoSummary}</ReactMarkdown>
    </Box>
  </SimpleGrid>
);

export default DirectTodoListDemo;
