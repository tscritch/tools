import { Todo } from "@lib/types";
import { useLabelStore } from "./store";

export const TodoLabel = ({ todo }: { todo: Todo }) => {
  const { labels } = useLabelStore();
  // console.log("TodoLabel", todo, labels);

  if (!todo.label_id) return null;

  const label = labels.find((l) => l.id === todo.label_id);

  return (
    <div className={`badge badge-outline ${label?.color}`}>
      {label ? label.text : todo.label_id}
    </div>
  );
};
