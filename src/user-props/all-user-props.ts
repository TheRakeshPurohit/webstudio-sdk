import { useMemo } from "react";
import { createValueContainer, useValue } from "react-nano-state";
import { type Instance } from "../instance";

// @todo need to use type generated by prisma
type InstanceProps = any;

export type AllUserProps = Map<Instance["id"], InstanceProps["props"]>;
const allUserPropsContainer = createValueContainer<AllUserProps>(new Map());
export const useAllUserProps = (initialUserProps?: Array<InstanceProps>) => {
  useMemo(() => {
    if (initialUserProps === undefined) return;
    const propsMap = new Map();
    for (const prop of initialUserProps) {
      propsMap.set(prop.id, prop.props);
    }
    //We don't need to trigger rerender when setting the initial value
    allUserPropsContainer.value = propsMap;
  }, [initialUserProps]);
  return useValue(allUserPropsContainer);
};
