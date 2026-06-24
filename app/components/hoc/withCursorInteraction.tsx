import { useRef, useEffect } from "react";
import { useCursorInteraction } from "@/app/components/ui/CustomCursor";

export function withCursorInteraction<P extends object>(
  Component: React.ComponentType<P & { ref?: React.Ref<HTMLElement> }>,
  displayName?: string,
) {
  const Wrapped = (props: P) => {
    const ref = useRef<HTMLElement>(null);
    const { onHoverEnter, onHoverExit } = useCursorInteraction();

    useEffect(() => {
      const element = ref.current;
      if (!element) return;

      element.addEventListener("mouseenter", () => onHoverEnter(element));
      element.addEventListener("mouseleave", onHoverExit);

      return () => {
        element.removeEventListener("mouseenter", () => onHoverEnter(element));
        element.removeEventListener("mouseleave", onHoverExit);
      };
    }, [onHoverEnter, onHoverExit]);

    return <Component {...props} ref={ref} />;
  };

  Wrapped.displayName =
    displayName ||
    `withCursorInteraction(${Component.displayName || "Component"})`;

  return Wrapped;
}
