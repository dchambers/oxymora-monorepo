import { GrFormAdd } from "react-icons/gr";
import { Button } from "@chakra-ui/react";
import {
  makeStateful,
  Props,
  pureStatefulComponent,
  usePureStatefulCallback,
} from "@oxymora/oxymora";
import { MouseEventHandler } from "react";

// NOTE: remember to update the markdown in `CounterDemo.tsx` and the main `README.md` if you modify any code beneath this line
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
