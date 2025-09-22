"use client";

import {
  Content as TabsPrimitiveContent,
  List as TabsPrimitiveList,
  Root as TabsPrimitiveRoot,
  Trigger as TabsPrimitiveTrigger,
} from "@radix-ui/react-tabs";
import { useEffectEvent } from "fumadocs-core/utils/use-effect-event";
import {
  type ComponentProps,
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { mergeRefs } from "@/lib/merge-refs";

type ChangeListener = (v: string) => void;
const listeners = new Map<string, ChangeListener[]>();

function addChangeListener(id: string, listener: ChangeListener): void {
  const list = listeners.get(id) ?? [];
  list.push(listener);
  listeners.set(id, list);
}

function removeChangeListener(id: string, listener: ChangeListener): void {
  const list = listeners.get(id) ?? [];
  listeners.set(
    id,
    list.filter((item) => item !== listener)
  );
}

export type TabsProps = ComponentProps<typeof TabsPrimitiveRoot> & {
  /**
   * Identifier for Sharing value of tabs
   */
  groupId?: string;

  /**
   * Enable persistent
   */
  persist?: boolean;

  /**
   * If true, updates the URL hash based on the tab's id
   */
  updateAnchor?: boolean;
};

const TabsContext = createContext<{
  valueToIdMap: Map<string, string>;
} | null>(null);

function useTabContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("You must wrap your component in <Tabs>");
  }
  return ctx;
}

export const TabsList = TabsPrimitiveList;

export const TabsTrigger = TabsPrimitiveTrigger;

/**
 * @internal You better not use it
 */
export function Tabs({
  ref,
  groupId,
  persist = false,
  updateAnchor = false,
  defaultValue,
  value: _value,
  onValueChange: _onValueChange,
  ...props
}: TabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = _value !== undefined;
  const value = isControlled ? _value : internalValue;
  const setValue = isControlled
    ? (_onValueChange ??
      ((_: string) => {
        return;
      }))
    : setInternalValue;

  const onChange = useEffectEvent((nextValue: string) => {
    setValue(nextValue);
  });
  const valueToIdMap = useMemo(() => new Map<string, string>(), []);

  // Keep the URL hash aligned with the active tab when cross-linking is enabled.
  const updateAnchorHash = useEffectEvent((nextValue: string) => {
    if (!updateAnchor) {
      return;
    }
    const id = valueToIdMap.get(nextValue);

    if (id) {
      window.history.replaceState(null, "", `#${id}`);
    }
  });

  // Broadcast value changes to sibling tab groups and persist when configured.
  const syncGroupValue = useEffectEvent((nextValue: string) => {
    if (!groupId) {
      setValue(nextValue);
      return;
    }

    const groupListeners = listeners.get(groupId);
    if (groupListeners) {
      for (const listenerItem of groupListeners) {
        listenerItem(nextValue);
      }
    }

    if (persist) {
      localStorage.setItem(groupId, nextValue);
    } else {
      sessionStorage.setItem(groupId, nextValue);
    }
  });

  useLayoutEffect(() => {
    if (!groupId) {
      return;
    }
    const previous = persist
      ? localStorage.getItem(groupId)
      : sessionStorage.getItem(groupId);

    if (previous) {
      onChange(previous);
    }
    addChangeListener(groupId, onChange);
    return () => {
      removeChangeListener(groupId, onChange);
    };
  }, [groupId, onChange, persist]);

  useLayoutEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) {
      return;
    }

    for (const [candidateValue, id] of valueToIdMap.entries()) {
      if (id === hash) {
        onChange(candidateValue);
        tabsRef.current?.scrollIntoView();
        break;
      }
    }
  }, [onChange, valueToIdMap]);

  return (
    <TabsPrimitiveRoot
      onValueChange={(v: string) => {
        updateAnchorHash(v);
        syncGroupValue(v);
      }}
      ref={mergeRefs(ref, tabsRef)}
      value={value}
      {...props}
    >
      <TabsContext.Provider
        value={useMemo(() => ({ valueToIdMap }), [valueToIdMap])}
      >
        {props.children}
      </TabsContext.Provider>
    </TabsPrimitiveRoot>
  );
}

export function TabsContent({
  value,
  ...props
}: ComponentProps<typeof TabsPrimitiveContent>) {
  const { valueToIdMap } = useTabContext();

  if (props.id) {
    valueToIdMap.set(value, props.id);
  }

  return (
    <TabsPrimitiveContent value={value} {...props}>
      {props.children}
    </TabsPrimitiveContent>
  );
}
