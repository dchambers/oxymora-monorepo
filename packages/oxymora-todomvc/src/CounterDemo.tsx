import { Box, SimpleGrid } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

import { StatefulCounter } from "./Counter/Counter";

const demoSummary = `
## Counter

An example of a simple Oxymora component, as described in the main \`README.md\` for the project.

\`\`\`ts
type CounterStateSpec = {
  State: number;
  InputProps: {
    incrementBy?: number;
  };
  OutputProps: {
    onCounterChange: number;
  };
};

export type CounterProps = Props<CounterStateSpec>;

export const PureStatefulCounter = pureStatefulComponent<CounterStateSpec>(
  1, // initial state
  ({ state }) => {
    const onIncrementCounter = usePureStatefulCallback<
      CounterStateSpec,
      MouseEventHandler<HTMLButtonElement>
    >((_event, { state, incrementBy = 1 }) => {
      const newState = state + incrementBy;

      return {
        state: newState,
        onCounterChange: newState,
      };
    });

    return (
      <Button
        colorScheme="orange"
        leftIcon={<GrFormAdd />}
        onClick={onIncrementCounter}
      >
        {state}
      </Button>
    );
  }
);

export const StatefulCounter = makeStateful<
  CounterStateSpec["State"],
  CounterProps
>(PureStatefulCounter);
\`\`\`
`;

const CounterDemo = () => (
  <SimpleGrid columns={2}>
    <Box p="4">
      <StatefulCounter incrementBy={2} />
    </Box>
    <Box p="4" bg="white" h="100vh">
      <ReactMarkdown className="markdown-body">{demoSummary}</ReactMarkdown>
    </Box>
  </SimpleGrid>
);

export default CounterDemo;
