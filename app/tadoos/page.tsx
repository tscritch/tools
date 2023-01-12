import { AuthWrapper } from "@components/layout-wrappers/auth";
import { TodoList } from "./todo-list";

export default () => {
  return (
    <div className="h-full w-full">
      <AuthWrapper>
        <div className="p-2">
          <TodoList />
        </div>
      </AuthWrapper>
    </div>
  );
};
