import type { SyntheticEvent } from "react";
import type { PureStatefulComponentProps } from "@oxymora/pure-stateful-component";

import { createContext, useContext } from "react";

export type StateSpec = {
  State: unknown;
  InputProps: Object;
  OutputProps: Object;
};

export type InputProps<SS extends StateSpec> = {
  state: SS["State"];
} & SS["InputProps"];

export type OutputProps<SS extends StateSpec> = Partial<
  {
    state: SS["State"];
  } & SS["OutputProps"]
>;

export type Props<SS extends StateSpec> = PureStatefulComponentProps<
  SS["State"]
> &
  SS["InputProps"] & {
    [Key in keyof SS["OutputProps"]]?: (
      property: SS["OutputProps"][Key]
    ) => void;
  };

// TODO: implement this correctly once a solution is found in <https://github.com/microsoft/TypeScript/issues/12936#issuecomment-1343751084>
type Exact<T> = T;

const ComponentContext = createContext({
  state: undefined as unknown,
  onStateChange: (value: unknown) => {},
});

export const pureStatefulComponent =
  <SS extends StateSpec>(
    initialState: SS["State"],
    Component: (props: Props<SS>) => JSX.Element
  ) =>
  (props: Props<SS>) => {
    const state = props.state === undefined ? initialState : props.state;

    return (
      <ComponentContext.Provider value={{ ...props, state }}>
        <Component {...props} state={state} />
      </ComponentContext.Provider>
    );
  };

export const usePureStatefulCallback = <
  SS extends StateSpec,
  EH extends React.EventHandler<SyntheticEvent>
>(
  eventHandler: (
    event: Parameters<EH>[0],
    props: InputProps<SS>
  ) => Exact<OutputProps<SS>>
): EH => {
  const componentContext = useContext(ComponentContext);
  const wrappingEventHandler = ((event) => {
    const result = eventHandler(event, componentContext);

    if (result.state) {
      componentContext.onStateChange(result.state);
    }

    const resultKeys = Object.keys(result) as Array<keyof typeof result>;

    resultKeys.forEach((key) => {
      if (key !== "state") {
        const statefulComponentProps = componentContext as Props<SS>;
        const callback = statefulComponentProps[key];

        if (callback) {
          // NOTE: `callback` and `statefulComponentProps[key]` are typed generically in terms of `keyof SS["OutputProps"]`, but in reality they are both the same specific instance, so cast to `any`
          callback(result[key] as any);
        }
      }
    });
  }) as EH;

  return wrappingEventHandler;
};

export { default as makeStateful } from "@oxymora/pure-stateful-component";
