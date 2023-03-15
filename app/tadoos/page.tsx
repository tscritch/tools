import { AuthWrapper } from "@components/layout-wrappers/auth";
import { CompletedList } from "./completed-list";
import { TodoList } from "./todo-list";

export default () => {
  return (
    <div className="h-full w-full">
      <AuthWrapper>
        <div className="p-2">
          <TodoList />
          <CompletedList />
          <div className="toast">
            <div className="alert alert-info">
              <div>
                <span>Settings Button</span>
              </div>
            </div>
          </div>
        </div>
      </AuthWrapper>
    </div>
  );
};
