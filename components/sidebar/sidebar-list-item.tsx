import React from "react";
import classnames from "classnames";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

import Dropdown from "../dropdown";
import { DropdownItem } from "../dropdown/dropdown-composed";

export interface TSidebarListItemDraggable {
  id: string;
  parentId?: string;
  index: number;
}

export interface TSidebarListItemOnSortContextPosition {
  parentId?: string;
  index: number;
}
export interface TSidebarListItemOnSortContext {
  itemId: string;
  from: TSidebarListItemOnSortContextPosition;
  to: TSidebarListItemOnSortContextPosition;
}

export type TSidebarListItemOnSortFn = (
  context: TSidebarListItemOnSortContext
) => void;

export interface SidebarListItemProps {
  children?: React.ReactNode;
  className?: string;
  active?: boolean;
  actions?: DropdownItem[];
  actionIcon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  /**
   * Must be provided if the item is draggable
   */
  draggableProps?: {
    id: string;
    index: number;
    onSort?: TSidebarListItemOnSortFn;
    parentId?: string;
  };
}

const baseClasses =
  "adiago-sidebar-list-item group flex items-center justify-between pl-2 pr-1 py-1 mb-1 text-xs rounded cursor-pointer user-select-none";
const baseModifierClasses =
  "text-neutral-900 hover:bg-djent-100 dark:text-white dark:hover:bg-neutral-800";

const activeClasses =
  "bg-djent-500 text-white hover:bg-djent-600 dark:hover:bg-djent-600";
const disabledClasses =
  "pointer-events-none text-neutral-500 dark:text-neutral-700 hover:bg-transparent";
const draggingClasses = "invisible";

export const SidebarListItem: React.FC<SidebarListItemProps> = ({
  children,
  className,
  active,
  actions,
  actionIcon,
  disabled,
  onClick,
  draggableProps,
}) => {
  const classNames = classnames(
    baseClasses,
    {
      [baseModifierClasses]: !active && !disabled,
      [activeClasses]: active,
      [disabledClasses]: disabled,
    },
    className
  );

  return (
    <div className={classNames} onClick={onClick}>
      {children}

      {!disabled && actions ? (
        <Dropdown.Composed
          items={actions}
          trigger={
            <button className="invisible group-hover:visible rx-state-open:visible">
              {actionIcon || <EllipsisHorizontalIcon className="h-4 w-6" />}
            </button>
          }
          align="end"
        />
      ) : null}
    </div>
  );
};

SidebarListItem.displayName = "SidebarListItem";
