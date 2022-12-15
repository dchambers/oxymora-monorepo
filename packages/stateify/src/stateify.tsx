import { useState } from "react";

export type Component<P> = (props: P) => JSX.Element;

export type PureStatefulComponentProps<S> = {
  state: S;
  onStateChange: (updatedState: S) => void;
};

export type PureStatefulComponent<
  S,
  P extends PureStatefulComponentProps<S>
> = Component<P>;

export type StateifiedProps<S, P extends PureStatefulComponentProps<S>> = Omit<
  P,
  "state" | "onStateChange"
>;

const makeStateful =
  <S, P extends PureStatefulComponentProps<S>>(
    Component: PureStatefulComponent<S, P>
  ): Component<StateifiedProps<S, P>> =>
  (props: StateifiedProps<S, P>) => {
    const [state, setState] = useState(undefined as S);

    // TODO: switch to correct definition if TS fixes `Omit` so it ceases to break connection with the original type
    // return <Component state={state} onStateChange={setState} {...props} />;

    return (
      <Component {...(props as P)} state={state} onStateChange={setState} />
    );
  };

export default makeStateful;
